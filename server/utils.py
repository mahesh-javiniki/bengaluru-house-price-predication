import json
import pickle
import numpy as np
import pandas as pd

def get_locations():
    with open('./artifacts/columns.json', 'r') as file:
        columns = json.load(file)

    columns = columns.get('data_columns', [])
    if columns:
        location_cols = columns[3:]
    else:
        location_cols = []

    return location_cols

def get_columns():
    with open('./artifacts/columns.json', 'r') as file:
        columns = json.load(file)

    return np.array(columns.get('data_columns', []))

def get_model():
    with open('./artifacts/bengaluru_house_prices_model.pickle', 'rb') as file:
        model = pickle.load(file)

    return model

def get_predicted_price(location, sqft, bath, bhk):
    columns = get_columns()
    request = np.zeros(len(columns))

    if location in columns:
        loc_index = np.where(columns == location)[0][0]
        request[loc_index] = 1

    request[0] = sqft
    request[1] = bath
    request[2] = bhk

    request_df = pd.DataFrame([request], columns=columns)
    model = get_model()
    return model.predict(request_df)[0]
