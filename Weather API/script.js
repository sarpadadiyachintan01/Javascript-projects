
const apiKey = '6a743be92b95875e9627fe1d5c2cc375'; 

const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherResult = document.getElementById('weather-result');
const errorMessage = document.getElementById('error-message');


const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const weatherIcon = document.getElementById('weather-icon');


searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city !== '') {
        getWeatherData(city);
    }
});


cityInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city !== '') {
            getWeatherData(city);
        }
    }
});


async function getWeatherData(city) {
    
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

       
        if (response.ok) {
            displayWeather(data);
        } else {
            showError();
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        showError();
    }
}


function displayWeather(data) {
    
    errorMessage.classList.add('hidden');
    weatherResult.classList.remove('hidden');

   
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    
    
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}


function showError() {
    weatherResult.classList.add('hidden');
    errorMessage.classList.remove('hidden');
}