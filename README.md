# weather-tif25b

Einfache CLI-Wetter-App in Node.js mit zwei Modi:

- Stadt direkt eingeben
- Stadt per Freitext-Beschreibung über OpenAI erkennen
- Stadt aus lokal gespeichertem Verlauf auswählen

## Features

- Interaktives Terminal-Menü
- Orts-Erkennung aus Beschreibung (OpenAI)
- Speicherung bereits genutzter Städte mit `conf`
- Auswahl bereits gespeicherter Städte
- Aktuelle Temperatur über Open-Meteo API
- Zeitformatierung in `de-DE`

## Voraussetzungen

- Node.js 20.6+
- npm
- OpenAI API Key (nur für KI-Modus)

## Installation

```bash
npm install
```

## Konfiguration

Die App erwartet die Umgebungsvariable `OPENAI_API_KEY`.

Lege dafür eine `.env` im Projektroot an:

```env
OPENAI_API_KEY=dein_api_key
```

Die Variable wird beim Start über die native Node.js-Funktion `--env-file` geladen.

## Start

```bash
npm start
```

Hinweis: Der manuelle Modus (`Ort eingeben` und `Ort aus Speicher wählen`) funktioniert auch ohne gesetzten `OPENAI_API_KEY`.

Beim Start erscheint ein Menü mit:

- `Ort eingeben`
- `Ort per Beschreibung (KI)`
- `Ort aus Speicher wählen`

Mit `q` (oder Abbruch im Menü) wird die App beendet.

## Speicherung

Gespeicherte Städte werden lokal in der Konfiguration abgelegt.
In diesem Projekt liegt die Datei standardmäßig unter `data.json`.

Um mit Beispielstädten zu starten, kann die Vorlage kopiert werden:

```bash
cp data-example.json data.json
```

## Projektstruktur

- `main.js`: Einstiegspunkt und Menü-Loop
- `cli/flows/manual-location.js`: Stadt manuell eingeben und Wetter abrufen
- `cli/flows/ai-location.js`: Ort per Beschreibung auflösen und Wetter abrufen
- `cli/flows/choose-saved.js`: Gespeicherte Stadt wählen
- `cli/flows/prompt-save-city.js`: Stadt optional speichern
- `services/ai-location-lookup.js`: OpenAI-Request zur Orts-Erkennung
- `services/weather.js`: Geocoding + aktuelle Temperatur über Open-Meteo
- `storage/cities.js`: Persistenz gespeicherter Städte
- `ui/print-weather.js`: Formatierte Ausgabe inkl. Uhrzeit

## Hinweise

- Die Umgebungsvariable `OPENAI_API_KEY` wird nur für den KI-Modus benötigt.
- Das KI-Modell ist in `services/ai-location-lookup.js` auf `gpt-5-mini` gesetzt.
