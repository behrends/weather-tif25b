import { question, keyInSelect } from 'readline-sync';

export function promptMenu(options, prompt) {
  return keyInSelect(options, prompt);
}

export function promptCity() {
  const city = question('Für welche Stadt willst du das Wetter wissen? ');
  if (city.trim().length === 0) {
    return;
  }

  return city;
}

export function promptDescription() {
  const description = question('Beschreibe den Ort: ');
  if (description.trim().length === 0) {
    return;
  }

  return description;
}
