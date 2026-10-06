export default function processJson(json) {
  const now = new Date();
  const currentHour = now.getHours();
  
  const day = json.days[0];
  const hourData = day.hours.find(h => {
    const hour = parseInt(h.datetime.split(":")[0], 10);
    return hour === currentHour;
  }) || day.hours[0];

  const date = new Date(day.datetime);
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return {
    address: json.address,
    date: formattedDate,
    temp: hourData.temp,
    icon: hourData.icon,
  };
}