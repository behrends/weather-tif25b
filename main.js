import { promptMenu } from './cli.js';
import { startLocationByDescription, startWeatherQuery } from './app.js';

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
