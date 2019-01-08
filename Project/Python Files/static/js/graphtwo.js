const CHART = document.getElementById("graphTwo");
console.log(CHART);

var census_url = "http://localhost:5000/census";
var living_url = "http://localhost:5000/summary"


d3.json(census_url, function(error, testing) {
    console.log(testing);

    
    var city_name = [];

    for(var i=0; i<testing.length; i++) {
        var location=testing[i].city;

        if(location){
            city_name.push(location.city);
        }
        console.log(city_name);

    }

});

let graphTwo = new Chart(CHART, {
    type: 'line',
    data: {
        labels: ["Jan", "FEB", "March", "April"],
        datasets: [
            {
                label: "Hardcoded Dataset",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor:"rgba(255, 159, 64, 0.2)",
                borderCapStyle: 'round',
                borderDash:[],
                borderDashOffset:0.0,
                borderJoinStyle: 'mitter',
                pointBoderColor: "rgba(255, 159, 64, 0.2)",
                pointerBackgroundColor: "#fff",
                pointerBorderWidth: 1,
                pointerHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(255, 156, 64, 0.2)",
                pointHoverBorderColor: "rgba(220, 220, 220, 1)",
                pointHoverBorderWidth:2,
                pointRadius: 1,
                pointHitRadius:10,
                data: [55,34,22,44,36,]
            },
            {
                label: "Hardcoded Dataset",
                fill: true,
                lineTension: 0.6, 
                backgroundColor: "rgba(255, 110, 132, 0.2)",
                borderColor:"rgba(255, 179, 64, 0.2)",
                borderCapStyle: 'round',
                borderDash:[],
                borderDashOffset:0.0,
                borderJoinStyle: 'mitter',
                pointBoderColor: "rgba(255, 159, 64, 0.2)",
                pointerBackgroundColor: "#fff",
                pointerBorderWidth: 1,
                pointerHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(255, 156, 64, 0.2)",
                pointHoverBorderColor: "rgba(120, 120, 160, 1)",
                pointHoverBorderWidth:2,
                pointRadius: 1,
                pointHitRadius:10,
                data: [60,15,82,34,26,]
            }
        ]},
        options: {
            scales: {
                yAxes:[{
                    ticks: {
                        begingAtZero:true
                    }
                }]            
                 }
            }

        }
);