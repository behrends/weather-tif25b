import Conf from 'conf';

// Speicher (store) mit Conf initialisieren
const store = new Conf({
  projectName: 'weather-tif25b',
  configName: 'data',
  cwd: '.', // current working directory
});

export function saveCity(name) {
  const cities = store.get('cities', []);
  if (cities.includes(name)) {
    return { saved: false, alreadyExists: true };
  }
  cities.push(name);
  store.set('cities', cities);
  return { saved: true, alreadyExists: false };
}

export function getSavedCities() {
  const cities = store.get('cities', []);
  if (!Array.isArray(cities)) {
    return [];
  }

  return cities;
}
