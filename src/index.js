import "./styles.css";
import getJson from "./api.js";
import processJson from "./processor.js";
import render from "./render.js";

const unitToggle = document.querySelector(".unitToggle");
const geo = "Moscow"; // можно сделать ввод города

let unit = "metric";

async function updateWeather() {
  const json = await getJson(geo, unit);
  const data = processJson(json);
  render(data);
}

unitToggle.addEventListener("click", () => {
  unit = unit === "metric" ? "us" : "metric";
  unitToggle.textContent = unit === "metric" ? "°C" : "°F";
  updateWeather();
});

updateWeather();
