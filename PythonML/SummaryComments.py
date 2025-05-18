from flask import Flask, request, jsonify
import requests
from urllib.parse import urlparse, parse_qs
import re
from flask_cors import CORS
app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])
# Replace with your API keys
YOUTUBE_API_KEY = ""
GEMINI_API_KEY = ""

# YouTube Data API endpoint
YOUTUBE_COMMENTS_API = "https://www.googleapis.com/youtube/v3/commentThreads"

# Gemini API endpoint
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"

# Regular expression to match URLs in comments
URL_REGEX = re.compile(r'<a href="[^"]+"')

def get_comments_from_youtube(video_id):
    comments = []
    next_page_token = None
    max_comments = 200  # Limit the number of comments

    while len(comments) < max_comments:
        # Query parameters for the API
        params = {
            "part": "snippet",
            "videoId": video_id,
            "key": YOUTUBE_API_KEY,
            "maxResults": 100,  # Maximum comments per request
            "pageToken": next_page_token  # Token for pagination
        }

        # Call the YouTube API
        response = requests.get(YOUTUBE_COMMENTS_API, params=params)

        if response.status_code != 200:
            return None, response.json()

        data = response.json()
        for item in data.get("items", []):
            comment = item["snippet"]["topLevelComment"]["snippet"]["textDisplay"]

            # Skip comments containing links (match with the URL_REGEX)
            if URL_REGEX.search(comment):
                continue

            comments.append(comment)

            # Stop collecting comments if we reach the max
            if len(comments) >= max_comments:
                break

        # Check if there is a next page
        next_page_token = data.get("nextPageToken")
        if not next_page_token or len(comments) >= max_comments:
            break

    return comments, None

def get_summary_from_gemini(comments):
    headers = {
        "Content-Type": "application/json",
        "x-goog-api-key": GEMINI_API_KEY
    }

    prompt = "Give me a summary and video details about the creator and the summary should feel like you are a person and you are saying to me the summary of the following YouTube comments:\n\n" + "\n".join(comments)

    data = {
        "contents": [{
            "parts": [{
                "text": prompt
            }]
        }]
    }

    response = requests.post(GEMINI_API_URL, headers=headers, json=data)

    if response.status_code != 200:
        return None, response.json()

    return response.json().get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", ""), None

@app.route("/get_comments_summary", methods=["GET"])
def get_comments_summary():
    # Get video link or video ID from query parameters
    video_link = request.args.get("videoLink")
    video_id = request.args.get("videoId")

    # Extract video ID if a video link is provided
    if video_link:
        parsed_url = urlparse(video_link)
        if "youtu.be" in parsed_url.netloc:
            video_id = parsed_url.path.lstrip("/")
        elif "youtube.com" in parsed_url.netloc:
            video_id = parse_qs(parsed_url.query).get("v", [None])[0]

    if not video_id:
        return jsonify({"error": "Please provide a valid videoLink or videoId in the query parameters"}), 400

    # Fetch comments from YouTube
    comments, error = get_comments_from_youtube(video_id)
    if error:
        return jsonify({"error": error}), 500

    # Get summary from Gemini
    summary, error = get_summary_from_gemini(comments)
    if error:
        return jsonify({"error": error}), 500

    return jsonify({"summary": summary})

if __name__ == "__main__":
    app.run(debug=True)
