import { describe, expect, it } from 'vitest';
import { celsiusToFahrenheit } from './temperature.ts';

// Describe fasst Testfälle zusammen
describe('temperature convert functions', () => {
  it('rechnet 0°C in 32°F um', () => {
    // Arrange — Testdaten vorbereiten
    const celsius = 0;

    // Act — Funktion aufrufen
    const result = celsiusToFahrenheit(celsius);

    // Assert — Ergebnis prüfen
    expect(result).toBe(32);
  });

  it('rechnet 100°C in 212°F um', () => {
    const celsius = 100;
    const result = celsiusToFahrenheit(celsius);
    expect(result).toBe(212);
  });

  it('rechnet -7°C in 19,4°F um', () => {
    expect(celsiusToFahrenheit(-7)).toBe(19.4);
  });

  it('wirft Fehler bei NaN-Eingabe', () => {
    expect(() => celsiusToFahrenheit(Number.NaN)).toThrow(
      'Ungültige Temperatur',
    );
  });
});
