console.log("This is linked to the html")


// // Chart Params
// var svgWidth = window.innerWidth;
// var svgHeight = window.innerHeight;

// var margin = { top: 20, right: 40, bottom: 60, left: 50 };

// var width = svgWidth - margin.left - margin.right;
// var height = svgHeight - margin.top - margin.bottom;

// // Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
// var svg = d3
//   .select("body")
//   .append("svg")
//   .attr("width", svgWidth)
//   .attr("height", svgHeight);

// var chartGroup = svg.append("g")
  // .attr("transform", `translate(${margin.left}, ${margin.top})`);


 var cost_of_living_url = "http://localhost:5000/census"

 d3.json(cost_of_living_url, function (error, data_a) {
 
 
    console.log(data_a)
 })

//  function GetData(data){
//          console.log(data)

//  }


 
 // //  //COST OF LIVING JSON DATA (RIGHT AXIS)
 //  d3.json("../../JSONDATA/costofliving.json", function(colData) {
 //     // if(error) throw error;
 //     console.log(colData);
 //     // console.log([colData]);
 
 //     var yScale2 = d3.scaleLinear()
 //                     .domain([0, d3.max(colData, d=> d.cities.cost_of_living)])
 //                     .range([svgHeight,0])
 //     var rightAxis = d3.axisRight(yScale2)
 
 //   // Add y2-axis to the right side of the display
 //     chartGroup.append("g")
 //         // Define the color of the axis text
 //                     .classed("blue", true)
 //                     .attr("transform", `translate(${width}, 0)`)
 //                     .call(rightAxis);
     
 //     var createLine2 = d3.line()
 //             .x(d =>xScale(d.cities.name))
 //             .y(d =>yScale2(d.cities.cost_of_living))
 //     // Append a path for line2
 //   chartGroup.append("path")
 //     .data([colData])
 //     .attr("d", createLine2)
 //     .classed("line blue", true);
 
 //  });
 
 
 // // CITIES JSON DATA (LEFT AXIS)
 // d3.json("../../JSONDATA/income.json", function(cityData) {
 
 //     // cityData.forEach(function(data) {
 //     //     data.Cities = +data.Cities;
 //     //     data.income = +data.income;
 //     //   });
 
 //     //if(error) throw error;
 //     // console.log("cityData");
 //     console.log(cityData);
 //     var xScale = d3.scaleLinear()
 //                     .domain([d3.extent(cityData, d=> d.Cities)])
 //                     .range([0, svgWidth]);
 //     var yScale1 = d3.scaleLinear()
 //                     .domain([0, d3.max(cityData, d=> d.Cities.income)])
 //                     .range([svgHeight,0]);
 //     var bottomAxis = d3.axisBottom(xScale);
 //     var leftAxis = d3.axisLeft(yScale1);
 
 //   // Add x-axis
 //   chartGroup.append("g")
 //     .attr("transform", `translate(0, ${height})`)
 //     .call(bottomAxis);
 
 //   // Add y1-axis to the left side of the display
 //   chartGroup.append("g")
 //     // Define the color of the axis text
 //     .classed("green", true)
 //     .call(leftAxis);
 
 
 //     var createLine1 = d3.line()
 //         .x(cityData => xScale(cityData.Cities.name))
 //         .y(cityData => yScale1(cityData.Cities.income))
 
 //     // svg.append("path")
 //     //     .attr("stroke", "black")
 //     //     .attr("stroke-width", "1")
 //     //     .attr("fill", "none")
 //     //     .attr("d", createLine1(cityData));
 //   // Append a path for line1
 //   chartGroup.append("path")
 //     .data([cityData])
 //     .attr("d", createLine1)
 //     .classed("line green", true);
 
 
 //  });