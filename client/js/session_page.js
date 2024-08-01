import sessionService from "./services/sessionService.js";

async function getSession(sessionId) {
    try {
        const data = await sessionService.query();
        if (!data || data.length === 0) {
            throw new Error("No data found for the given session ID");
        }
        const sessionData = data.find(session => session.sessionId == sessionId);
        if (!sessionData) {
            throw new Error("No session found with the given session ID");
        }
        displayGraph(data);
        displaySession(sessionData);

        document.querySelector(".card").addEventListener('click', () => {
            const sessionDataEncoded = encodeURIComponent(JSON.stringify(sessionData));
            window.location.href = `goals.html?sessionData=${sessionDataEncoded}`;
        });
    } catch (error) {
        console.error(`Error fetching session with ID ${sessionId}:`, error);
    }
}

function displayGraph(data) {
    const avgWaveLeft = d3.mean(data, d => d.waveLeft);
    const avgWaveRight = d3.mean(data, d => d.waveRight);
    const avgMaxSpeed = d3.mean(data, d => d.maxSpeed);
    const avgRowing = d3.mean(data, d => d.rowing);

    const chartData = [
        { label: 'WaveLeft', value: avgWaveLeft },
        { label: 'WaveRight', value: avgWaveRight },
        { label: 'Speed', value: avgMaxSpeed },
        { label: 'Rowing', value: avgRowing }
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
}

function displaySession(sessionData) {
    const sessionName = document.querySelector(".session_name");
    sessionName.textContent = sessionData.name;

    const sessionDate = document.querySelector(".session_date");
    sessionDate.textContent = sessionData.date;
}

window.onload = (async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('sessionId');
    if (!sessionId) {
        console.error("No sessionId found in the URL parameters");
        return;
    }
    await getSession(sessionId);
})();
