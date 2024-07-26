const apiKey = "4535ce1be115d4c30e55d144d175ff09";

function validateCity() {
    const cityInput = document.getElementById("city-input").value;
    const getWeatherBtn = document.getElementById("get-weather-btn");
    getWeatherBtn.disabled = false;
}

async function checkWeather() {
    const city = document.getElementById("city-input").value;
    
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},IL&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();

        console.log(data);

        const weatherInfo = document.getElementById("weather-info");
        weatherInfo.innerHTML = `
            <p>Location: ${data.name}, ${data.sys.country}</p>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Feels Like: ${data.main.feels_like}°C</p>
            <p>Min Temperature: ${data.main.temp_min}°C</p>
            <p>Max Temperature: ${data.main.temp_max}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Pressure: ${data.main.pressure} hPa</p>
            <p>Visibility: ${data.visibility} meters</p>
            <p>Wind Speed: ${data.wind.speed} km/h</p>
            <p>Wind Direction: ${data.wind.deg}°</p>
            <p>Weather: ${data.weather[0].main} (${data.weather[0].description})</p>
        `;
    } catch (error) {
        console.error("Fetch error: ", error);
    }
}