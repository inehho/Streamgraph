var income_url = "http://localhost:5000/income"

d3.json(income_url, function(error, response) {
  var test = GeoJSON.parse(response, {Point:["Lat", "Lng"]});


  var all_data = test.features;
  console.log(all_data);


  var incomeMarkers = [];
  var powerMarkers = [];
  var costMarkers = [];
  var rentMarkers = [];
  var groceriesMarkers = [];

  for (var i = 0; i < all_data.length; i++) {

  // Set the data location property to a variable
    var location = all_data[i].geometry;
    var money = all_data[i].properties;

    function getColor(d) {
      return d > 100000 ? '#bfff00' :
              d > 85000  ? '#ffff00' :
              d > 55000  ? "#ffbf00" :
              d > 45000  ? "#ff8000" :
              d > 30000  ? "#ff4000" :
              "#ff0000";
    }

    incomeMarkers.push(
      L.circle([location.coordinates[1], location.coordinates[0]], {
        stroke: false,
        fillOpacity: 0.75,
        color: getColor(money.median),
        fillColor: getColor(money.median),
        radius: 5000
      }).bindPopup("<h4>" + money.city + ", " + money.state + "</h4> <hr> <h4>Household Median Income: " + "$"+ money.median + "</h4>")
    );

    if(money.cost_index === 0) {
      continue;
    }
    else {
    //   // Check for location property
      powerMarkers.push(
        L.circle([location.coordinates[1], location.coordinates[0]], {
          fillOpacity: 1,
          color: "blue",
          fillColor: "blue",
          radius: 100
        }).bindPopup("<h4>" + money.city + ", " + money.state + "</h4> <hr> <h4>Purchasing Power: " + "$"+ money.purchasing_power + "</h4>")
      );

      costMarkers.push(
        L.circle([location.coordinates[1], location.coordinates[0]], {
          fillOpacity: 1,
          color: "black",
          fillColor: "black",
          radius: 1000
        }).bindPopup("<h4>" + money.city + ", " + money.state + "</h4> <hr> <h4>Cost Index: " + "$"+ money.cost_index + "</h4>")
      );

      rentMarkers.push(
        L.circle([location.coordinates[1], location.coordinates[0]], {
          fillOpacity: 1,
          color: "purple",
          fillColor: "purple",
          radius: 100
        }).bindPopup("<h4>" + money.city + ", " + money.state + "</h4> <hr> <h4>Rent Index: " + "$"+ money.rent_index + "</h4>")
      );

      groceriesMarkers.push(
        L.circle([location.coordinates[1], location.coordinates[0]], {
          fillOpacity: 1,
          color: "brown",
          fillColor: "brown",
          radius: 100
        }).bindPopup("<h4>" + money.city + ", " + money.state + "</h4> <hr> <h4>Groceries Index: " + "$"+ money.groceries_index + "</h4>")
      );
    }
  };

  // Define variables for our base layers
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });

  var income= L.layerGroup(incomeMarkers);
  var power = L.layerGroup(powerMarkers);
  var cost = L.layerGroup(costMarkers);
  var rent = L.layerGroup(rentMarkers);
  var groceries = L.layerGroup(groceriesMarkers);

  var baseMaps = {
    "Street Map": streetmap,
    "Light Map": lightmap
  };
  
  // Create an overlay object
  var overlayMaps = {
    "Median Income": income,
    "Purchasing Power": power,
    "Cost Index" : cost,
    "Rent Index": rent,
    "Groceries Index": groceries
  };
  
  // Define a map object
  var myMap = L.map("map", {
    center: [40.7128, -74.0059],
    zoom: 5,
    layers: [streetmap, income]
  });
  
  // Pass our map layers into our layer control
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);


  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function (map) {

  var div = L.DomUtil.create('div', 'info legend'),
      grades = [0, 30000, 45000, 55000, 85000, 100000],
      labels = [];

  // loop through our density intervals and generate a label with a colored square for each interval
  for (var i = 0; i < grades.length; i++) {
      div.innerHTML +=
          '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
          grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
  }

    return div;
  };

  legend.addTo(myMap);
});