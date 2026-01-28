import { question, keyInSelect } from 'readline-sync';
import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  console.error('Fehler: Umgebungsvariable OPENAI_API_KEY ist nicht gesetzt.');
  process.exit(1);
}

const openai = new OpenAI();

console.log('Willkommen zur Wetter-App');

async function main() {
  while (true) {
    const options = ['Ort eingeben', 'Ort per Beschreibung (KI)'];
    const choice = keyInSelect(options, 'Auswahl');
    if (choice === 0) {
      startWeatherQuery();
    } else if (choice === 1) {
      await startLocationByDescription();
    } else if (choice === -1) {
      console.log('Auf Wiedersehen! ');
      process.exit();
    }
  }
}

main();
async function getLocationByDescription(description) {
  const response = await openai.chat.completions.create({
    model: 'gpt-5-mini',
    messages: [
      {
        role: 'system',
        content:
          'Du bist ein Assistent, der Ortsbeschreibungen in konkrete Städtenamen umwandelt. Antworte NUR mit dem Städtenamen, ohne zusätzlichen Text.',
      },
      {
        role: 'user',
        content: description,
      },
    ],
  });
  return response.choices[0].message.content.trim();
}

async function startLocationByDescription() {
  const description = question('Beschreibe den Ort: ');
  if (description.trim().length === 0) {
    console.log('Fehler: Beschreibung darf nicht leer sein!');
    return;
  }
  const location = await getLocationByDescription(description);
  console.log(`Erkannter Ort: ${location}`);
}

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
