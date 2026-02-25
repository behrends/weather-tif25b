import { keyInSelect } from 'readline-sync';
import startLocationByDescription from './cli/flows/ai-location.js';
import startWeatherQuery from './cli/flows/manual-location.js';
import chooseSavedCity from './cli/flows/choose-saved.js';

console.log('Willkommen zur Wetter-App');

async function main() {
  while (true) {
    const options = [
      'Ort eingeben',
      'Ort per Beschreibung (KI)',
      'Ort aus Speicher wählen',
    ];
    const choice = keyInSelect(options, 'Auswahl');
    if (choice === 0) {
      await startWeatherQuery();
    } else if (choice === 1) {
      await startLocationByDescription();
    } else if (choice === 2) {
      await chooseSavedCity();
    } else if (choice === -1) {
      console.log('Auf Wiedersehen! ');
      process.exit();
    }
  }
}

main();
