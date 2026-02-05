import { question, keyInSelect } from 'readline-sync';
import startLocationByDescription from './ai-query.js';

if (!process.env.OPENAI_API_KEY) {
  console.error('Fehler: Umgebungsvariable OPENAI_API_KEY ist nicht gesetzt.');
  process.exit(1);
}

console.log('Willkommen zur Wetter-App');

async function main() {
  while (true) {
    const options = [
      'Ort eingeben',
      'Ort per Beschreibung (KI)',
      'Wetter anzeigen',
    ];
    const choice = promptMenu(options, 'Auswahl');
    if (choice === 0) {
      startWeatherQuery();
    } else if (choice === 1) {
      await startLocationByDescription();
    } else if (choice === 2) {
      const city = 'Oslo';
      // "warte auf das Ergebnis"
      await getWeather(city);
    } else if (choice === -1) {
      console.log('Auf Wiedersehen! ');
      process.exit();
    }
  }
}

async function getWeather(city) {
  // Stadt in Geocoding-Service suchen (für Koordinaten)
  try {
    const result = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=de&format=json`,
    );
    // Auf JSON-Daten zugreifen
    const data = await result.json();
    const resultObject = data.results[0];
    console.log(
      'Koordinaten für ' + city,
      resultObject.latitude,
      resultObject.longitude,
    );
  } catch (e) {
    console.error(e.message);
  }
}

main();

function inputCity() {
  const city = question('Für welche Stadt willst du das Wetter wissen? ');
  if (city.trim().length === 0) {
    return;
  }

  return city;
}

function getCurrentTime() {
  const now = new Date();

  const formattedNow = now.toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  return formattedNow;
}

function printWeather(location, time) {
  console.log(`Temperatur in ${location} um ${time}: 2 Grad`);
}

function startWeatherQuery() {
  const city = inputCity();

  if (city === undefined) {
    console.log('Fehler: Eingabe darf nicht leer sein!');
  } else {
    const formattedNow = getCurrentTime();
    printWeather(city, formattedNow);
  }
}
