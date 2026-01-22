import { keyInSelect, question } from 'readline-sync';

console.log('Willkommen zur Wetter-App');

// Hauptmenü
while (true) {
  const options = ['Ort eingeben'];
  let choice = keyInSelect(options, 'Auswahl');
  if (choice === 0) {
    weather();
  } else if (choice === -1) {
    console.log('Auf Wiedersehen! ');
    process.exit();
  }
}

function getCityInput() {
  const city = question('Für welche Stadt willst du das Wetter wissen? ');
  if (city.trim().length === 0) {
    return;
  }

  return city;
}

function getCurrentTimestamp() {
  const now = new Date();

  const formattedNow = now.toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  return formattedNow;
}

function outputWeather(location, time) {
  console.log(`Temperatur in ${location} um ${time}: 2 Grad`);
}

function weather() {
  const city = getCityInput();

  if (city === undefined) {
    console.log('Fehler: Eingabe darf nicht leer sein!');
  } else {
    const formattedNow = getCurrentTimestamp();
    outputWeather(city, formattedNow);
  }
}
