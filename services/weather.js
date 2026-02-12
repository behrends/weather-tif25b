async function geocode(city) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=de&format=json`;
  const res = await fetch(url);
  const data = await res.json();
  const result = data.results?.[0];
  if (!result) {
    throw new Error(`Ort "${city}" nicht gefunden.`);
  }
  return { latitude: result.latitude, longitude: result.longitude };
}

async function fetchCurrentTemperature(latitude, longitude) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&timezone=auto`;
  const res = await fetch(url);
  const data = await res.json();
  return data.current.temperature_2m;
}

export async function getWeather(location) {
  const { latitude, longitude } = await geocode(location);
  const temperatureC = await fetchCurrentTemperature(latitude, longitude);
  return {
    location,
    temperatureC,
    observedAt: new Date(),
  };
}
