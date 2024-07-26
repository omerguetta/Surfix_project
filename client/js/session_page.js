document.addEventListener('DOMContentLoaded', function() {
    fetch('../data/sessions.json')
    .then(response => response.json())
        .then(data => {
            const avgWaveLeft = d3.mean(data, d => d.wave_left);
            const avgWaveRight = d3.mean(data, d => d.wave_right);
            const avgMaxSpeed = d3.mean(data, d => parseFloat(d.max_speed.split(" ")[0]));
            const avgRowing = d3.mean(data, d => d.rowing);

            const chartData = [
                {label: 'WaveLeft', value: avgWaveLeft},
                {label: 'WaveRight', value: avgWaveRight},
                {label: 'Speed', value: avgMaxSpeed},
                {label: 'Rowing', value: avgRowing}
            ];

            const width = 500;
            const height = 500;
            const outerRadius = height / 2 - 10;
            const innerRadius = outerRadius * 0.75;
            const color = d3.scaleOrdinal()
                .domain(chartData.map(d => d.label))
                .range(['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3']);

            const svg = d3.select("#chart")
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", `translate(${width / 2}, ${height / 2})`);

            const arc = d3.arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius);

            const pie = d3.pie()
                .sort(null)
                .value(d => d.value);

            const path = svg.selectAll("path")
                .data(pie(chartData))
                .enter()
                .append("path")
                .attr("fill", d => color(d.data.label))
                .attr("d", arc);

            const legend = svg.selectAll(".legend")
                .data(chartData)
                .enter()
                .append("g")
                .attr("class", "legend")
                .attr("transform", (d, i) => `translate(${width / 2 - 200}, ${i * 20 - 50})`); // שינוי המיקום

            legend.append("rect")
                .attr("x", 0)
                .attr("width", 18)
                .attr("height", 18)
                .style("fill", d => color(d.label));

            legend.append("text")
                .attr("x", 24)
                .attr("y", 9)
                .attr("dy", ".35em")
                .style("text-anchor", "start")
                .text(d => d.label);
        })
        .catch(error => console.error('Error loading or processing data:', error));
});


