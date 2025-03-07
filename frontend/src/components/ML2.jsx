import React, { useState } from "react";
import styled from "styled-components";

// Slide Components with Prediction Info (unchanged)
const Slide1 = () => (
  <Slide>
    <Card>
      <TextContent>
        <h2>Channel Age Insights</h2>
        <p>
          Channel Age represents the duration since a YouTube channel was
          created. It is typically measured in months or years.
        </p>
        <PredictionInfo>
          <strong>Prediction Info:</strong> Estimated views could be around
          22,301.
        </PredictionInfo>
      </TextContent>
      <SlideImage
        src="https://images.unsplash.com/photo-1673648954658-212203f00a0d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzB8fGNvbnRlbnQlMjBjcmVhdG9yfGVufDB8fDB8fHww"
        alt="Welcome"
      />
    </Card>
  </Slide>
);

const Slide2 = () => (
  <Slide>
    <Card>
      <TextContent>
        <h2>Upload Your Channel Statistics</h2>
        <p>
          Provide key details such as your subscriber count, average views, and
          engagement rate to get an accurate prediction of your future reach.
        </p>
        <PredictionInfo>
          <strong>Prediction Info:</strong> Estimated views could be around
          22,301.
        </PredictionInfo>
      </TextContent>
      <SlideImage
        src="https://img.freepik.com/free-vector/facebook-background-with-likes-hearts_23-2147857749.jpg?t=st=1741100084~exp=1741103684~hmac=42458e68e562ac0cd44340264309bc2b66eef2b67ee4e08cfda1f756617530d3&w=900"
        alt="Welcome"
      />
    </Card>
  </Slide>
);

const Slide3 = () => (
  <Slide>
    <Card>
      <TextContent>
        <h2>Analyze Your Content Performance</h2>
        <p>
          Our system evaluates the performance of your previous videos and
          suggests improvements for maximizing reach and engagement.
        </p>
        <PredictionInfo>
          <strong>Prediction Info:</strong> Estimated views could be around
          22,301.
        </PredictionInfo>
      </TextContent>
      <SlideImage
        src="https://img.freepik.com/premium-vector/characters-holding-like-notifications-male-female-followers-gives-like-networks-people-with-hearts-thumb-up_1016-14497.jpg?w=1800"
        alt="Welcome"
      />
    </Card>
  </Slide>
);

const Slide4 = () => (
  <Slide>
    <Card>
      <TextContent>
        <h2>Identify Trending Topics</h2>
        <p>
          Discover trending topics in your niche to optimize your content and
          gain higher visibility.
        </p>
        <PredictionInfo>
          <strong>Prediction Info:</strong> Estimated views could be around
          22,301.
        </PredictionInfo>
      </TextContent>
      <SlideImage
        src="https://img.freepik.com/free-vector/person-addicted-social-media_23-2148392550.jpg?t=st=1741100141~exp=1741103741~hmac=916d46ac72ef2a0ce3a4c90718602dd3fe9fd6f97ba3cb5e2db49f9b28a0bc67&w=1380"
        alt="Welcome"
      />
    </Card>
  </Slide>
);

const Slide5 = () => (
  <Slide>
    <Card>
      <TextContent>
        <h2>Predict Your Future Growth</h2>
        <p>
          Based on your current metrics, our model forecasts your future reach,
          helping you strategize better content plans.
        </p>
        <PredictionInfo>
          <strong>Prediction Info:</strong> Estimated views could be around
          22,301.
        </PredictionInfo>
      </TextContent>
      <SlideImage
        src="https://img.freepik.com/free-vector/social-media-logo-collection_69286-192.jpg?t=st=1741100091~exp=1741103691~hmac=f2a9ed3a19780178f623029b9160e2f787e137bf1418bc42258585d40e6b4e53&w=1800"
        alt="Welcome"
      />
    </Card>
  </Slide>
);

const Slide6 = () => (
  <Slide>
    <Card>
      <TextContent>
        <h2>Optimize Your Content Strategy</h2>
        <p>
          Leverage AI-powered insights to refine your content approach and
          increase audience engagement.
        </p>
        <PredictionInfo>
          <strong>Prediction Info:</strong> Estimated views could be around
          22,301.
        </PredictionInfo>
      </TextContent>
      <SlideImage
        src="https://img.freepik.com/free-vector/realistic-multimedia-player-template_23-2148130954.jpg?t=st=1741099523~exp=1741103123~hmac=83a9920ee65d9d5d6fce92a9dfd54eca3ddb964f769d5fdacc5aaa6cf8bdf538&w=900"
        alt="Welcome"
      />
    </Card>
  </Slide>
);

// Other slides (Slide2, Slide3, etc.) remain unchanged...

