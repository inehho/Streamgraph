console.log("This is linked to the html")

d3.select("body").append("svg")

var cost_of_living_url = "http://localhost:5000/census"

d3.json(cost_of_living_url, function (error, data_a) {


   console.log(data_a)
})



var census_url = "http://localhost:5000/census"

d3.json(census_url, function (error, data_b) {
   console.log(data_b)


   //needs updating
   graph(data_b)
})


function graph (sdfsdf){
    const CHART = document.getElementById("graphTwo");

    let graphTwo = new Chart(CHART, {
        type: 'line',
        data: {
            labels: sdfsdf,
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
                    // data should be cost of living
                    data: [80,15,62,34,26,]
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
                    // data should be income
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

}

graph();