// console.log("This is linked to the html")

d3.select("body").append("svg")

var cost_of_living_url = "http://localhost:5000/census"

d3.json(cost_of_living_url, function (error, data_a) {


//    console.log(data_a)
})



var census_url = "http://localhost:5000/census"

d3.json(census_url, function (error, data_b) {
//    console.log(data_b.city)
   var bottom = data_b.map(function(d) { return d.city; });
   var cost = data_b.map(function(d) { return d.cost_of_living; });
   var income = data_b.map(function(d) { return d.mean; });
   var power = data_b.map(function(d) { return d.purchasing_power; });



   //needs updating
   graph(bottom,cost,income,power)
})


function graph (bottom, cost, income,power){
    const CHART = document.getElementById("graphTwo");

    let graphTwo = new Chart(CHART, {
        type: 'line',
        data: {
            labels: bottom,
            datasets: [
                {
                    label: "Cost of Living",
                    fill: true,
                    lineTension: 0.1,
                    backgroundColor: "rgba(51,51,255,0.1)",
                    borderColor:"rgba(0,51,255,6)",
                    borderCapStyle: 'round',
                    borderDash:[],
                    borderDashOffset:0.0,
                    borderJoinStyle: 'mitter',
                    pointBoderColor: "rgba(155, 99, 132, 2)",
                    pointerBackgroundColor: "#fff",
                    pointerBorderWidth: 4,
                    pointerHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(155, 99, 132, 3)",
                    pointHoverBorderColor: "rgba(220, 220, 220, 3)",
                    pointHoverBorderWidth:2,
                    pointRadius: 8,
                    pointHitRadius:10,
                    // data should be cost of living
                    data: cost,
                    yAxisID: 'y-axis-1',                },
                {
                    label: "Income",
                    fill: true,
                    lineTension: 1, 
                    backgroundColor: "rgba(255,0,0,0.2)",
                    borderColor:"rgba(255, 179, 64, 6)",
                    borderCapStyle: 'round',
                    borderDash:[],
                    borderDashOffset:0.0,
                    borderJoinStyle: 'mitter',
                    pointBoderColor: "rgba(255, 159, 64, 2)",
                    pointerBackgroundColor: "#fff",
                    pointerBorderWidth: 4,
                    pointerHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(255, 156, 64, 0.5)",
                    pointHoverBorderColor: "rgba(120, 120, 160, 1)",
                    pointHoverBorderWidth:2,
                    pointRadius: 8,
                    pointHitRadius:10,
                    // data should be income
                    data: income,
                    yAxisID: 'y-axis-2'
                },
                {
                    label: "Purchasing Power",
                    fill: false,
                    lineTension: 0,
                    backgroundColor: "rgba(51,51,255,0.1)",
                    borderColor:"rgba(51,255,102,7)",
                    borderCapStyle: 'round',
                    borderDash:[],
                    borderDashOffset:0.0,
                    borderJoinStyle: 'mitter',
                    pointBoderColor: "rgba(155, 99, 132, 3)",
                    pointerBackgroundColor: "#fff",
                    pointerBorderWidth: 4,
                    pointerHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(155, 99, 132, 3)",
                    pointHoverBorderColor: "rgba(220, 220, 220, 3)",
                    pointHoverBorderWidth:2,
                    pointRadius: 8,
                    pointHitRadius:10,
                    // data should be cost of living
                    data: power,
                    yAxisID: 'y-axis-1',                }
            ]},
            options: {
                responsive: true,
                title: {
					display: true,
					text: 'Are You Making enough to Survice? - chart comparing:'
				},
				tooltips: {
					mode: 'index'
				},
                scales: {
                    yAxes:[{
                        display: true,
						scaleLabel: {
							display: true,
							labelString: 'Cost of Living Per City'
						},
                        type:'linear',
                        ticks: {
                            beginAtZero:true
                        },
                        position: 'left',
						id: 'y-axis-1'
                    },
                    {
                        display: true,
						scaleLabel: {
							display: true,
							labelString: 'Income Per City'
						},
                        type:'linear',
                        ticks: {
                            beginAtZero:true
                        },
                        position: 'right',
                        id: 'y-axis-2',
                        gridLines: {
                            drawOnChartArea: false, // only want the grid lines for one axis to show up
                        }
                    }]            
                     }
                }
    
            }
    );

}

graph();