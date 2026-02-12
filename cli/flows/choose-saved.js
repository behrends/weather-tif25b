import { keyInSelect } from 'readline-sync';
import { getWeather, WeatherServiceError } from '../../services/weather.js';
import printWeather from '../../ui/print-weather.js';
import { getSavedCities } from '../../storage/cities.js';

export default async function chooseSavedCity() {
  const cities = getSavedCities();
  if (cities.length === 0) {
    console.log('Keine gespeicherten Städte vorhanden.');
    return;
  }

  const choice = keyInSelect(cities, 'Gespeicherte Stadt wählen');
  if (choice === -1) {
    return;
  }

  const city = cities[choice];
  try {
    const weather = await getWeather(city);
    printWeather(weather);
  } catch (error) {
    if (error instanceof WeatherServiceError && error.code === 'NOT_FOUND') {
      console.log(
        `Die gespeicherte Stadt "${city}" wurde nicht gefunden. Du kannst sie später erneut speichern.`,
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
