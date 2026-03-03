import { describe, expect, it } from 'vitest';
import { WeatherServiceError } from '../services/weather.js';
import getWeatherErrorMessage from './weather-error-message.js';

describe('getWeatherErrorMessage', () => {
  it('returns custom message for NOT_FOUND when provided', () => {
    const error = new WeatherServiceError('NOT_FOUND', 'not found');

    const result = getWeatherErrorMessage(error, {
      location: 'Berlin',
      notFoundMessage: 'Bitte anderen Ort wählen.',
    });

    expect(result).toBe('Bitte anderen Ort wählen.');
  });

  it('returns default NOT_FOUND message when no custom message is given', () => {
    const error = new WeatherServiceError('NOT_FOUND', 'not found');

    const result = getWeatherErrorMessage(error, { location: 'Berlin' });

    expect(result).toBe(
      'Für "Berlin" wurde kein Ort gefunden. Bitte prüfe die Schreibweise oder gib einen anderen Ortsnamen ein.',
    );
  });

  it('returns network message for NETWORK errors', () => {
    const error = new WeatherServiceError('NETWORK', 'network');

    const result = getWeatherErrorMessage(error, { location: 'Berlin' });

    expect(result).toBe(
      'Keine Internetverbindung erkannt. Bitte prüfe deine Verbindung und versuche es erneut.',
    );
  });

  it('returns service unavailable message for SERVICE_UNAVAILABLE errors', () => {
    const error = new WeatherServiceError(
      'SERVICE_UNAVAILABLE',
      'service unavailable',
    );

    const result = getWeatherErrorMessage(error, { location: 'Berlin' });

    expect(result).toBe(
      'Der Wetterdienst ist gerade nicht erreichbar. Bitte versuche es später erneut.',
    );
  });

  it('returns generic fallback for unknown WeatherServiceError codes', () => {
    const error = new WeatherServiceError('SOMETHING_ELSE', 'unknown');

    const result = getWeatherErrorMessage(error, { location: 'Berlin' });

    expect(result).toBe(
      'Wetterdaten konnten gerade nicht geladen werden. Bitte versuche es später erneut.',
    );
  });

  it('returns generic fallback for non WeatherServiceError errors', () => {
    const error = new Error('boom');

    const result = getWeatherErrorMessage(error, { location: 'Berlin' });

    expect(result).toBe(
      'Wetterdaten konnten gerade nicht geladen werden. Bitte versuche es später erneut.',
    );
  });
});
