// import d3
import * as d3 from "d3"

// create sample data of amazon retail pricing of a garmin for last 12 months
const data = [
  { date: "2018-01-01", price: 100 },
  { date: "2018-02-01", price: 200 },
  { date: "2018-03-01", price: 300 },
  { date: "2018-04-01", price: 400 },
  { date: "2018-05-01", price: 500 },
  { date: "2018-06-01", price: 450 },
  { date: "2018-07-01", price: 700 },
  { date: "2018-08-01", price: 390 },
  { date: "2018-09-01", price: 500 },
  { date: "2018-10-01", price: 700 },
  { date: "2018-11-01", price: 800 },
  { date: "2018-12-01", price: 850 },
]

// create a bar chart
const svg = d3.select("svg")
const margin = { top: 20, right: 20, bottom: 30, left: 40 }
const width = +svg.attr("width") - margin.left - margin.right
const height = +svg.attr("height") - margin.top - margin.bottom
const g = svg
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

const x = d3
  .scaleBand()
  .rangeRound([0, width])
  .padding(0.1)
  .domain(data.map((d) => d.date))

const maxPrice = d3.max(data, (d) => d.price)!

const y = d3.scaleLinear().rangeRound([height, 0]).domain([0, maxPrice])

g.append("g")
  .attr("class", "axis axis--x")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))

g.append("g")
  .attr("class", "axis axis--y")
  .call(d3.axisLeft(y).ticks(10, "$"))
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", "0.71em")
  .attr("text-anchor", "end")
  .text("Price")

g.selectAll(".bar")
  .data(data)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("x", (d) => x(d.date)!)
  .attr("y", (d) => y(d.price))
  .attr("width", x.bandwidth())
  .attr("height", (d) => height - y(d.price))

// Path: index.html
