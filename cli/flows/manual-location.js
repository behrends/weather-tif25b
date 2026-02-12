import { question } from 'readline-sync';
import { getWeather } from '../../services/weather.js';
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
      if (error instanceof Error && error.message.includes('nicht gefunden')) {
        console.log(
          `Für "${city}" wurde kein Ort gefunden. Bitte prüfe die Schreibweise oder gib einen anderen Ortsnamen ein.`,
        );
      } else {
        console.log(
          'Wetterdaten konnten gerade nicht geladen werden. Bitte versuche es später erneut.',
        );
      }
    }
  }
}
