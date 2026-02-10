import { promptCity, promptDescription, promptSaveCity } from './cli.js';
import { getLocationByDescription } from './openaiService.js';
import { getSavedCities, saveCity } from './storage.js';
import { getCurrentTime } from './timeUtils.js';
import { printWeather } from './weatherService.js';

export async function startLocationByDescription() {
  const description = promptDescription();
  if (!description || description.trim().length === 0) {
    console.log('Fehler: Beschreibung darf nicht leer sein!');
    return;
  }
  const location = await getLocationByDescription(description);
  console.log(`Erkannter Ort: ${location}`);
}

export function startWeatherQuery() {
  const city = promptCity();

  if (city === undefined) {
    console.log('Fehler: Eingabe darf nicht leer sein!');
  } else {
    const savedCities = getSavedCities();
    const alreadySaved = savedCities.includes(city);
    if (!alreadySaved) {
      const shouldSave = promptSaveCity(city);
      if (shouldSave) {
        const result = saveCity(city);
        if (result.saved) {
          console.log('Stadt gespeichert.');
        }
      }
    }
    const formattedNow = getCurrentTime();
    printWeather(city, formattedNow);
  }
}
