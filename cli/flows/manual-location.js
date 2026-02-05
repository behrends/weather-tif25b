import { keyInYNStrict, question } from 'readline-sync';
import { getWeather } from '../../services/weather.js';
import printWeather from '../../ui/print-weather.js';
import { saveCity } from '../../storage/cities.js';

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
    const weather = getWeather(city);
    printWeather(weather);
    const shouldSave = keyInYNStrict(`Soll "${city}" gespeichert werden?`);
    if (shouldSave) {
      const result = saveCity(city);
      if (result.alreadyExists) {
        console.log('Ist bereits gespeichert.');
      } else if (result.saved) {
        console.log('Wird gespeichert!');
      }
    }
  }
}
