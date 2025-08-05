# ⚙️ Server

This folder contains the backend of the House Price Prediction application, which is a Flask-based API server.

## 📄 Files

- **`server.py`**: The main Flask application that defines the API endpoints.
- **`utils.py`**: A utility module that contains the core logic for loading the trained model and making predictions.
- **`requirements.txt`**: A list of Python dependencies required for the server.
- **`Dockerfile`**: Instructions for building the Docker image for the server.

## 🔗 API Endpoints

- **`/locations`**: A `GET` endpoint that returns a list of all available locations for price prediction.
- **`/predict_house_price`**: A `POST` endpoint that accepts house details (location, sqft, bath, bhk) and returns the estimated price.

## 🛠️ How It Works

The server loads the trained machine learning model from the `bengaluru_house_prices_model.pickle` file and exposes API endpoints to interact with it. It handles prediction requests from the client and returns the results in JSON format.
