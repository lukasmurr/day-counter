# DayCounter

Eine Angular 21 Single Page Application, die die Zeit bis zur Rückkehr einer geliebten Person aus dem Auslandssemester zählt.

## 🎯 Funktionen

Die App bietet eine übersichtliche, responsive Ansicht für drei wichtige Zeitpunkte:

1.  **Countdown bis zur Rückkehr**: Zeigt Tage, Stunden, Minuten und Sekunden bis zum `RETURN_DATE`.
2.  **Vergangene Zeit**: Zählt die Tage seit dem Abflug (`DEPARTURE_DATE`).
3.  **Nächstes Treffen**: Ein separater Countdown für ein geplantes Wiedersehen (`NEXT_MEETING`).

**Besonderheiten:**
- **Responsive Design**: Optimiert für Desktop, Tablet und Mobile (Mobile-First CSS).
- **Echtzeit-Aktualisierung**: Die Werte werden jede Sekunde aktualisiert.
- **Ziel-Status**: Zeigt liebevolle Nachrichten an, wenn ein Datum erreicht wurde (z.B. "Sie ist wieder da!").

## 🛠️ Technologien

Das Projekt wurde mit modernen Web-Standards gebaut:

- **Framework**: [Angular 21](https://angular.dev/) (Preview/Latest Features)
- **Architektur**: Standalone Components & Zoneless-ready (Signals-based).
- **State Management**: Angular Signals (`computed`, `signal`).
- **Styling**: SCSS mit CSS Grid & Flexbox.

## ⚙️ Konfiguration (Daten ändern)

Die Daten für die Zeitpunkte sind als **harte Konstanten** im `CountdownService` hinterlegt.
Um die Daten anzupassen, bearbeite die Datei:

`src/app/countdown.service.ts`

```typescript
const RETURN_DATE = new Date('2026-06-30T12:00:00'); 
const DEPARTURE_DATE = new Date('2026-01-01T08:00:00'); 
const NEXT_MEETING = new Date('2026-02-14T18:00:00'); 
```

## 🚀 Installation & Start

Voraussetzung: Node.js und npm installiert.

1.  **Repository klonen**
    ```bash
    git clone https://github.com/dein-user/day-counter.git
    cd day-counter
    ```

2.  **Abhängigkeiten installieren**
    ```bash
    npm install
    ```

3.  **Entwicklungsserver starten**
    ```bash
    npm start
    # oder
    ng serve
    ```
    Öffne `http://localhost:4200/` im Browser.

## 📦 Deployment (GitHub Pages)

Das Projekt ist für das Deployment auf GitHub Pages vorbereitet.
Zum Bauen und Veröffentlichen (vorausgesetzt `angular-cli-ghpages` ist eingerichtet):

```bash
ng deploy --base-href=/day-counter/
```

## 📄 Lizenz

Dieses Projekt ist für private Zwecke erstellt.
