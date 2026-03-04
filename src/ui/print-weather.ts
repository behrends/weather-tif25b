export interface WeatherData {
  location: string;
  temperatureC: number;
  observedAt: Date;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

export default function printWeather({
  location,
  temperatureC,
  observedAt,
}: WeatherData): void {
  const time = formatTime(observedAt);
  console.log(`Temperatur in ${location} um ${time}: ${temperatureC} Grad`);
}
