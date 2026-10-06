import { LINK, KEY } from "./config.js";

export default async function getJson(geo, unit) {
  try {
    let response = await fetch(`${LINK}${geo}?unitGroup=${unit}&key=${KEY}`);
    let json = await response.json();
    console.log(json);
    return json;
  } catch (err) {
    console.log("Error", err);
  }
}
