function getCurrentTime() {
  const now = new Date();

  const formattedNow = now.toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  return formattedNow;
}

export default function printWeather(location) {
  const time = getCurrentTime();
  console.log(`Temperatur in ${location} um ${time}: 2 Grad`);
}
