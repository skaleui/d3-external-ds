import * as d3 from 'd3';
//import '../resources/MonthlySales.csv';

var margin = {top: 80, right: 20, bottom: 80, left: 50},
  width = 400 - margin.left - margin.right,
  height = 270 - margin.top - margin.bottom;

var svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

var lineFun = d3.line()
  .x(function(d){
    console.log(x(d.month));
    return x(d.month);})
  .y(function(d){
    console.log(y(d.sales));
    return y(d.sales);});


d3.csv("MonthlySales.csv", function(data){

//  console.log(data);

  var viz1 = svg.append("path")
    .datum([data])
    .attr("d",lineFun)
    .attr("stroke","purple")
    .attr("stroke-width","12px");

  // Add the X Axis
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add the Y Axis
  svg.append("g")
    .call(d3.axisLeft(y));
});

