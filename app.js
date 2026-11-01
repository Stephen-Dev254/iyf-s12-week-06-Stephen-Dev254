// ============================================
// LESSON 12 — WEATHER DASHBOARD
// ============================================

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const MAX_RECENT = 5;

// ---------- DOM ELEMENTS ----------
const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const loading = document.getElementById("loading");
const errorBox = document.getElementById("error");
const weatherDisplay = document.getElementById("weather-display");
const historyList = document.getElementById("search-history");

const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");


// ============================================
// STEP 1 — FETCH WEATHER
// ============================================

async function fetchWeather(city) {

    const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);

    if (!response.ok) {

        if (response.status === 404) {
            throw new Error("City not found");
        }

        if (response.status === 401) {
            throw new Error("API key not valid yet. Check your API key.");
        }

        throw new Error("Failed to fetch weather data");
    }

    return await response.json();
}


// ============================================
// STEP 2 — GET WEATHER
// ============================================

async function getWeather(city) {

    if (typeof API_KEY === "undefined" || !API_KEY) {
        showError("Missing API key: copy config.example.js to config.js and add your API key.");
        return;
    }

    showLoading();
    hideError();

    try {

        const data = await fetchWeather(city);

        displayWeather(data);

        saveToHistory(data.name);

    } catch (err) {

        showError(
            err.name === "TypeError"
                ? "Network error — check your connection"
                : err.message
        );

    } finally {

        hideLoading();

    }
}


// ============================================
// STEP 3 — DISPLAY WEATHER
// ============================================

function displayWeather(data) {

    cityName.textContent = `${data.name}, ${data.sys.country}`;

    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherIcon.alt = data.weather[0].description;

    temperature.textContent = `${Math.round(data.main.temp)}°C`;

    description.textContent = data.weather[0].description;

    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;

    humidity.textContent = `${data.main.humidity}%`;

    wind.textContent = `${data.wind.speed} m/s`;

    pressure.textContent = `${data.main.pressure} hPa`;

    weatherDisplay.classList.remove("hidden");
}


// ============================================
// HELPERS
// ============================================

function showLoading() {
    loading.classList.remove("hidden");
    weatherDisplay.classList.add("hidden");
}

function hideLoading() {
    loading.classList.add("hidden");
}

function showError(message) {
    errorBox.textContent = message;
    errorBox.classList.remove("hidden");
}

function hideError() {
    errorBox.classList.add("hidden");
}


// ============================================
// STEP 4 — RECENT SEARCHES
// ============================================

function loadRecent() {

    try {

        return JSON.parse(localStorage.getItem("recent")) || [];

    } catch (error) {

        return [];

    }
}


function saveToHistory(city) {

    recent = recent.filter(
        item => item.toLowerCase() !== city.toLowerCase()
    );

    recent.unshift(city);

    recent = recent.slice(0, MAX_RECENT);

    localStorage.setItem("recent", JSON.stringify(recent));

    renderHistory();
}


function renderHistory() {

    historyList.innerHTML = "";

    recent.forEach(city => {

        const li = document.createElement("li");

        const button = document.createElement("button");

        button.className = "history-item";

        button.textContent = city;

        button.type = "button";

        li.appendChild(button);

        historyList.appendChild(li);

    });

}


let recent = loadRecent();


// ============================================
// STEP 5 — EVENTS
// ============================================

// Search form event

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const city = cityInput.value.trim();

    if (city) {

        getWeather(city);

        cityInput.value = "";

    }

});


// Recent search click event (Event Delegation)

historyList.addEventListener("click", function(event) {

    const btn = event.target.closest(".history-item");

    if (btn) {

        getWeather(btn.textContent);

    }

});


// Display previous searches when page loads

renderHistory();


// ============================================
// END OF WEATHER DASHBOARD
// ============================================