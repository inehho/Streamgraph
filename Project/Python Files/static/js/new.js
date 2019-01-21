var cost_of_living_url = "http://localhost:5000/census"
// var cost_of_living_url = "";
d3.json(cost_of_living_url, function (error, data_a) {
    var city = data_a.map(function(d){return d.city;});
	  var power = data_a.map(function(d){return d.purchasing_power;});
	  var grocery = data_a.map(function(d){return d.groceries_index;});
	  var rent = data_a.map(function(d){return d.rent_index;});

    PurchasePower(city, power, grocery, rent)
});
function PurchasePower(city, power, grocery, rent){
var tracePP = {
  x: city,
  y: power,
  type: "bar",
  name: "Purchasing Power Index"
};
var traceGI = {
    x:city,
    y:grocery,
    type: "bar",
    name: "Grocery Index"
  };
var traceRI = {
    x:city,
    y:rent,
    type: "bar",
    name: "Rent Index"
  };
var data = [tracePP, traceGI, traceRI];
var layout = {
  title: "Purchasing Power by City",
//   xaxis: { title: "City"},
  yaxis: { title: "Purchasing Power"}
};
Plotly.newPlot("plot", data, layout);
};
PurchasePower();





// var cost_of_living_url = "http://localhost:5000/census"
// // var cost_of_living_url = "";
// d3.json(cost_of_living_url, function (error, data_a) {
//     var city = data_a.map(function(d){return d.city;});
// 	var power = data_a.map(function(d){return d.purchasing_power;});
// 	var grocery = data_a.map(function(d){return d.groceries_index;});
// 	var rent = data_a.map(function(d){return d.rent_index;});

//     PurchasePower(city, power, grocery, rent)
// });
// function PurchasePower(city, power, grocery, rent){
// var tracePP = {
//   x: ["beer", "wine", "martini", "margarita",
//       "ice tea", "rum & coke", "mai tai", "gin & tonic"],
// //   x: [city];
//   y: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
// //   y: [power]
//   type: "bar",
//   name: "Purchasing Power Index"
// };
// var traceGI = {
//     x: ["beer", "wine", "martini", "margarita",
//         "ice tea", "rum & coke", "mai tai", "gin & tonic"],
//     // x: city,
//     y: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
//     // y: grocery,
//     type: "bar",
//     name: "Grocery Index"
//   };
// var traceRI = {
//     x: ["beer", "wine", "martini", "margarita",
//         "ice tea", "rum & coke", "mai tai", "gin & tonic"],
//     // x: city,
//     y: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
//     // y: rent,
//     type: "bar",
//     name: "Rent Index"
//   };
// var data = [tracePP, traceGI, traceRI];
// var layout = {
//   title: "Purchasing Power by City",
//   xaxis: { title: "City"},
//   yaxis: { title: "Purchasing Power"}
// };
// Plotly.newPlot("plot", data, layout);
// };
// PurchasePower();

// // Part 1
// var trace1 = {
//   x: ["beer", "wine", "martini", "margarita",
//     "ice tea", "rum & coke", "mai tai", "gin & tonic"],
//   y: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
//   type: "bar"
// };

// var data = [trace1];

// var layout = {
//   title: ""
// };

// Plotly.newPlot("plot", data, layout);





// Part 3 - Line Chart
// var trace1 = {
//   x: ["beer", "wine", "martini", "margarita",
//       "ice tea", "rum & coke", "mai tai", "gin & tonic"],
//   y: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
//   type: "line"
// };

// var data = [trace1];

// var layout = {
//   title: "'Bar' Chart",
// };

// Plotly.newPlot("plot", data, layout);

// // Part 4 - Broken Pie Chart
// var trace1 = {
//   x: ["beer", "wine", "martini", "margarita",
//       "ice tea", "rum & coke", "mai tai", "gin & tonic"],
//   y: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
//   type: "pie"
// };

// var data = [trace1];

// var layout = {
//   title: "'Bar' Chart",
// };

// Plotly.newPlot("plot", data, layout);


// // Part 5 - Working Pie Chart
// var trace1 = {
//   labels: ["beer", "wine", "martini", "margarita",
//       "ice tea", "rum & coke", "mai tai", "gin & tonic"],
//   values: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
//   type: 'pie'
// };

// var data = [trace1];

// var layout = {
//   title: "'Bar' Chart",
// };

// Plotly.newPlot("plot", data, layout);