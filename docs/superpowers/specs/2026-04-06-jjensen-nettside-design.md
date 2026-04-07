# JJ Jensen Lærhandel — Nettside Design

**Dato:** 2026-04-06
**Prosjekt:** Ny nettside for Jørn Jensen Lærhandel AS
**Kilde:** Omskriving av eksisterende nettside på jjensen.no

---

## Oversikt

En ny, enkel og ryddig nettside for Jørn Jensen Lærhandel AS — en norsk familiebedrift som selger lær, kniver, verktøy og materialer for knivmaking og lærarbeid. Nettsiden erstatter den nåværende som har uoversiktlig navigasjon med 50+ underkategorier og en tungvint bestillingsprosess.

Nettsiden er et statisk, serverløst prosjekt som fungerer direkte i nettleseren lokalt, og enkelt kan deployes til en webserver eller tjeneste som Netlify/GitHub Pages uten endringer.

---

## Arkitektur

### Filstruktur

```
JJ-nettside/
├── index.html          ← Forside
├── products.html       ← Produktkatalog med filter og søk
├── cart.html           ← Handlekurv og bestillingsskjema
├── about.html          ← Om oss, åpningstider, kontakt, kart
├── takk.html           ← Takkeside etter sendt bestilling
├── css/
│   └── style.css       ← All styling
├── js/
│   ├── products.js     ← All produktdata (navn, pris, kategori, bilde-URL)
│   ├── cart.js         ← Handlekurv-logikk (localStorage)
│   └── main.js         ← Felles logikk (header, navigasjon)
└── docs/
    └── superpowers/specs/   ← Designdokumenter
```

