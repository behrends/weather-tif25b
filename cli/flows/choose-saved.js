import { keyInSelect } from 'readline-sync';
import { getWeather } from '../../services/weather.js';
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
  const weather = await getWeather(city);
  printWeather(weather);
}
