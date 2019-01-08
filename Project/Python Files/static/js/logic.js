census = [
  {
      "income": "68211",
      "gender": {"Men": "6817", "Women": "6099"},
      "Race": {"White": "13.4", "Hispanic": "65.7", "Black": "16.6", "Native": "0.0", "Asian": "2.2", "Pacific": "0.0"},
      "job": {"professional": "19.4", "service": "25.9", "office": "28.2", "construction": "13.5", "production": "13.1"},
      "work": {"private": "77.5", "public": "11.3", "self-employed": "11.3", "family-work": "0.0"},
      "city": "Los Angeles",
      "cost_of_living": "77.66",
      "rent_index": "70.45",
      "groceries_index": "71.59",
      "purchase_power": "114.51"
  },

  {
      "income": "35740",
      "gender": {"Men": "1691", "Women": "1663"},
      "Race": {"White": "71", "Hispanic": "1", "Black": "28"},
      "job": {"professional": "18.3", "service": "10.9", "office": "33.2", "construction": "11.3", "production": "26.3"},
      "work": {"private": "79.7", "public": "14.7", "self-employed": "5.6", "family-work": "0.0"},
      "city": "Jacksonville",
      "cost_of_living": "70.62",
      "rent_index": "31.36",
      "groceries_index": "69.0",
      "purchase_power": "132.56"
  },
  
  {
      "income": "83391",
      "gender": {"Men": "8910", "Women": "9025"},
      "Race": {"White": "48.2", "Hispanic": "7.2", "Black": "12.9", "Asian": "19.8", "Pacific": "0", "Native": "0"},
      "job": {"professional": "69.6", "service": "5.7", "office": "20.4", "construction": "1.7", "production": "2.5"},
      "work": {"private": "86.0", "public": "12.7", "self-employed": "1.3", "family-work": "0.0"},
      "city": "Chicago",
      "cost_of_living": "77.33",
      "rent_index": "55.53",
      "groceries_index": "70.69",
      "purchase_power": "133.7"
      
  },

  {
      "income": "35740",
      "gender": {"Men": "2352", "Women": "1943"},
      "Race": {"White": "76.2", "Hispanic": "6.6", "Black": "3.9","Native": "0.0", "Asian":"8.7", "Pacific":"0.0"},
      "job": {"professional": "79.5", "service": "4.0", "office": "15.8", "construction": "0.3", "production": "0.5"},
      "work": {"private": "84.9", "public": "6.7", "self-employed": "8.4", "family-work": "0.0"},
      "city": "Brooklyn",
      "cost_of_living": "90.31",
      "rent_index": "81.02",
      "groceries_index": "83.16",
      "purchase_power": "87.05"
  }
]

var myMap = L.map("map", {
    center: [37.7749, -122.4194],
    zoom: 13
  });
  
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap);

  // var census_url = "http://localhost:5000/census";
  // var living_url = "http://localhost:5000/summary";

d3.json(census, function(error, data) {
    console.log(data);
  });