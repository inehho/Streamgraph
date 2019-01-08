console.log("This is linked to the html")

d3.select("body").append("svg")

var cost_of_living_url = "http://localhost:5000/census"

d3.json(cost_of_living_url, function (error, data_a) {
   console.log(data_a)
})





