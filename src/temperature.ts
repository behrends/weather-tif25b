export function celsiusToFahrenheit(celsius: number): number {
  // Defensiver Check: zur Laufzeit relevant, falls die Funktion
  // aus ungetyptem JavaScript aufgerufen wird
  if (typeof celsius !== 'number' || Number.isNaN(celsius)) {
    throw new Error('Ungültige Temperatur');
  }
  return (celsius * 9) / 5 + 32;
}
