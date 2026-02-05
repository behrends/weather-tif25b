import { keyInYNStrict, question } from 'readline-sync';
import { resolveCity } from '../../services/ai-location-lookup.js';
import { getWeather } from '../../services/weather.js';
import printWeather from '../../ui/print-weather.js';
import { saveCity } from '../../storage/cities.js';

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
    const weather = getWeather(location);
    printWeather(weather);
    const shouldSave = keyInYNStrict(`Soll "${location}" gespeichert werden?`);
    if (shouldSave) {
      const result = saveCity(location);
      if (result.alreadyExists) {
        console.log('Ist bereits gespeichert.');
      } else if (result.saved) {
        console.log('Wird gespeichert!');
      }
    }
  }
}
