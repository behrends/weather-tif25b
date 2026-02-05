import { question } from 'readline-sync';
import OpenAI from 'openai';
import printWeather from './weather-output.js';

const openai = new OpenAI();

async function getLocationByDescription(description) {
  const response = await openai.chat.completions.create({
    model: 'gpt-5-mini',
    messages: [
      {
        role: 'system',
        content: `Du bist ein Assistent, der Ortsbeschreibungen in konkrete Städtenamen umwandelt. 
          Antworte NUR mit dem Städtenamen, ohne zusätzlichen Text.
          Wenn du keinen Ort findest, dann antworte mit "NULL"`,
      },
      {
        role: 'user',
        content: description,
      },
    ],
  });
  return response.choices[0].message.content.trim();
}

export default async function startLocationByDescription() {
  const description = question('Beschreibe den Ort: ');
  if (description.trim().length === 0) {
    console.log('Fehler: Beschreibung darf nicht leer sein!');
    return;
  }
  const location = await getLocationByDescription(description);
  if (location === 'NULL') {
    console.log(`Keinen passenden Ort gefunden für "${description}".`);
  } else {
    printWeather(location);
  }
}
