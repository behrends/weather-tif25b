import Conf from 'conf';

interface CityStore {
  cities: string[];
}

const store = new Conf<CityStore>({
  projectName: 'weather-tif25b',
  configName: 'data',
  cwd: '.',
});

export interface SaveCityResult {
  saved: boolean;
  alreadyExists: boolean;
}

export function saveCity(name: string): SaveCityResult {
  const cities = store.get('cities', []);
  if (cities.includes(name)) {
    return { saved: false, alreadyExists: true };
  }
  cities.push(name);
  store.set('cities', cities);
  return { saved: true, alreadyExists: false };
}

export function getSavedCities(): string[] {
  const cities = store.get('cities', []);
  if (!Array.isArray(cities)) {
    return [];
  }

  return cities;
}
