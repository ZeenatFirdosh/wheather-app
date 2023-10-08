// Add your JavaScript code here
const apiKey = 'c953f78b042c326677d7450701ca69f4'; // Replace with your API key

document.addEventListener('DOMContentLoaded', () => {
    const locationInput = document.getElementById('location-input');
    const getWeatherButton = document.getElementById('get-weather-button');
    const weatherSection = document.getElementById('weather-section');
    const errorSection = document.getElementById('error-section');
    const unitToggle = document.getElementById('unit-toggle');

    // Function to fetch weather data from the API
    async function fetchWeatherData(location, unit) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=${apiKey}`);
            const data = await response.json();

            if (response.ok) {
                displayWeatherData(data);
            } else {
                displayError(data.message);
            }
        } catch (error) {
            displayError('An error occurred. Please try again.');
        }
    }

// Function to fetch weather data by latitude and longitude
async function fetchWeatherDataByCoords(lat, lon, unit) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`);
        const data = await response.json();

        if (response.ok) {
            displayWeatherData(data);
        } else {
            displayError(data.message);
        }
    } catch (error) {
        displayError('An error occurred. Please try again.');
    }
}

    // Function to display weather data
    function displayWeatherData(data) {
        errorSection.innerHTML = ''; // Clear any previous error messages
        const { name, main, weather, wind } = data;

        const weatherHTML = `
            <h2>${name}</h2>
            <p>Temperature: ${main.temp}&deg;</p>
            <p>Humidity: ${main.humidity}%</p>
            <p>Weather: ${weather[0].description}</p>
            <p>Wind Speed: ${wind.speed} m/s</p>
        `;

        weatherSection.innerHTML = weatherHTML;
    }

    // Function to display error messages
    function displayError(message) {
        weatherSection.innerHTML = ''; // Clear any previous weather data
        errorSection.innerHTML = `<p class="error">${message}</p>`;
    }

    // Event listener for the "Get Weather" button
    getWeatherButton.addEventListener('click', () => {
        const location = locationInput.value;
        const unit = unitToggle.value;
        fetchWeatherData(location, unit);
    });

    // Event listener for unit selection change
    unitToggle.addEventListener('change', () => {
        const location = locationInput.value;
        const unit = unitToggle.value;
        fetchWeatherData(location, unit);
    });

    // Geolocation
    if ('geolocation' in navigator) {
        const geolocationButton = document.createElement('button');
        geolocationButton.textContent = 'Use My Location';
        geolocationButton.id = "geolocation-button";
        geolocationButton.addEventListener('click', () => {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const unit = unitToggle.value;
                fetchWeatherDataByCoords(lat, lon, unit);           
             }, () => {
                displayError('Geolocation permission denied. Please enter a location manually.');
            });
        });
        unitToggle.insertAdjacentElement('afterend', geolocationButton);
    }
});
