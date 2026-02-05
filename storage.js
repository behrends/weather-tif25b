import { keyInYNStrict } from 'readline-sync';

export function saveCity(name) {
  const save = keyInYNStrict(`Soll "${name}" gespeichert werden?`);
  if (save) {
    console.log('Wird gespeichert!');
  }
}
