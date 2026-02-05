import { keyInYNStrict } from 'readline-sync';
import Conf from 'conf';

const store = new Conf({
  projectName: 'weather-tif25b',
  configName: 'data',
  cwd: '.',
});

export function saveCity(name) {
  const save = keyInYNStrict(`Soll "${name}" gespeichert werden?`);
  if (save) {
    const cities = store.get('cities', []);
    if (cities.includes(name)) {
      console.log('Ist bereits gespeichert.');
      return;
    }
    cities.push(name);
    store.set('cities', cities);
    console.log('Wird gespeichert!');
  }
}
