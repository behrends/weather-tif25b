import { keyInSelect } from 'readline-sync';
import printWeather from '../helpers/weather-output.js';
import { getSavedCities } from '../helpers/storage.js';

export default function chooseSavedCity() {
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
  printWeather(city);
}
