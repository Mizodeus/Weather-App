import { LINK, KEY } from "./config.js";

export default async function getJson(geo, unit) {
  try {
    let response = await fetch(`${LINK}${geo}?unitGroup=${unit}&key=${KEY}&include=hours`);
    let json = await response.json();
    return json;
  } catch (err) {
    console.error("Error", err);
  }
}