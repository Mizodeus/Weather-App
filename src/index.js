import "./styles.css";
import getJson from "./api.js";
import processJson from "./processor.js";
import render, { showLoading, showError, hideError } from "./render.js";

const unitToggle = document.querySelector(".unitToggle");
const cityInput = document.querySelector(".city-input");
const searchBtn = document.querySelector(".search-btn");

const STORAGE_KEY_GEO = "weather_geo";
const STORAGE_KEY_UNIT = "weather_unit";

let unit = localStorage.getItem(STORAGE_KEY_UNIT) || "metric";
let geo = localStorage.getItem(STORAGE_KEY_GEO) || "Moscow";

unitToggle.textContent = unit === "metric" ? "°C" : "°F";
cityInput.value = geo;

async function updateWeather() {
  showLoading();
  hideError();
  
  try {
    const json = await getJson(geo, unit);
    if (!json) throw new Error("Unable to fetch weather data");
    if (json.error) throw new Error(json.error.message || "API error");
    
    const data = processJson(json);
    render(data);
    
    localStorage.setItem(STORAGE_KEY_GEO, geo);
    localStorage.setItem(STORAGE_KEY_UNIT, unit);
  } catch (error) {
    console.error("Weather update failed:", error);
    showError(error.message || "Something went wrong. Please try again.");
  }
}

function handleSearch() {
  const city = cityInput.value.trim();
  if (!city) {
    showError("Please enter a city name");
    return;
  }
  geo = city;
  updateWeather();
}

unitToggle.addEventListener("click", () => {
  unit = unit === "metric" ? "us" : "metric";
  unitToggle.textContent = unit === "metric" ? "°C" : "°F";
  updateWeather();
});

searchBtn.addEventListener("click", handleSearch);
cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleSearch();
});

updateWeather();