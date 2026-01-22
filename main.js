import { question, keyInSelect } from 'readline-sync';

let input;

while (input !== 'ende') {
  const options = ['Ort eingeben'];
  input = keyInSelect(options, 'Auswahl');
  if (input === 0) {
    weatherApp();
  } else if (input === -1) {
    console.log('Auf Wiedersehen! ');
    input = 'ende';
  }
}

function weatherApp() {
  // Funktionsdeklarationen
  function greeting() {
    console.log('Willkommen zur Wetter-App');
  }

  function input() {
    // Funktionsrumpf
    const city = question('Für welche Stadt willst du das Wetter wissen? ');
    // city ist eine lokale Konstante in der Funktion

    // leere Eingabe verhindern
    if (city.trim().length === 0) {
      return;
    }

    return city; // Rückgabewert der Funktion
  }

  function timestamp() {
    const now = new Date(); // jetziger Zeitpunkt

    const formattedNow = now.toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    return formattedNow;
  }

  function output(location, time) {
    console.log(`Temperatur in ${location} um ${time}: 2 Grad`);
  }

  // Funktionsaufrufe
  greeting();
  const city = input();

  if (city === undefined) {
    console.log('Fehler: Eingabe darf nicht leer sein!');
  } else {
    // ansonsten
    const formattedNow = timestamp();
    output(city, formattedNow);
  }
}
