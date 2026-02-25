function formatTime(date) {
  return date.toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

export default function printWeather({ location, temperatureC, observedAt }) {
  const time = formatTime(observedAt);
  console.log(`Temperatur in ${location} um ${time}: ${temperatureC} Grad`);
}
