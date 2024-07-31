import sessionService from "./services/sessionService.js";

async function getSessionData() {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionDataEncoded = urlParams.get('sessionData');
    if (!sessionDataEncoded) {
        console.error("No session data found in the URL parameters");
        return;
    }
    try {
        const sessionData = JSON.parse(decodeURIComponent(sessionDataEncoded));
        console.log("Session data received:", sessionData);
        displaySessionData(sessionData);
    } catch (error) {
        console.error("Error parsing session data from URL parameters:", error);
    }
}

function displaySessionData(sessionData) {
    const sessionName = document.querySelector(".session_name");
    sessionName.textContent = sessionData.name || "No Name Provided";

    const sessionDate = document.querySelector(".session_date");
    sessionDate.textContent = sessionData.date || "No Date Provided";

    createChart('waveLeftChart', 'Wave Left', sessionData.waveLeft);
    createChart('waveRightChart', 'Wave Right', sessionData.waveRight);
    createChart('speedChart', 'Speed', sessionData.maxSpeed);
    createChart('rowingChart', 'Rowing', sessionData.rowing);
}

function createChart(elementId, label, value) {
    const ctx = document.getElementById(elementId);

    if (!ctx) {
        console.error(`Element with id ${elementId} not found.`);
        return;
    }

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [label],
            datasets: [{
                label: label,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                data: [value]
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

window.onload = async () => {
    await getSessionData();
};
