import { keyInYNStrict } from 'readline-sync';
import { saveCity } from '../../storage/cities.js';

export default function promptAndSaveCity(city) {
  const shouldSave = keyInYNStrict(`Soll "${city}" gespeichert werden?`);
  if (!shouldSave) return;

  const result = saveCity(city);
  if (result.alreadyExists) {
    console.log('Ist bereits gespeichert.');
  } else if (result.saved) {
    console.log('Wird gespeichert!');
  }
}
