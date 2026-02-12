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
      getWeather();
    } else if (choice === -1) {
      console.log('Auf Wiedersehen! ');
      process.exit();
    }
  }
}

function getWeather() {
  console.log('Diese Funktion ist noch nicht implementiert.');
}

main();
