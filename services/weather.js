export class WeatherServiceError extends Error {
  constructor(code, message) {
    super(message);
    this.name = 'WeatherServiceError';
    this.code = code;
  }
}

function isNetworkError(error) {
  return error instanceof TypeError;
}

async function geocode(city) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=de&format=json`;
  let res;
  try {
    res = await fetch(url);
  } catch (error) {
    if (isNetworkError(error)) {
      throw new WeatherServiceError(
        'NETWORK',
        'Keine Internetverbindung oder Netzwerkfehler.',
      );
    }
    throw error;
  }

  if (!res.ok) {
    throw new WeatherServiceError(
      'SERVICE_UNAVAILABLE',
      'Open-Meteo Geocoding ist momentan nicht verfügbar.',
    );
  }

  const data = await res.json();
  const result = data.results?.[0];
  if (!result) {
    throw new WeatherServiceError('NOT_FOUND', `Ort "${city}" nicht gefunden.`);
  }
  return { latitude: result.latitude, longitude: result.longitude };
}

async function fetchCurrentTemperature(latitude, longitude) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&timezone=auto`;
  let res;
  try {
    res = await fetch(url);
  } catch (error) {
    if (isNetworkError(error)) {
      throw new WeatherServiceError(
        'NETWORK',
        'Keine Internetverbindung oder Netzwerkfehler.',
      );
    }
    throw error;
  }

  if (!res.ok) {
    throw new WeatherServiceError(
      'SERVICE_UNAVAILABLE',
      'Open-Meteo Wetterdaten sind momentan nicht verfügbar.',
    );
  }

  const data = await res.json();
  const temperature = data.current?.temperature_2m;
  if (typeof temperature !== 'number') {
    throw new WeatherServiceError(
      'INVALID_RESPONSE',
      'Ungültige Antwort von Open-Meteo erhalten.',
    );
  }

  return temperature;
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
