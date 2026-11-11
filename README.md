# Week 6: Asynchronous JavaScript — Weather Dashboard

## Author
- **Name:** Stephen Githaiga Muriu
- **GitHub:** [@Stephen-Dev254]
- **Date:** November 11, 2026

## Project Description
An asynchronous Weather Dashboard built with the OpenWeatherMap API that retrieves live weather conditions and 5-day forecasts for any searched city or current geolocation. The project also includes an asynchronous JavaScript sandbox (`async-practice.html` and `async.js`) demonstrating callbacks, Promises, `async/await`, and RESTful `GET`/`POST` operations.

## Technologies Used
- HTML5
- CSS3 (Responsive Grid & Dynamic Weather Themes)
- JavaScript (ES6+, Fetch API, Promises, Async/Await, Geolocation API, LocalStorage)
- OpenWeatherMap API & JSONPlaceholder API
- GitHub Actions & GitHub Pages

## Features
- **Live Weather & 5-Day Forecast:** Fetches real-time temperature, feels-like temperature, humidity, wind speed, pressure, and a 5-day noon forecast via `Promise.all()`.
- **Unit Toggle & Geolocation:** Switches dynamically between Celsius (`°C`) and Fahrenheit (`°F`) and supports one-click weather detection using browser coordinates.
- **Persistent Recent Searches:** Stores the last 5 searched cities in `localStorage` and uses event delegation to re-query any city on click.
- **Graceful Error Handling:** Displays clear loading indicators and distinct error banners for invalid city names (`404`), unactivated API keys (`401`), and offline network errors.
- **Automated Secret Injection:** Deploys via GitHub Actions by writing `config.js` from repository secrets so no API key ever enters Git history.

## How to Run
1. Clone this repository:
   ```bash
   git clone https://stephen-dev254.github.io/iyf-s12-week-06-Stephen-Dev254/
   
   ```
2. Copy `config.example.js` to `config.js` and add your OpenWeatherMap API key:
   ```javascript
   const API_KEY = "3935315df99528a7d2b6471c731006d5";
   ```
3. Open `index.html` (Weather Dashboard) or `async-practice.html` (Lessons 11–12 practice) using VS Code **Live Server**.

## Lessons Learned
- **Why `fetch()` Requires Manual `response.ok` Checks:**
  Unlike network failures, HTTP error codes like `404 Not Found` or `401 Unauthorized` do not cause `fetch()` to reject automatically. Checking `if (!response.ok)` explicitly before calling `response.json()` ensures invalid city searches and unactivated keys jump cleanly into the `catch` block instead of crashing when reading undefined properties.
- **Parallel Execution with `Promise.all()`:**
  Awaiting the current weather request and the 5-day forecast request sequentially doubles the waiting time for the user. Wrapping both `fetch()` calls inside `Promise.all()` runs both network requests simultaneously and cuts loading latency in half.
- **Protecting API Keys with `.gitignore` and GitHub Actions:**
  Keeping `config.js` ignored locally while providing `config.example.js` prevents API keys from leaking into public Git history. Using a GitHub Actions workflow secret (`OPENWEATHER_API_KEY`) generates `config.js` exclusively inside the deployment runner at build time.

## Challenges Faced
- **Handling Multi-Word City Names:**
  Searching for cities with spaces such as `"Dar es Salaam"` initially risked malformed query URLs. Wrapping user input in `encodeURIComponent(city)` safely encodes spaces and special characters before sending the request.
- **Preventing Duplicate URL Typos in Practice Scripts:**
  During Lesson 12 exercises, shortened domain typos (`typicode.com`) triggered `ERR_NAME_NOT_RESOLVED` failures. Auditing network requests in DevTools and standardizing endpoint URLs into reusable async helper functions resolved the issue.

## Live Demo
[View Live Demo] https://stephen-dev254.github.io/iyf-s12-week-06-Stephen-Dev254/
