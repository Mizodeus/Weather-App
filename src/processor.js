export default function processJson(json) {
  let day = json.days[0];
  return {
    address: json.address,
    date: day.datetime,
    temp: day.temp,
    icon: day.icon,
  };
}
