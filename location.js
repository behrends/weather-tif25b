import { question } from 'readline-sync';
import printWeather from './weather-output.js';

function inputCity() {
  const city = question('Für welche Stadt willst du das Wetter wissen? ');
  if (city.trim().length === 0) {
    return;
  }

  return city;
}

export default function startWeatherQuery() {
  const city = inputCity();

  if (city === undefined) {
    console.log('Fehler: Eingabe darf nicht leer sein!');
  } else {
    printWeather(city);
  }
}
