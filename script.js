const svg = d3.select('svg');

const width = +svg.attr("width");
const height = +svg.attr("height");

const margin = {
    top: 20,
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

    g.append('g').call(d3.axisLeft(yScale))
    g.append('g')
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(d3.axisBottom(xScale));
    
    g.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('y', d => yScale(yVal(d)))
        .attr("width", d => xScale(xVal(d)))
        .attr("height", yScale.bandwidth())
        
}

d3.csv('./data.csv').then(data => {
    data.forEach(d => d.population = +d.population)
    render(data)
})