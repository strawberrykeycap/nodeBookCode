/*
const axios = require ('axios');
// Function to fetch weather data
async function fetchWeather (city) {
try {
const apiKey = 'your_api_key_here'; // Replace with your OpenWeatherMap API key
const url = `http://api.openweathermap.org/data/2.5/weather?
q=${city}&appid=${apiKey}&units=metric`;
const response = await axios. get (url);
const weatherData = response.data;
console. log (`Weather in ${city}:`);
console. log (`Temperature: ${weatherData.main.temp}°C`);
console. log (`Description: ${weatherData.weather[0].description}`);
} catch (error) {
console. error ('Error fetching weather data:', error.message);
}
}
// Get the city name from command line arguments
const city = process.argv[2];
if (!city) {
console. error ('Please provide a city name.');
process. exit (1);
}
// Fetch and display the weather data
fetchWeather (city);
console. log ('Fetching weather data...');

*/ 

const axios = require('axios');

/**
 * Convert a city name to geographic coordinates using Nominatim (OpenStreetMap).
 * (Not part of NWS, but required to use the /points endpoint.)touch
 */

async function getCoordinates(city) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1`;
  const response = await axios.get(url, {
    headers: { 
      'User-Agent': 'WeatherApp/1.0 (evelynlewis568@gmail.com)' // Required by Nominatim
    }
  });

  if (response.data.length === 0) {
    throw new Error(`City "${city}" not found`);
  }

  const { lat, lon } = response.data[0];
  return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
}

/**
 * Fetch weather for a given city using the National Weather Service API.
 * Follows the OpenAPI specification provided.
 */
async function fetchWeather(city) {
  try {
    // 1. Get coordinates for the city
    const { latitude, longitude } = await getCoordinates(city);

    // 2. Call the NWS /points/{point} endpoint (OpenAPI path: /points/{point})
    const pointUrl = `https://api.weather.gov/points/${latitude},${longitude}`;
    const pointResponse = await axios.get(pointUrl, {
      headers: {
        'User-Agent': 'WeatherApp/1.0',          // Required by NWS (see securitySchemes.userAgent)
        // 'X-Api-Key': 'your-api-key-here'      // Optional: if you have an API key (apiKeyAuth)
      }
    });

    const pointUrl = 'https://api.weather.gov/points/';
    // 3. Extract the forecast URL from the response (points to a gridpoint forecast)
    const forecastUrl = pointResponse.data.properties.forecast;   // e.g., /gridpoints/{office}/{gridX},{gridY}/forecast

    // 4. Fetch the actual forecast (OpenAPI path: /gridpoints/{office}/{gridX},{gridY}/forecast)
    const forecastResponse = await axios.get(forecastUrl, {
      headers: { 'User-Agent': 'WeatherApp/1.0' }
    });

    // 5. Get the first forecast period (usually today)
    const today = forecastResponse.data.properties.periods[0];
    const temperature = today.temperature;        // in Fahrenheit
    const description = today.shortForecast;      // e.g., "Sunny", "Partly Cloudy"

    // Display results (same format as original)
    console.log(`Weather in ${city}:`);
    console.log(`Temperature: ${temperature}°F`);
    console.log(`Description: ${description}`);
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
  }
}

// --- Command-line handling ---
const city = process.argv[2];
if (!city) {
  console.error('Please provide a city name.');
  process.exit(1);
}

fetchWeather(city);
console.log('Fetching weather data...');