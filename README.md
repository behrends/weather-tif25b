# weather-tif25b

Einfache CLI-Wetter-App in Node.js mit zwei Modi:

- Stadt direkt eingeben
- Stadt per Freitext-Beschreibung über OpenAI erkennen

## Features

- Interaktives Terminal-Menü
- Orts-Erkennung aus Beschreibung (OpenAI)
- Speicherung bereits genutzter Städte mit `conf`
- Zeitformatierung in `de-DE`

## Voraussetzungen

- Node.js 18+
- npm
- OpenAI API Key

## Installation

```bash
npm install
```

## Konfiguration

Die App erwartet die Umgebungsvariable `OPENAI_API_KEY`.

macOS / Linux (zsh, bash):

```bash
export OPENAI_API_KEY="dein_api_key"
```

Windows PowerShell:

```powershell
$env:OPENAI_API_KEY="dein_api_key"
```

## Start

```bash
node main.js
```

Beim Start erscheint ein Menü mit:

- `Ort eingeben`
- `Ort per Beschreibung (KI)`

Mit `q` (oder Abbruch im Menü) wird die App beendet.

## Speicherung

Gespeicherte Städte werden lokal in der Konfiguration abgelegt.
In diesem Projekt liegt die Datei standardmäßig unter `data.json`.

## Projektstruktur

- `main.js`: Einstiegspunkt, Menü-Loop, API-Key-Check
- `app.js`: Ablauf für Wetterabfrage und KI-Ortserkennung
- `cli.js`: Terminal-Eingaben
- `openaiService.js`: OpenAI-Request zur Orts-Erkennung
- `weatherService.js`: Ausgabe der Wetterdaten
- `storage.js`: Persistenz gespeicherter Städte
- `timeUtils.js`: Uhrzeit-Formatierung

## Hinweise

- Die Wetterausgabe ist aktuell statisch (`2 Grad`) und dient als Platzhalter.
- Das KI-Modell ist in `openaiService.js` auf `gpt-5-mini` gesetzt.