const Ml2 = () => {
  const [inputData, setInputData] = useState({
    channel_age: "",
    subscriber_count: "",
    total_videos: "",
    total_views: "",
    average_likes: "",
    average_comments: "",
    average_shares: "",
    upload_frequency: "",
    video_quality_score: "",
    social_media_followers: "",
    content_type: "",
    target_audience_age_group: "",
    target_audience_interests: "",
    advertising_spend: "",
  });

  const [predictions, setPredictions] = useState(null);
  const [error, setError] = useState(null);
  const [geminiResponse, setGeminiResponse] = useState({}); // Store Gemini responses for each metric

  const slides = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6]; // Predefined Slides

  const handleChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch("http://localhost:5001/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
      });
      const data = await response.json();
      setPredictions(data);
    } catch (error) {
      setError("An error occurred while fetching predictions.");
    }
  };
  const apiKey = "AIzaSyAFXOKE8qMD6tECr9A9JT9OMPKFcrQIvp4";
  const handleGeminiRequest = async (metric) => {
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`;

    const requestBody = {
      prompt: {
        text: `How can I improve my ${metric} for the content type "${inputData.content_type}"?`,
      },
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => console.log("Response:", data))
      .catch((error) => console.error("Error:", error));

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      });

      const data = await response.json();
      const geminiText =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response from Gemini.";
      setGeminiResponse((prev) => ({ ...prev, [metric]: geminiText }));
    } catch (error) {
      setGeminiResponse((prev) => ({
        ...prev,
        [metric]: "Failed to fetch suggestions.",
      }));
    }
  };

  return (
    <Container>
      <Content>
        <SlidesContainer>
          {slides.map((SlideComponent, index) => (
            <SlideComponent key={index} />
          ))}
        </SlidesContainer>

        <Form onSubmit={handleSubmit}>
          <FormHeader>Content Prediction App</FormHeader>
          {Object.keys(inputData).map((key) => (
            <FormGroup key={key}>
              <Label htmlFor={key}>
                {key.replace(/_/g, " ").toUpperCase()}
              </Label>
              <Input
                type="text"
                id={key}
                name={key}
                value={inputData[key]}
                onChange={handleChange}
                placeholder={`Enter ${key.replace(/_/g, " ")}`}
                required
              />
            </FormGroup>
          ))}
          <SubmitButton type="submit">Get Predictions</SubmitButton>
        </Form>
      </Content>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {predictions && (
        <Results>
          <ResultsHeader>Prediction Results</ResultsHeader>
          <ResultsGrid>
            <ResultCard onClick={() => handleGeminiRequest("views")}>
              <CardTitle>Predicted Views</CardTitle>
              <CardValue>{predictions.predicted_views.toFixed(2)}</CardValue>
              {geminiResponse.views && (
                <GeminiResponse>{geminiResponse.views}</GeminiResponse>
              )}
            </ResultCard>
            <ResultCard onClick={() => handleGeminiRequest("likes")}>
              <CardTitle>Predicted Likes</CardTitle>
              <CardValue>{predictions.predicted_likes.toFixed(2)}</CardValue>
              {geminiResponse.likes && (
                <GeminiResponse>{geminiResponse.likes}</GeminiResponse>
              )}
            </ResultCard>
            <ResultCard onClick={() => handleGeminiRequest("comments")}>
              <CardTitle>Predicted Comments</CardTitle>
              <CardValue>{predictions.predicted_comments.toFixed(2)}</CardValue>
              {geminiResponse.comments && (
                <GeminiResponse>{geminiResponse.comments}</GeminiResponse>
              )}
            </ResultCard>
            <ResultCard onClick={() => handleGeminiRequest("shares")}>
              <CardTitle>Predicted Shares</CardTitle>
              <CardValue>
                {predictions.predicted_average_shares.toFixed(2)}
              </CardValue>
              {geminiResponse.shares && (
                <GeminiResponse>{geminiResponse.shares}</GeminiResponse>
              )}
            </ResultCard>
            <ResultCard onClick={() => handleGeminiRequest("subscribers")}>
              <CardTitle>Predicted Subscribers</CardTitle>
              <CardValue>
                {predictions.predicted_subscribers.toFixed(2)}
              </CardValue>
              {geminiResponse.subscribers && (
                <GeminiResponse>{geminiResponse.subscribers}</GeminiResponse>
              )}
            </ResultCard>
          </ResultsGrid>
        </Results>
      )}
    </Container>
  );
};

const Container = styled.div`
  font-family: "Poppins", sans-serif;
  padding: 2rem;
  background: linear-gradient(135deg, #0f0f0f, #1a1a1a);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
`;

const Content = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
`;

const SlidesContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Slide = styled.div`
  background: #2a2a2a;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
  }
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem;
  gap: 1.5rem;
`;

const TextContent = styled.div`
  flex: 1;
`;

const PredictionInfo = styled.p`
  color: #ccc;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const SlideImage = styled.img`
  width: 40%;
  border-radius: 8px;
  object-fit: cover;
  border: 2px solid #444;
`;

const Form = styled.form`
  width: 50%;
  background: #2a2a2a;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  position: sticky;
  top: 2rem;
`;

const FormHeader = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #fff;
`;

const FormGroup = styled.div`
  margin-bottom: 1.2rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #ccc;
  margin-bottom: 0.5rem;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #444;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #333;
  color: #fff;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const Results = styled.div`
  margin-top: 2rem;
  width: 100%;
  max-width: 1200px;
  background: #2a2a2a;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;

const ResultsHeader = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #fff;
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const ResultCard = styled.div`
  background: #333;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #ccc;
`;

const CardValue = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: #007bff;
`;

const GeminiResponse = styled.p`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #ccc;
`;

const ErrorMessage = styled.div`
  color: #ff4d4f;
  margin-top: 1rem;
  font-size: 0.9rem;
`;

export default Ml2;
