import { question } from 'readline-sync';
import { resolveCity } from '../../services/ai-location-lookup.js';
import { getWeather } from '../../services/weather.js';
import printWeather from '../../ui/print-weather.js';
import getWeatherErrorMessage from '../../ui/weather-error-message.js';
import promptAndSaveCity from './prompt-save-city.js';

export default async function startLocationByDescription() {
  const description = question('Beschreibe den Ort: ');
  if (description.trim().length === 0) {
    console.log('Fehler: Beschreibung darf nicht leer sein!');
    return;
  }
  let location;
  try {
    location = await resolveCity(description);
  } catch (error) {
    if (error instanceof Error && error.message === 'OPENAI_API_KEY fehlt') {
      console.error(
        'Fehler: Umgebungsvariable OPENAI_API_KEY ist nicht gesetzt.',
      );
    } else {
      console.error(
        'Fehler bei der Ortsauflösung. Bitte versuche es später erneut.',
      );
    }
    return;
  }
  if (!location) {
    console.log(`Keinen passenden Ort gefunden für "${description}".`);
  } else {
    try {
      const weather = await getWeather(location);
      printWeather(weather);
      promptAndSaveCity(location);
    } catch (error) {
      console.log(
        getWeatherErrorMessage(error, {
          location,
          notFoundMessage: `Für "${location}" wurde kein Ort gefunden. Bitte versuche eine präzisere Beschreibung.`,
        }),
      );
    }
  }
}
