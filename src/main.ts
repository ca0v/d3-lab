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
  { date: "2018-07-01", price: 440 },
  { date: "2018-08-01", price: 390 },
  { date: "2018-09-01", price: 500 },
  { date: "2018-10-01", price: 700 },
  { date: "2018-11-01", price: 800 },
  { date: "2018-12-01", price: 850 },
].map((v) => ({
  ...v,
  price: v.price + Math.round(Math.random() * 100 - 50) / 100,
  date: nameOfMonth(new Date(v.date)),
}))

// create a bar chart
const svg = d3.select("svg")
const margin = { top: 20, right: 20, bottom: 60, left: 60 }
const width = +svg.attr("width") - margin.left - margin.right
const height = +svg.attr("height") - margin.top - margin.bottom
const g = svg
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

const xScale = d3
  .scaleBand()
  .rangeRound([0, width])
  .padding(0.3)
  .domain(data.map((d) => d.date))

const maxPrice = d3.max(data, (d) => d.price)!
// maxPrice to rounded up to nearest 100
const maxPriceRounded = Math.ceil(maxPrice / 100) * 100

const yScale = d3.scaleLinear().rangeRound([height, 0]).domain([0, maxPriceRounded])

// x-axis, bottom
g.append("g")
  .attr("class", "axis axis--x")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(xScale))

// y-axis with title
g.append("g")
  .attr("class", "axis axis--y")
  .call(d3.axisLeft(yScale).ticks(5, ".0f"))
  .append("g") // y axis title
  .classed("axis-title-pos", true)
  .append("text") // y axis title
  .classed("axis-title-text", true)
  .attr("text-anchor", "end")
  .text("Price (USD)") // title

g.selectAll(".bar")
  .data(data)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("x", (d) => xScale(d.date)!)
  .attr("y", (d) => yScale(d.price))
  .attr("width", xScale.bandwidth())
  .attr("height", (d) => height - yScale(d.price))

function nameOfMonth(date: Date): any {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  // get month in zulu time
  const month = date.getUTCMonth()
  return monthNames[month]
}
// Path: index.html
