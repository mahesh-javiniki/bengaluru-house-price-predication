# 🏠 Bengaluru House Price Prediction

This project predicts house prices in Bengaluru, India, using a machine learning model. It provides a web interface where users can get an estimated price by providing details such as location, square footage, and the number of bedrooms and bathrooms.

## 🎥 Live Demo
![Project Demo](demo/demo-gif.gif)

## ✨ Features

- **Accurate Price Prediction:** Utilizes a linear regression model trained on a comprehensive dataset.
- **User-Friendly Interface:** A clean and simple web UI to interact with the model.
- **Scalable Architecture:** Built with a separate client and server, and containerized with Docker for easy deployment.

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Python, Flask
- **Data Cleaning & Preprocessing:** Pandas, NumPy
- **Visualization:** Matplotlib
- **Machine Learning:** Scikit-learn
- **Deployment:** Docker, Docker Compose
- **Version Control:** Git

## 🧪 Data Science Workflow

The machine learning model was built following these key steps, as detailed in the `model/data_preparation_and_model_building.ipynb` notebook:

1.  **Data Loading & Exploration:** The dataset (`Bengaluru_House_Data.csv`) was loaded, and its structure was analyzed.
2.  **Data Cleaning:**
    - Handled missing values by dropping rows with null entries.
    - Cleaned the `total_sqft` column by converting ranges (e.g., "1133 - 1384") into a single average value.
    - Standardized the `size` column (e.g., "2 BHK", "3 Bedroom") into a numerical `bhk` feature.
3.  **Feature Engineering:**
    - Created a `price_per_sqft` feature, which was crucial for outlier detection.
4.  **Dimensionality Reduction:**
    - To handle the high number of unique locations, locations with fewer than 10 data points were grouped into an "other" category.
5.  **Outlier Removal:**
    - Removed data points with an unrealistic `total_sqft` per `bhk` (e.g., less than 300 sqft/bhk).
    - Removed extreme outliers in `price_per_sqft` for each location using one standard deviation from the mean.
6.  **Model Selection & Hyperparameter Tuning:**
    - Used **One-Hot Encoding** to convert the categorical `location` feature into numerical data.
    - Compared multiple algorithms (`Linear Regression`, `Lasso`, `Decision Tree`) using `GridSearchCV` to find the best-performing model and its optimal hyperparameters.
    - **Linear Regression** was selected as the final model due to its high R-squared score and stability.
7.  **Final Model Training & Export:**
    - The selected `LinearRegression` model was trained on the full, cleaned dataset.
    - The trained model and the data columns were exported to a `pickle` file (`bengaluru_house_prices_model.pickle`) for use in the Flask server.

For more details, please refer to the notebook for more detailed steps and explanations:
[model/data_preparation_and_model_building.ipynb](model/data_preparation_and_model_building.ipynb)

## 🏗️ Deployed Application Architecture

![Application Architecture](architecture/deployed%20model.png)

### High-Level Summary

The diagram shows a complete end-to-end workflow:
1.  A **user** interacts with a web-based user interface.
2.  The user's input is sent to a **backend service** to get a prediction from a machine learning model.
3.  The backend, which is a **containerized application** running in the cloud, processes the request, makes a prediction, and sends the result back.
4.  A **deployment pipeline** from GitHub is used to get the source code onto the cloud server.

### Detailed Breakdown of the Workflow & Components

Let's follow the flow of data and actions:

#### 1. The User Request & Response Flow (The main loop)

*   **User & User Interface (UI):** A user interacts with the application through a UI in their browser. They provide some input (e.g., location, area, BHK, and no.of bathrooms).
*   **NGINX:** This is a web server. In this context, it's most likely serving the static files (HTML, CSS, JavaScript) that make up the User Interface. When the user submits their input, the UI sends a request.
*   **Request to Predict:** The browser sends the user's input as an API request (HTTP request) to the backend.
*   **Backend Application (The "brains"):**
    *   **Running EC2 Instance:** The entire backend is hosted on a virtual server in the cloud (an Amazon EC2 instance).
    *   **Running Docker Containers:** The application isn't run directly on the EC2 instance's OS. Instead, it's packaged into a **Docker container**. This ensures the application runs in a consistent, isolated environment, making it portable and easy to manage.
    *   **Python with Flask:** Inside the container, a web framework called **Flask** (a popular, lightweight Python framework) is running. Its job is to listen for incoming API requests, like the "Request to predict".
    *   **Trained ML model:** The Flask application loads a pre-trained machine learning model. When a request comes in, the Python code passes the input data to the model, which performs the prediction (inference).
*   **Predicted Response:** The Flask application takes the model's output, formats it (into a JSON object), and sends it back to the User Interface as an HTTP response.
*   **Displaying the Result:** The UI receives the "Predicted Response" and displays the result to the user in a friendly format.

#### 2. The Deployment Flow (Getting the code to the server)

*   **GitHub:** This is the version control system where the application's source code is stored. This includes the Python/Flask code, the trained ML model file, and the `Dockerfile` needed to build the container.
*   **Pull from GitHub:** An arrow shows that the source code is pulled from GitHub to the EC2 instance. This represents the deployment process. In a real-world scenario, this might be automated with a CI/CD (Continuous Integration/Continuous Deployment) pipeline, where a push to the GitHub repository automatically triggers a new deployment on the server.

### In summary, this architecture represents:

A **containerized machine learning web application** where:
*   The **frontend** (UI) is decoupled from the **backend** (ML model and API).
*   The backend is deployed using **Docker** for consistency and portability.
*   The infrastructure is hosted on a **cloud provider** (AWS EC2).
*   The application code is managed and deployed from a **version control system** (GitHub).

This is a very common and robust pattern for making machine learning models accessible to end-users via a web application.

## 🏗️ Local Application Architecture

The local application architecture is simillar to deployed application architecture, but instead of running on a cloud server, it runs on your local machine. The only difference is that the application is not accessible from the internet. The local application architecture is useful for development and testing purposes, where you can make changes and see the results immediately without the need for a cloud server. It also allows you to run the application on your local machine, which can be particularly useful for debugging and testing purposes.

## 🚀 How to Use

You can interact with this project in two ways: by running it locally using Docker or by accessing the deployed application on AWS.

### Option 1: Access the Deployed Application on AWS

The application is hosted on AWS and can be accessed directly through your browser.

-   **Application URL:** http://ec2-3-108-235-165.ap-south-1.compute.amazonaws.com/

**NOTE:** The url might change depending on the IP address and AWS region.

### Option 2: Run Locally with Docker

Running the application locally is recommended for development and testing.

1.  **Prerequisites:**
    -   [Git](https://git-scm.com/)
    -   [Docker](https://www.docker.com/products/docker-desktop/) & [Docker Compose](https://docs.docker.com/compose/install/)

2.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-folder>
    ```

3.  **Build and run the application:**
    ```bash
    docker-compose up -d --build
    ```

4.  **Access the application:**
    Open your browser and navigate to `http://localhost:80`.


## ⭐ Show Your Support

If you find this project helpful, please consider giving it a star ⭐ and forking it to explore further.