### Teknologi
- Ren HTML/CSS/JavaScript — ingen rammeverk, ingen byggverktøy
- `localStorage` for handlekurv-state mellom sider
- [FormSubmit.co](https://formsubmit.co) for å sende bestillingsskjema til firmapost@jjensen.no
- Produktbilder lastes direkte fra `https://www.jjensen.no/web_images/direkteopplastet/...`

---

## Design

### Visuell stil
- **Fargepalett:** Varm og tradisjonell — mørk brun (`#4a3728`) som primærfarge, beige/krem (`#e8d5b0`) som tekstfarge på mørk bakgrunn, lys krem (`#f5ede0`) som bakgrunn for seksjoner
- **Ingen emojier** i grensesnittet
- **Typografi:** System-fonter (`system-ui, -apple-system`)
- **Produktbilder:** Hentet fra eksisterende jjensen.no via full URL

### Sidestruktur

#### `index.html` — Forside
1. **Header** — Logo ("Jørn Jensen Lærhandel"), navigasjon (Produkter, Om oss, Kontakt, Handlekurv med antall)
2. **Hero** — Mørk brun bakgrunn, overskrift "Lær, kniver og håndverk", undertekst, to CTA-knapper (Se produkter / Om oss), tag "Familiebedrift siden 1970-tallet"
3. **Kategorier** — 5 kategori-kort i et grid
4. **Populære produkter** — 8 fremhevede produktkort med bilde, navn, pris og "Legg i handlekurv"-knapp
5. **Info-stripe** — Åpningstider, telefon, adresse
6. **Footer** — Kontaktinfo, sosiale medier

#### `products.html` — Produktkatalog
1. **Header** (samme som forside)
2. **Layout:** Tospalte — sidepanel (160px) + produktgrid
3. **Sidepanel:**
   - Søkefelt (filtrerer live på produktnavn)
   - Kategorifilter med antall (5 kategorier)
   - Underkategorifilter (vises dynamisk basert på valgt kategori)
4. **Produktgrid:** 3 kolonner, produktkort med bilde, navn, underkategori, pris (med overstryking av gammel pris ved tilbud), "Legg i handlekurv"-knapp
5. **Sortering:** Dropdown (Standard, Pris lav-høy, Pris høy-lav, Navn A-Å)
6. **Paginering:** 18 produkter per side

#### `cart.html` — Handlekurv
1. **Header** (samme som forside)
2. **Layout:** Tospalte — produktliste (venstre) + oppsummering og skjema (høyre, 280px)
3. **Produktliste:** Hvert produkt med bilde, navn, antallsjustering (+/-) og fjern-knapp
4. **Oppsummering:** Linjeposter og totalsum
5. **Bestillingsskjema:** Navn (påkrevd), e-post (påkrevd), telefon, leveringsadresse (påkrevd), melding/spørsmål
6. **Send-knapp:** Sender via FormSubmit til firmapost@jjensen.no
7. **Note under knapp:** "Vi sender deg en bekreftelse og faktura på e-post. Ingen betaling på nettsiden."

#### `about.html` — Om oss
1. **Header** (samme som forside)
2. Kort beskrivelse av bedriften (familiebedrift, lær og knivmaking)
3. Åpningstider (Man–Fre 09–16, Lør 09–14)
4. Adresse og kart (Google Maps `<iframe>`-embed for Stallbakken 13, 2005 Rælingen)
5. Kontaktskjema (enklere enn bestillingsskjema — navn, e-post, melding)
6. Lenker til sosiale medier (Facebook, Instagram, YouTube)
7. **Footer**

---

## Produktdata (`js/products.js`)

Produkter hentes fra følgende kategorier på eksisterende jjensen.no:

| Kategori | Underkategori | Eksempler |
|---|---|---|
| Ferdige produkter | Kokkekniver | Bunka 5.5" (995,-), Nakiri 7" (1 395,-), Kiritsuke 8.2" (1 295,-), Chef 9" (1 375,-) |
| Ferdige produkter | NKD Kniver | Korpi 85 (1 500,-), Forester 100 N690 (1 800,-) |
| Ferdige produkter | Gränsfors Skogsøkser | Lille øks (1 599,-), Håndøks (1 699,-), Villmarksøks (1 499,-), Outdoor (1 799,-), Liten skogsøks (1 799,-), Stor skogsøks (1 999,-), m.fl. |
| Ferdige produkter | Startsett | Knivmakersett Nr 1 (1 195,-), Nr 2 (525,-), Nr 3 (825,-), Salmakersett (1 085,-) |
| Ferdige produkter | Magnetknivholder | Magnetslire i tre — 4 størrelser (170,-/stk) |

Øvrige kategorier (Materialer, Lær og skinn, Farger og kjemikalier, Verktøy) legges til med de produktene som er tilgjengelige via jjensen.no.

Produktobjekt-format:
```js
{
  id: "bunka-55-damascus",
  name: "Bunka 5.5\" Damascus",
  category: "ferdige-produkter",
  subcategory: "kokkekniver",
  price: 995,
  oldPrice: null,        // sett til tall ved tilbud
  image: "https://www.jjensen.no/web_images/direkteopplastet/67616ad45acb6_Bunkaknife5.png",
  description: "Kokkekniv i VG-10 Damascus stål med ebenholts-skaft og mosaikk-pin.",
  featured: true         // vises på forsiden
}
```

---

## Handlekurv (`js/cart.js`)

- Lagres i `localStorage` under nøkkelen `jj-cart`
- Operasjoner: `addItem`, `removeItem`, `updateQty`, `getCart`, `clearCart`, `getTotal`
- Handlekurv-antall vises i navigasjonen på alle sider
- Ved innsending av skjema: produktliste serialiseres til JSON-streng og sendes som skjult `<input name="Bestilling">`-felt i FormSubmit-skjemaet

---

## Navigasjonskategorier (forenklet fra 50+ til 5)

| Kategori | Underkategorier |
|---|---|
| Ferdige produkter | Kniver, Gränsfors Bruk, Startsett, Bekledning og skinnhatter, Bøker |
| Materialer | Knivblader og stål, Skaft og bolstere, Metaller, Slip og polering |
| Lær og skinn | Tärnsjö, Slirelær, Lammenappa, Reinnappa, Lærreimer |
| Farger og kjemikalier | Lærfarge, Kantfarge, Lim, Voks og finish, Lærpleie |
| Verktøy | Prege- og poleringsverktøy, Hugge- og hullverktøy, Skjæreverktøy, Søm og nåler, Maskiner |

---

## Bestillingsflyt

1. Kunde blar gjennom `products.html`, klikker "Legg i handlekurv"
2. Handlekurv-teller i navigasjonen oppdateres øyeblikkelig
3. Kunde går til `cart.html`, justerer antall eller fjerner produkter
4. Kunde fyller ut kontaktskjema og klikker "Send bestillingsforespørsel"
5. FormSubmit sender e-post til firmapost@jjensen.no med produktliste og kontaktinfo
6. Kunde videresendes til `takk.html` — en enkel side med "Takk for din bestilling, vi tar kontakt snart" (satt via FormSubmit `_next`-parameter)
7. JJ Jensen bekrefter bestilling og sender faktura manuelt

---

## Forretningsinformasjon

- **Navn:** Jørn Jensen Lærhandel AS
- **Adresse:** Stallbakken 13, 2005 Rælingen, Akershus
- **Telefon:** +47 64 84 10 10
- **E-post:** firmapost@jjensen.no
- **Åpningstider:** Man–Fre 09:00–16:00, Lør 09:00–14:00
- **Sosiale medier:** Facebook, Instagram, YouTube
