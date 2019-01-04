from flask import Flask, jsonify, render_template, Response, json


#https://stackoverflow.com/questions/11622020/d3-json-request-getting-xmlhttprequest-error-origin-null-is-not-allowed-by-acce
#https://stackoverflow.com/questions/13081532/return-json-response-from-flask-view


census = [
    {
        "Cities": {
            # Brooklym
            "Autauga": {"income": "61,838",
                        "gender": {"Men": "940", "Women": "1008"},
                        "Race": {"White": "87.4", "Hispanic": ".9", "Black": "7.7"},
                        "job": {"professional": "34.7", "service": "17", "office": "21.3", "construction": "11.9", "production": "15.2"},
                        "work": {"private": "77.1", "public": "18.3", "self-employed": "4.6", "family-work": "0.0"}},

            # Chicago
            "Calhoun": {"income": "35,740",
                        "gender": {"Men": "1691", "Women": "1663"},
                        "Race": {"White": "71", "Hispanic": "1", "Black": "28"},
                        "job": {"professional": "18.3", "service": "10.9", "office": "33.2", "construction": "11.3", "production": "26.3"},
                        "work": {"private": "79.7", "public": "14.7", "self-employed": "5.6", "family-work": "0.0"}}
        }

    }
]

living_cost = [
    {
        "Cities": {
            "Brooklyn": {
                "cost_of_living": "90.31",
                "rent_index": "81.02",
                "groceries_index": "83.16",
                "purchase_power": "87.05"
            },
            "Chicago": {
                "cost_of_living": "77.33",
                "rent_index": "55.53",
                "groceries_index": "70.69",
                "purchase_power": "133.7"
            }
        }
    }
]

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################


@app.route('/summary')
def summary():
    data = living_cost
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response

@app.route('/census')
def census_ep():
    data = census
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response


@app.route("/")
def welcome():
    return (
        f"Welcome to the SteamGraph API!<br/>"
    )

@app.route('/web')
def webprint():
    return render_template('index.html') 



if __name__ == "__main__":
    app.run(debug=True)
