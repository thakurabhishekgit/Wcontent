import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error, r2_score
from flask import Flask, request, jsonify#request req lene ke liye frontend se json to convert data
from flask_cors import CORS  # Import CORS backend connect karne ke liye
app = Flask(__name__)
CORS(app)  
def train_and_save_models():

    
    data = pd.read_csv('./data.csv')

 
    features = data[['channel_age', 'subscriber_count', 'total_videos', 'total_views',
                     'average_likes', 'average_comments', 'average_shares', 'upload_frequency',
                     'video_quality_score', 'social_media_followers', 'content_type',
                     'target_audience_age_group', 'target_audience_interests', 'advertising_spend']]
    target_views = data['predicted_views']
    target_likes = data['predicted_likes']
    target_comments = data['predicted_comments']
    target_average_shares = data['average_shares']
    target_subscribers = data['subscriber_count']


    features = pd.get_dummies(features, drop_first=True)
    feature_names = features.columns.tolist()

  
    with open('feature_names.txt', 'w') as f:
        for name in feature_names:
            f.write(name + '\n')

    X_train, X_test, y_train_views, y_test_views = train_test_split(features, target_views, test_size=0.2, random_state=42)
    _, _, y_train_likes, y_test_likes = train_test_split(features, target_likes, test_size=0.2, random_state=42)
    _, _, y_train_comments, y_test_comments = train_test_split(features, target_comments, test_size=0.2, random_state=42)
    _, _, y_train_shares, y_test_shares = train_test_split(features, target_average_shares, test_size=0.2, random_state=42)
    _, _, y_train_subscribers, y_test_subscribers = train_test_split(features, target_subscribers, test_size=0.2, random_state=42)

 
    scaler = StandardScaler()
    X_train = scaler.fit_transform(X_train)
    
    X_test = scaler.transform(X_test)

    model_views = GradientBoostingRegressor()
    model_likes = GradientBoostingRegressor()
    model_comments = GradientBoostingRegressor()
    model_shares = GradientBoostingRegressor()
    model_subscribers = GradientBoostingRegressor()

    model_views.fit(X_train, y_train_views)
    model_likes.fit(X_train, y_train_likes)
    model_comments.fit(X_train, y_train_comments)
    model_shares.fit(X_train, y_train_shares)
    model_subscribers.fit(X_train, y_train_subscribers)

    
    y_pred_views = model_views.predict(X_test)
    y_pred_likes = model_likes.predict(X_test)
    y_pred_comments = model_comments.predict(X_test)
    y_pred_shares = model_shares.predict(X_test)
    y_pred_subscribers = model_subscribers.predict(X_test)

    print(f"Views MAE: {mean_absolute_error(y_test_views, y_pred_views)}, R2: {r2_score(y_test_views, y_pred_views)}")
    print(f"Likes MAE: {mean_absolute_error(y_test_likes, y_pred_likes)}, R2: {r2_score(y_test_likes, y_pred_likes)}")
    print(f"Comments MAE: {mean_absolute_error(y_test_comments, y_pred_comments)}, R2: {r2_score(y_test_comments, y_pred_comments)}")
    print(f"Shares MAE: {mean_absolute_error(y_test_shares, y_pred_shares)}, R2: {r2_score(y_test_shares, y_pred_shares)}")
    print(f"Subscribers MAE: {mean_absolute_error(y_test_subscribers, y_pred_subscribers)}, R2: {r2_score(y_test_subscribers, y_pred_subscribers)}")

    # Save models and scaler
    joblib.dump(model_views, 'model_views.pkl')
    joblib.dump(model_likes, 'model_likes.pkl')
    joblib.dump(model_comments, 'model_comments.pkl')
    joblib.dump(model_shares, 'model_shares.pkl')
    joblib.dump(model_subscribers, 'model_subscribers.pkl')
    joblib.dump(scaler, 'scaler.pkl')

def load_models_and_scaler():
    
    with open('feature_names.txt', 'r') as f:
        feature_names = [line.strip() for line in f]

 
    try:
        model_views = joblib.load('model_views.pkl')
        model_likes = joblib.load('model_likes.pkl')
        model_comments = joblib.load('model_comments.pkl')
        model_shares = joblib.load('model_shares.pkl')
        model_subscribers = joblib.load('model_subscribers.pkl')
        scaler = joblib.load('scaler.pkl')
    except FileNotFoundError as e:
        print(f"Error loading model: {e}")
        raise

    return model_views, model_likes, model_comments, model_shares, model_subscribers, scaler, feature_names

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    df = pd.DataFrame([data])
    
 
    df = pd.get_dummies(df)
    
 
    for name in feature_names:
        if name not in df.columns:
            df[name] = 0
    df = df[feature_names]
    

    df = scaler.transform(df)
    
    views = model_views.predict(df)[0]
    likes = model_likes.predict(df)[0]
    comments = model_comments.predict(df)[0]
    shares = model_shares.predict(df)[0]
    subscribers = model_subscribers.predict(df)[0]
    
    return jsonify({
        'predicted_views': views,
        'predicted_likes': likes,
        'predicted_comments': comments,
        'predicted_average_shares': shares,
        'predicted_subscribers': subscribers
    })

if __name__ == '__main__':
   
    train_and_save_models()
    
 #pickle file pura model aur outputs ku save karne ke liye
    try:
        model_views, model_likes, model_comments, model_shares, model_subscribers, scaler, feature_names = load_models_and_scaler()
    except Exception as e:
        print(f"Error loading models and scaler: {e}")
        exit(1)
    
  
    app.run(debug=True, port=5001)
