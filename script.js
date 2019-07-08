const svg = d3.select('svg');

const width = +svg.attr("width");
const height = +svg.attr("height");

const margin = {
    top: 40,
    left: 100,
    right: 20,
    bottom: 50
}

const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right;

const render = data => {

    const xVal = d => d.population;
    const yVal = d => d.region;

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, xVal)])
        .range([0, innerWidth]);

    const yScale = d3.scaleBand()
        .domain(data.map(yVal))
        .range([0, innerHeight])
        .padding(0.1)

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const xAxis = d3.axisBottom(xScale)
        .tickFormat(d3.format(".2s"))
        .tickSize(-innerHeight)

    const yAxisGroup = g.append('g')
        .call(d3.axisLeft(yScale));
    const xAxisGroup = g.append('g')
        .call(xAxis)
        .attr("transform", `translate(0, ${innerHeight})`)
        
    yAxisGroup
        .selectAll('.domain, .tick line')
        .remove();

    xAxisGroup
        .select('.domain')
        .remove()
        .selectAll(".tick:not(:first-of-type) line")
        .attr("stroke", "#66ffcc")
        .attr("stroke-dasharray", "2,2");


    xAxisGroup.append("text")
        .text('Population')
        .attr("fill", "black")
        .attr("x", `${(innerWidth-margin.right)/2}`)
        .attr("y",40)
        .attr('class', "axes-lable")

    g.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('y', d => yScale(yVal(d)))
        .attr("width", d => xScale(xVal(d)))
        .attr("height", yScale.bandwidth())

    g.append('text')
        .attr('y', '-10')
        .text('Population (by estimate) as of May 1, 2019')
        .attr("class", "char-title")

}

d3.csv('./data.csv').then(data => {
    data.forEach(d => d.population = +d.population)
    data.sort((a,b)=>a.population-b.population)
    console.log(data)
    render(data)
})