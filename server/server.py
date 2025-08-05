from flask import Flask, request, jsonify

from utils import get_locations, get_predicted_price

app = Flask(__name__)

@app.route('/locations', methods=['GET'])
def locations():
    try:
        response = jsonify({
            'locations': get_locations()
        })

        response.headers.add('Access-Control-Allow-Origin', '*')
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    return response

@app.route('/predict_house_price', methods=['GET', 'POST'])
def predict_house_price():
    total_sqft = float(request.form['total_sqft'])
    location = request.form['location']
    bhk = int(request.form['bhk'])
    bath = int(request.form['bath'])

    try:
        price = get_predicted_price(location, total_sqft, bath, bhk)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    response = jsonify(
        {
            'estimated_price': round(price, 2)
        }
    )
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5000)

