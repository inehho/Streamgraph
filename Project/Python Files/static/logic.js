// L.geoJson(statesData).addTo(myMap);
var myMap = L.map("map", {
    center: [40.7128, -74.0059],
    zoom: 13,
  });

var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
}).addTo(myMap);

var census_url = "http://localhost:5000/income";

function markerSize(median) {
return median / 20;
}

d3.json(census_url, function(error, response) {
var test = GeoJSON.parse(response, {Point:["Lat", "Lng"]});


var all_data = test.features;
console.log(all_data);


var coord= [];
var income = [];

for (var i = 0; i < all_data.length; i++) {

  // Set the data location property to a variable
  var location = all_data[i].geometry;
  var money = all_data[i].properties;

  // var living_cost = [];
  // var median_income = [];

  // // Loop through locations and create city and state markers
  
  //   // Setting the marker radius for the state by passing population into the markerSize function
  //   living_cost.push(
  //     L.circle(location[i].coordinates, {
  //       stroke: false,
  //       fillOpacity: 0.75,
  //       color: getColor(money.cost_index),
  //       fillColor: getColor(money.cost_index),
  //       radius: markerSize(money.cost_index) * 100
  //     })
  //   );

  //   // Setting the marker radius for the city by passing population into the markerSize function
  //   median_income.push(
  //     L.circle(locations[i].coordinates, {
  //       stroke: false,
  //       fillOpacity: 0.75,
  //       color: "purple",
  //       fillColor: "purple",
  //       radius: markerSize(money.median)
  //     })
  //   );

  function getColor(d) {
    return d > 100000 ? '#bfff00' :
            d > 85000  ? '#ffff00' :
            d > 55000  ? "#ffbf00" :
            d > 45000  ? "#ff8000" :
            d > 30000  ? "#ff4000" :
            "#ff0000";
  }
//   // Check for location property
  var circle = L.circle([location.coordinates[1], location.coordinates[0]], {
      fillOpacity: 1,
      color: getColor(money.median),
      fillColor: getColor(money.median),
      radius: markerSize(money.median)})
      .bindPopup("<h1>" + money.city + ", " + money.state + "</h1> <hr> <h2>Household Median Income: " + "$"+ money.median + "</h2>")
      .addTo(myMap);

//     // Add a new marker to the cluster group and bind a pop-up
    // coord.push([location.coordinates[1], location.coordinates[0]]);
    // income.push(money.median);
  
}
// });

// var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//   attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
//   maxZoom: 18,
//   id: "mapbox.dark",
//   accessToken: API_KEY
// }).addTo(myMap);

// var median = L.layerGroup(living_cost);
// var cost = L.layerGroup(median_income);

// var myMap = L.map("map", {
//     center: [40.7128, -74.0059],
//     zoom: 13,
//     layers: [lightmap, cost, median]
//   });

var legend = L.control({position: 'bottomright'});

// var baseMaps = {
//   "Street Map": lightmap,
//   "Dark Map": darkmap
// };

// // Create an overlay object
// var overlayMaps = {
//   "State Population": cost,
//   "City Population": median
// };

// L.control.layers(baseMaps, overlayMaps, {
//   collapsed: false
// }).addTo(myMap);

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

// var div = L.DomUtil.create('div', 'info legend'),
//     labels = ['<strong>Median Income</strong>'],
//     median_categories = ['Road Surface','Signage','Line Markings','Roadside Hazards','Other'];

//     for (var i = 0; i < median_categories.length; i++) {

//             div.innerHTML += 
//             labels.push(
//                 '<i class="circle" style="background:' + getColor(median_categories[i]) + '"></i> ' +
//             (median_categories[i] ? median_categories[i] : '+'));

//         }
//         div.innerHTML = labels.join('<br>');
//     return div;
//     };
//     legend.addTo(myMap);
//   });