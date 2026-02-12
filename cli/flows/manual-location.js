import { question } from 'readline-sync';
import { getWeather, WeatherServiceError } from '../../services/weather.js';
import printWeather from '../../ui/print-weather.js';
import promptAndSaveCity from './prompt-save-city.js';

function inputCity() {
  const city = question('Für welche Stadt willst du das Wetter wissen? ');
  if (city.trim().length === 0) {
    return;
  }

  return city;
}

export default async function startWeatherQuery() {
  const city = inputCity();

  if (city === undefined) {
    console.log('Fehler: Eingabe darf nicht leer sein!');
  } else {
    try {
      const weather = await getWeather(city);
      printWeather(weather);
      promptAndSaveCity(city);
    } catch (error) {
      if (error instanceof WeatherServiceError && error.code === 'NOT_FOUND') {
        console.log(
          `Für "${city}" wurde kein Ort gefunden. Bitte prüfe die Schreibweise oder gib einen anderen Ortsnamen ein.`,
        );
      } else if (
        error instanceof WeatherServiceError &&
        error.code === 'NETWORK'
      ) {
        console.log(
          'Keine Internetverbindung erkannt. Bitte prüfe deine Verbindung und versuche es erneut.',
        );
      } else if (
        error instanceof WeatherServiceError &&
        error.code === 'SERVICE_UNAVAILABLE'
      ) {
        console.log(
          'Der Wetterdienst ist gerade nicht erreichbar. Bitte versuche es später erneut.',
        );
      } else {
        console.log(
          'Wetterdaten konnten gerade nicht geladen werden. Bitte versuche es später erneut.',
        );
      }
    }
  }
}
