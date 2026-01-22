import OpenAI from 'openai';
import { keyInSelect, question } from 'readline-sync';

console.log('Willkommen zur Wetter-App');

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Hauptmenü
while (true) {
  const options = ['Ort eingeben', 'Ort mit KI suchen'];
  let choice = keyInSelect(options, 'Auswahl');
  if (choice === 0) {
    weather();
  } else if (choice === 1) {
    await searchLocationWithAI();
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

function cleanLocationOutput(text) {
  const firstLine = text.split(/\r?\n/).map((line) => line.trim())[0] || '';
  return firstLine.replace(/^["']|["']$/g, '').replace(/[.,;:!?]+$/, '').trim();
}

async function searchLocationWithAI() {
  const description = question(
    'Beschreibe den Ort, den du suchst (z.B. "Hauptstadt von Frankreich"): '
  );
  if (description.trim().length === 0) {
    console.log('Keine Beschreibung eingegeben.');
    return;
  }

  if (!process.env.OPENAI_API_KEY) {
    console.log(
      'Fehler: OPENAI_API_KEY fehlt. Bitte setzen mit: export OPENAI_API_KEY="dein_key"'
    );
    return;
  }

  console.log('KI sucht nach: ' + description + ' ...');
  let response;
  try {
    response = await client.responses.create({
      model: 'gpt-4.1-mini',
      input:
        'Gib nur den Ortsnamen (Stadt, optional Land) ohne Zusatztext zurück. ' +
        'Beschreibung: "' +
        description +
        '"',
    });
  } catch (error) {
    console.log('Fehler beim Aufruf der OpenAI-API.');
    return;
  }

  const location = cleanLocationOutput(response.output_text ?? '');
  if (!location) {
    console.log('Kein Ort gefunden.');
    return;
  }

  console.log('KI hat gefunden: ' + location);

  const formattedNow = getCurrentTimestamp();
  outputWeather(location, formattedNow);
}
