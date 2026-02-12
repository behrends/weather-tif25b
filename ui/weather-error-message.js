import { WeatherServiceError } from '../services/weather.js';

export default function getWeatherErrorMessage(
  error,
  { location, notFoundMessage } = {},
) {
  if (error instanceof WeatherServiceError && error.code === 'NOT_FOUND') {
    if (typeof notFoundMessage === 'string' && notFoundMessage.length > 0) {
      return notFoundMessage;
    }
    return `Für "${location}" wurde kein Ort gefunden. Bitte prüfe die Schreibweise oder gib einen anderen Ortsnamen ein.`;
  }

  if (error instanceof WeatherServiceError && error.code === 'NETWORK') {
    return 'Keine Internetverbindung erkannt. Bitte prüfe deine Verbindung und versuche es erneut.';
  }

  if (
    error instanceof WeatherServiceError &&
    error.code === 'SERVICE_UNAVAILABLE'
  ) {
    return 'Der Wetterdienst ist gerade nicht erreichbar. Bitte versuche es später erneut.';
  }

  return 'Wetterdaten konnten gerade nicht geladen werden. Bitte versuche es später erneut.';
}
