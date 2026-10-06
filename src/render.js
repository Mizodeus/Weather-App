import icons from "./icons.js";

const content = document.querySelector(".content");
const loadingEl = document.querySelector(".loading");
const errorEl = document.querySelector(".error");

export default function render(data) {
  content.innerHTML = "";

  const weather = document.createElement("div");
  weather.classList.add("weather");

  const address = document.createElement("div");
  address.classList.add("address");
  address.textContent = data.address;

  const date = document.createElement("div");
  date.classList.add("date");
  date.textContent = data.date;

  const temp = document.createElement("div");
  temp.classList.add("temp");
  temp.textContent = `${Math.round(data.temp)}°`;

  const icon = document.createElement("img");
  icon.classList.add("icon");
  icon.src = icons[data.icon] || icons["clear-day"];
  icon.alt = data.icon;

  weather.append(address, date, temp, icon);
  content.append(weather);

  hideLoading();
  hideError();
}

export function showLoading() {
  if (loadingEl) loadingEl.style.display = "block";
}

export function hideLoading() {
  if (loadingEl) loadingEl.style.display = "none";
}

export function showError(message) {
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.add("show");
  }
}

export function hideError() {
  if (errorEl) {
    errorEl.classList.remove("show");
  }
}