import * as d3 from 'd3';
//import '../resources/MonthlySales.csv';

var margin = {top: 80, right: 20, bottom: 80, left: 50},
  width = 600 - margin.left - margin.right,
  height = 670 - margin.top - margin.bottom;

var svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleLinear().range([0, width]).domain([0,150]);
var y = d3.scaleLinear().range([height, 0]).domain([0,350]);

var lineFun = d3.line()
  .x(function(d){
//    console.log((d.month));
    return d.month;})
  .y(function(d){
//    console.log((d.sales));
    return (height - d.sales);})
  .curve(d3.curveMonotoneX)

d3.csv("MonthlySales.csv").then(function(data){

  console.log(data);

  var viz1 = svg.append("path")
    .data([data])
    .attr("d",lineFun)
    .attr("class","line");

  data.forEach(function(d){


  svg.append("circle")
    .attr("cx", d.month)
    .attr("cy", height-d.sales)
    .attr("r", 3)
    .attr("stroke", "blue");
  })

  // Add the X Axis
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add the Y Axis
  svg.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(y));
});

