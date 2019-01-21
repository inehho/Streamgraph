var income_url = "http://localhost:5000/income"

d3.json(income_url, function(error, response) {
  var test = GeoJSON.parse(response, {Point:["Lat", "Lng"]});


  var all_data = test.features;
//   console.log(all_data);


  var incomeMarkers = [];
  var powerMarkers = [];
  var costMarkers = [];
  var rentMarkers = [];
  var groceriesMarkers = [];
  var notZero = [];

  for (var i = 0; i < all_data.length; i++) {

  // Set the data location property to a variable
    var location = all_data[i].geometry;
    var money = all_data[i].properties;

    if(money.cost_index !== 0){
        notZero.push(location.coordinates);
    }
    else {
        continue;
    }
  
//   for (var i=0; i<notZero.length; i++) {
    //   console.log(notZero.length);
//   }
}
console.log(notZero.length);
});