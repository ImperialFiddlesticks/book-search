FOLIO – Boksökningsapp

FOLIO är en mobilapplikation byggd med React Native och Expo som låter användare söka efter böcker genom text, röst(exklusivt till iOS) eller att skanna streckkoder. Användaren kan även spara favoriter, skapa collections och hantera en läslista.

Tekniker och bibliotek

- React Native – ramverk för mobilutveckling
- Expo – utvecklingsplattform och verktygskedja
- TypeScript – statisk typning
- Expo Router – filbaserad navigering
- Zustand – global state management
- React Query (TanStack Query) – datahämtning och caching
- React Native Paper – UI-komponentbibliotek
- Open Library API – externt API för bokdata
- ApiHub Speech to Text API - externt API för röst-till-text konvertering

Projektstruktur

Appen är organiserad enligt Expo Routers filbaserade routing, där varje fil i app/-mappen motsvarar en skärm.
app/
index.tsx # Startsida
details.tsx # Bokdetaljer
searchResults.tsx # Sökresultat
favoritesPage.tsx # Favoriter och samlingar
scanner.tsx # Streckkodsskanner
author/[key].tsx # Författardetaljer

components/ # Återanvändbara UI-komponenter
BookCard.tsx
BookCover.tsx
BookBar.tsx
BookDetails.tsx
Header.tsx
ActionButton.tsx
Save.tsx
Booksearchbar.tsx
Subjects.tsx
Sorting.tsx
Language.tsx
PreviousSearched.tsx

store/ # Zustand-stores för global state
hooks/ # Custom hooks för API-anrop
types/ # TypeScript-typdefinitioner

Funktioner

- Boksökning – sök efter böcker via titel, författare eller ämne
- Röst-till-text-sökning – stöds på iOS och macOS
- Streckkodsskanning – skanna en boks ISBN-kod med kameran
- Favoriter och samlingar – spara böcker i egna samlingar
- Läslista – håll koll på böcker du vill läsa
- Filtrering och sortering – filtrera på ämne och språk, sortera på relevans, betyg eller utgivningsår
- Paginering – sökresultat visas med sidnavigering
- Författarsidor – se information och verk av en specifik författare
- Boksidor - se information om specifika böcker med länkar för att köpa, låna eller dela med vänner.

Arbetsflöde

Projektet utvecklades i grupp med Git och GitHub för versionshantering samt Trello för projektplanering och uppgiftsfördelning.
Arbetet delades upp komponentvis där varje gruppmedlem ansvarade för olika delar av appen. Pull requests användes för kodgranskning innan ändringar mergades till huvudgrenen.

Tillgänglighet

Tillgänglighet var en central del av projektet och en av de största utmaningarna. Nedan beskrivs de principer och tekniker som implementerades.

accessibilityRole
Alla interaktiva element har tilldelats rätt semantisk roll:

- "header" på sidtitlar och sektionsrubriker så skärmläsare kan navigera efter rubriker
- "link" på element som navigerar till en annan skärm (t.ex. författarnamn, listtitlar)
- "togglebutton" på knappar med ett av/på-tillstånd (t.ex. favorit- och läslisteknappen)
- "alert" på felmeddelanden och tomma tillstånd så de annonseras direkt
- "progressbar" på laddningsindikatorer

accessibilityLabel och accessibilityHint
Beskrivande etiketter har lagts till på alla interaktiva element:

- Bokomslag får dynamiska etiketter som inkluderar titel och författare: "The Hobbit av J.R.R. Tolkien, 1 av 10"
- Knappar utan synlig text (ikonknappar) har tydliga etiketter
- accessibilityHint används för att förklara vad som händer när man trycker, t.ex. "Öppnar bokdetaljer"
- Rollnamnet utelämnas från etiketten eftersom skärmläsaren annonserar det automatiskt

accessibilityState
Tillstånd kommuniceras till skärmläsare för interaktiva element:

- Favorit- och läslisteknapparna använder { checked: true/false } för att indikera om de är aktiva
- Sorteringsmenyns öppna/stängda tillstånd kommuniceras med { expanded: true/false }
- Ämnesfiltrens valda tillstånd kommuniceras med { checked: true/false }

accessibilityLiveRegion
Dynamiska innehållsändringar annonseras automatiskt utan att användaren behöver navigera dit:

- "polite" på laddningsindikatorer – annonseras när skärmläsaren är ledig
- "assertive" på felmeddelanden – avbryter och annonseras omedelbart

Övriga tillgänglighetsval

- Paginering istället för infinite scroll – ett medvetet designval eftersom paginering är mer förutsägbart och lättnavigerat för skärmläsaranvändare. Med infinite scroll är det svårt att veta var man befinner sig i listan.
- Dekorativa element döljs – ikoner och bilder som redan beskrivs av en omgivande etikett döljs med accessibilityElementsHidden och importantForAccessibility="no-hide-descendants" för att undvika redundant information
- accessibilityViewIsModal – sätts på modala dialoger så skärmläsaren inte kan navigera till innehåll bakom modalen
- Listpositioner – böcker i horisontella listor annonseras med sin position, t.ex. "1 av 10", så användaren vet hur många böcker som finns

Installation och körning

Installera beroenden
npm install

Starta utvecklingsservern
npx expo start
