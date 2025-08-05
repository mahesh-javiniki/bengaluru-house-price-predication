# 🧠 Model

This folder contains the Jupyter Notebook used for the entire data science workflow, from data exploration to model training and evaluation.

## 📄 Files

- **`data_preparation_and_model_building.ipynb`**: A detailed notebook that covers:
  - 📊 Data loading and initial analysis.
  - 🧹 Data cleaning and preprocessing.
  - ✨ Feature engineering.
  - 📈 Outlier detection and removal.
  - 🤖 Model selection and hyperparameter tuning using `GridSearchCV` to compare `Linear Regression`, `Lasso`, and `Decision Tree` models.

## 📤 Output

The execution of this notebook generates the following file, which is used by the Flask server:

- **`bengaluru_house_prices_model.pickle`**: A pickle file containing the trained machine learning model and the list of data columns.
