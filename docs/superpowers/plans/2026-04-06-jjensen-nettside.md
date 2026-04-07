# JJ Jensen Lærhandel — Implementasjonsplan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bygg en komplett, statisk nettside for Jørn Jensen Lærhandel AS med produktkatalog, handlekurv og bestillingsskjema via e-post.

**Architecture:** Ren HTML/CSS/JS fordelt på 5 HTML-sider, felles styling i én CSS-fil, produktdata i en JS-datafil, handlekurv-logikk i en JS-modul (localStorage), bestilling via FormSubmit.co.

**Tech Stack:** HTML5, CSS3 (custom properties), Vanilla JavaScript (ES6+), localStorage, FormSubmit.co

---

## Filstruktur

```
JJ-nettside/
├── index.html
├── products.html
├── cart.html
├── about.html
├── takk.html
├── css/
│   └── style.css
└── js/
    ├── products.js
    ├── cart.js
    └── main.js
```

---

## Task 1: Prosjektstruktur og felles CSS

**Files:**
- Create: `css/style.css`

- [ ] **Steg 1: Opprett mappestruktur**

```bash
mkdir css js
```

- [ ] **Steg 2: Skriv css/style.css**

```css
/* === VARIABLER === */
:root {
  --brown-dark:   #4a3728;
  --brown-mid:    #7a5a3a;
  --brown-light:  #c8a060;
  --cream-dark:   #e8d5b0;
  --cream-mid:    #f5ede0;
  --cream-light:  #faf6f0;
  --bg:           #f0ece6;
  --border:       #e0d0b8;
  --text-dark:    #2a1a0a;
  --text-mid:     #5a3a20;
  --text-muted:   #a08060;
  --red:          #c8503a;
  --font:         system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
}

/* === RESET === */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: var(--font); background: var(--bg); color: var(--text-dark); line-height: 1.5; }
img { display: block; max-width: 100%; }
a { color: inherit; text-decoration: none; }
button { font-family: var(--font); cursor: pointer; border: none; }

/* === HEADER === */
.site-header {
  background: var(--brown-dark);
  color: var(--cream-dark);
  padding: 0.85rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
}
.site-logo {
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--cream-dark);
}
.site-nav {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}
.site-nav a {
  font-size: 0.9rem;
  color: var(--cream-dark);
  opacity: 0.85;
  transition: opacity 0.15s;
}
.site-nav a:hover { opacity: 1; }
.cart-link {
  background: var(--brown-light);
  color: var(--text-dark) !important;
  padding: 0.35rem 0.85rem;
  border-radius: 6px;
  font-weight: 700;
  opacity: 1 !important;
}
.cart-link:hover { background: #d8b070; }

/* === FOOTER === */
.site-footer {
  background: var(--text-dark);
  color: var(--cream-dark);
  padding: 1.5rem 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.5rem;
  margin-top: 3rem;
}
.footer-col h4 { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.07em; color: var(--cream-dark); margin-bottom: 0.6rem; }
.footer-col p, .footer-col a { font-size: 0.82rem; color: var(--cream-mid); line-height: 1.8; }
.footer-col a:hover { color: var(--brown-light); }
.footer-bottom {
  background: #1a0a00;
  color: var(--text-muted);
  padding: 0.75rem 2rem;
  font-size: 0.75rem;
  display: flex;
  justify-content: space-between;
}

/* === KNAPPER === */
.btn-primary {
  background: var(--brown-dark);
  color: var(--cream-dark);
  padding: 0.6rem 1.25rem;
  border-radius: 7px;
  font-size: 0.9rem;
  font-weight: 600;
  transition: background 0.15s;
}
.btn-primary:hover { background: #5a4738; }
.btn-secondary {
  background: transparent;
  color: var(--cream-dark);
  border: 1.5px solid var(--cream-dark);
  padding: 0.6rem 1.25rem;
  border-radius: 7px;
  font-size: 0.9rem;
  transition: background 0.15s;
}
.btn-secondary:hover { background: rgba(255,255,255,0.1); }
.btn-add {
  width: 100%;
  background: var(--brown-dark);
  color: var(--cream-dark);
  padding: 0.45rem;
  border-radius: 5px;
  font-size: 0.8rem;
  font-weight: 600;
  transition: background 0.15s;
}
.btn-add:hover { background: #5a4738; }

/* === PRODUKTKORT === */
.product-card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.product-card-img {
  background: var(--cream-mid);
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}
.product-card-img img {
  max-height: 140px;
  max-width: 90%;
  object-fit: contain;
}
.product-badge {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  background: var(--brown-light);
  color: var(--text-dark);
  font-size: 0.65rem;
  font-weight: 700;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  text-transform: uppercase;
}
.product-badge.utsolgt {
  background: #ccc;
  color: #555;
}
.product-card-body { padding: 0.85rem; flex: 1; display: flex; flex-direction: column; gap: 0.35rem; }
.product-card-name { font-size: 0.88rem; font-weight: 600; color: var(--text-dark); }
.product-card-sub { font-size: 0.75rem; color: var(--text-muted); }
.product-card-price-row { display: flex; align-items: center; gap: 0.5rem; margin-top: auto; padding-top: 0.35rem; }
.product-card-price { font-size: 0.95rem; font-weight: 700; color: var(--brown-dark); }
.product-card-old-price { font-size: 0.78rem; color: #aaa; text-decoration: line-through; }
.product-card-actions { margin-top: 0.5rem; }

/* === SEKSJONSOVERSKRIFT === */
.section-label {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-mid);
  margin-bottom: 1rem;
}

/* === SKJEMA === */
.form-group { margin-bottom: 1rem; }
.form-group label { display: block; font-size: 0.82rem; font-weight: 600; color: var(--text-mid); margin-bottom: 0.3rem; }
.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  background: #fff;
  border: 1.5px solid var(--border);
  border-radius: 7px;
  padding: 0.55rem 0.75rem;
  font-size: 0.88rem;
  font-family: var(--font);
  color: var(--text-dark);
  transition: border-color 0.15s;
}
.form-group input:focus,
.form-group textarea:focus { outline: none; border-color: var(--brown-dark); }
.form-group textarea { resize: vertical; min-height: 80px; }
.required { color: var(--red); }

/* === RESPONSIV === */
@media (max-width: 768px) {
  .site-header { padding: 0.75rem 1rem; }
  .site-nav { gap: 0.75rem; }
  .site-nav a { font-size: 0.8rem; }
  .site-footer { grid-template-columns: 1fr; }
}
```

- [ ] **Steg 3: Verifiser**

Opprett en midlertidig `test.html` med `<link rel="stylesheet" href="css/style.css">` og åpne i nettleseren. Ingen feilmeldinger i konsollen. Slett `test.html` etter sjekk.

---

## Task 2: Produktdata (js/products.js)

**Files:**
- Create: `js/products.js`

- [ ] **Steg 1: Skriv js/products.js**

```js
const BASE_IMG = 'https://www.jjensen.no/';

const PRODUCTS = [
  // === FERDIGE PRODUKTER — KOKKEKNIVER ===
  {
    id: 'bunka-55-damascus',
    name: 'Bunka 5.5" Damascus',
    category: 'ferdige-produkter',
    subcategory: 'kokkekniver',
    price: 995,
    oldPrice: null,
    image: BASE_IMG + 'web_images/direkteopplastet/67616ad45acb6_Bunkaknife5.png',
    description: 'Kokkekniv i VG-10 Damascus stål med ebenholts-skaft og mosaikk-pin.',
    featured: true,
    inStock: true,
  },
  {
    id: 'nakiri-7-damascus',
    name: 'Nakiri 7" Damascus',
    category: 'ferdige-produkter',
    subcategory: 'kokkekniver',
    price: 1395,
    oldPrice: null,
    image: BASE_IMG + 'web_images/direkteopplastet/676183fbd29e4_nakirikitchenknife7.png',
    description: 'Grønnsakskniv i VG-10 Damascus stål med ebenholts-skaft og mosaikk-pin.',
    featured: false,
    inStock: true,
  },
  {
    id: 'kiritsuke-82-damascus',
    name: 'Kiritsuke 8.2" Damascus',
    category: 'ferdige-produkter',
    subcategory: 'kokkekniver',
    price: 1295,
    oldPrice: null,
    image: BASE_IMG + 'web_images/direkteopplastet/6761966de9e3e_Kiritsuke8.png',
    description: 'Allround kokkekniv i VG-10 Damascus stål med ebenholts-skaft.',
    featured: false,
    inStock: true,
  },
  {
    id: 'chef-9-damascus',
    name: 'Chef 9" Damascus',
    category: 'ferdige-produkter',
    subcategory: 'kokkekniver',
    price: 1375,
    oldPrice: null,
    image: BASE_IMG + 'web_images/direkteopplastet/676198ade8551_chefknife9.png',
    description: 'Stor kokkekniv i VG-10 Damascus stål med ebenholts-skaft og mosaikk-pin.',
    featured: false,
    inStock: true,
  },
  {
    id: 'magnetslire-tre',
    name: 'Magnetslire i tre',
    category: 'ferdige-produkter',
    subcategory: 'kokkekniver',
    price: 170,
    oldPrice: null,
    image: BASE_IMG + 'web_images/direkteopplastet/6762c76eceee1_magnetsliretreaskkokkekniv.jpg',
    description: 'Magnetisk knivholder i tre. Tilgjengelig i 4 størrelser.',
    featured: false,
    inStock: true,
  },

  // === FERDIGE PRODUKTER — NKD KNIVER ===
  {
    id: 'nkd-korpi-85',
    name: 'NKD Korpi 85',
    category: 'ferdige-produkter',
    subcategory: 'friluftkniver',
    price: 1500,
    oldPrice: 2125,
    image: BASE_IMG + 'web_images/direkteopplastet/654117968f9bd_NKDKorpi85.png',
    description: 'Kompakt fullheftet kniv med 85mm blad i Sandvik 14C28N stål og bjørkeskaft. Inkl. vegetabilgarvet slire.',
    featured: true,
    inStock: true,
  },
  {
    id: 'nkd-forester-100-n690',
    name: 'NKD Forester 100 N690 Bison',
    category: 'ferdige-produkter',
    subcategory: 'friluftkniver',
    price: 1800,
    oldPrice: 2625,
    image: BASE_IMG + 'web_images/direkteopplastet/6541151610b08_NKDForesterN690bison.png',
    description: 'Robust fullheftet kniv med 100mm blad i N690Co stål og Micarta-skaft. Inkl. vegetabilgarvet slire.',
    featured: true,
    inStock: true,
  },

  // === FERDIGE PRODUKTER — HANDLAGEDE KNIVER ===
  {
    id: 'gunnar-momcilovic-nr4',
    name: 'Gunnar Momcilovic Nr 4',
    category: 'ferdige-produkter',
    subcategory: 'handlagede-kniver',
    price: 3500,
    oldPrice: null,
    image: BASE_IMG + 'web_images/direkteopplastet/6076adcd7a8ce_handlagetknivgunnarmomcilovicjungeknivjjensen.no.jpg',
    description: 'Foldekniv med messingplater og gravert dekor. Blad og rygg i rustfritt Sandvik 12C27 stål. Totallengde åpen: 170mm.',
    featured: false,
    inStock: true,
  },
  {
    id: 'kay-embretsen-nr6',
    name: 'Kay Embretsen Nr 6',
    category: 'ferdige-produkter',
    subcategory: 'handlagede-kniver',
    price: 7400,
    oldPrice: null,
    image: BASE_IMG + 'web_images/direkteopplastet/603e2a3969663_KE7.jpg',
    description: 'Eksklusiv håndlaget kniv med mørkbeiset Koa-skaft og bronsebolster. Håndsmiddd laminert blad med vegetabilgarvet slire. Totallengde: 205mm.',
    featured: false,
    inStock: true,
  },

  // === FERDIGE PRODUKTER — GRANSFORS SKOGSOKSER ===
  {
    id: 'gransfors-kasteoks-490',
    name: 'Gränsfors Kasteøks STD',
    category: 'ferdige-produkter',
    subcategory: 'gransfors-okser',
    price: 4599,
    oldPrice: null,
    image: BASE_IMG + 'web_images/direkteopplastet/62fb82f8c705c_gransforsaxekasteoks.jpg',
    description: 'Kasteøks fra Gränsfors Bruks. Art.nr: 490-2.',
    featured: false,
    inStock: true,
  },
  {
    id: 'gransfors-lille-oks-410',
    name: 'Gränsfors Lille Øks',
    category: 'ferdige-produkter',
    subcategory: 'gransfors-okser',
    price: 1599,
    oldPrice: null,
    image: BASE_IMG + 'web_images/direkteopplastet/5f857c2d479b3_410lillayxan2500x357.jpg',
    description: 'Liten håndøks fra Gränsfors Bruks, perfekt for turer. Art.nr: 410.',
    featured: false,
    inStock: true,
  },
  {
    id: 'gransfors-handoks-413',
    name: 'Gränsfors Håndøks / Kubben',
    category: 'ferdige-produkter',
    subcategory: 'gransfors-okser',
    price: 1699,
    oldPrice: null,
    image: BASE_IMG + 'web_images/direkteopplastet/5f857cac03b7f_413kubben2500x357.jpg',
    description: 'Allsidig håndøks fra Gränsfors Bruks. Art.nr: 413.',
    featured: false,
    inStock: true,
  },
  {
    id: 'gransfors-villmarksoks-415',
    name: 'Gränsfors Villmarksøks',
    category: 'ferdige-produkter',
    subcategory: 'gransfors-okser',
    price: 1499,
    oldPrice: null,
    image: BASE_IMG + 'web_images/direkteopplastet/5f857c019f4e4_415vildmarksyxa2500x357.jpg',
    description: 'Klassisk villmarksøks fra Gränsfors Bruks. Art.nr: 415.',
    featured: true,
    inStock: true,
  },
  {
    id: 'gransfors-outdoor-425',
    name: 'Gränsfors Outdoor Øks',
    category: 'ferdige-produkter',
    subcategory: 'gransfors-okser',
    price: 1799,
    oldPrice: null,
    image: BASE_IMG + 'web_images/direkteopplastet/5f857d74a24c2_425outdooraxe2500x357.jpg',
    description: 'Outdoor-øks fra Gränsfors Bruks. Art.nr: 425.',
    featured: false,
    inStock: true,
  },
  {
    id: 'gransfors-liten-skogsoks-420',
    name: 'Gränsfors Liten Skogsøks',
    category: 'ferdige-produkter',
    subcategory: 'gransfors-okser',
    price: 1799,
    oldPrice: null,
    image: BASE_IMG + 'web_images/direkteopplastet/5f857e2284950_420litenskogsyxa2500x357.jpg',
    description: 'Liten skogsøks fra Gränsfors Bruks. Art.nr: 420.',
    featured: false,
    inStock: true,
  },
  {
    id: 'gransfors-stor-skogsoks-430',
    name: 'Gränsfors Stor Skogsøks',
    category: 'ferdige-produkter',
    subcategory: 'gransfors-okser',
    price: 1999,
    oldPrice: null,
    image: BASE_IMG + 'web_images/direkteopplastet/5f857e61ad1b1_430storskogsyxa500x357.jpg',
    description: 'Stor skogsøks fra Gränsfors Bruks. Art.nr: 430.',
    featured: false,
    inStock: true,
  },
  {
    id: 'gransfors-amerikansk-felloks-434',
    name: 'Gränsfors Amerikansk Felløks',
    category: 'ferdige-produkter',
    subcategory: 'gransfors-okser',
    price: 2469,
    oldPrice: null,
    image: BASE_IMG + 'web_images/direkteopplastet/5f857ea5c676e_434americanfellingaxe500x357.jpg',
    description: 'Amerikansk felløks fra Gränsfors Bruks. Bestillingsvare. Art.nr: 434.',
    featured: false,
    inStock: true,
  },

  // === FERDIGE PRODUKTER — GRANSFORS KLOYVEOKSER ===
  {
    id: 'gransfors-minste-kloyveoks',
    name: 'Gränsfors Minste Kløyvøks',
    category: 'ferdige-produkter',
    subcategory: 'gransfors-okser',
    price: 1899,
    oldPrice: null,
    image: BASE_IMG + 'web_images/direkteopplastet/609535bd2a180_gransforsyxaaxeoksminsteklyvoksgransforsbruks.jpg',
    description: 'Minste kløyvøks fra Gränsfors Bruks. Midlertidig utsolgt.',
    featured: false,
    inStock: false,
  },
  {
    id: 'gransfors-liten-kloyveoks',
    name: 'Gränsfors Liten Kløyvøks',
    category: 'ferdige-produkter',
    subcategory: 'gransfors-okser',
    price: 1999,
    oldPrice: null,
    image: BASE_IMG + 'web_images/direkteopplastet/609535f14b5e6_gransforsyxaaxeokslitenklyvoksgransforsbruks.jpg',
    description: 'Liten kløyvøks fra Gränsfors Bruks. Midlertidig utsolgt.',
    featured: false,
    inStock: false,
  },
  {
    id: 'gransfors-stor-kloyveoks',
    name: 'Gränsfors Stor Kløyvøks',
    category: 'ferdige-produkter',
    subcategory: 'gransfors-okser',
    price: 2099,
    oldPrice: null,
    image: BASE_IMG + 'web_images/direkteopplastet/6095379ebccf1_gransforsyxaaxeoksstorklyvoksgransforsbruks.jpg',
    description: 'Stor kløyvøks fra Gränsfors Bruks. Midlertidig utsolgt.',
    featured: false,
    inStock: false,
  },
  {
    id: 'gransfors-stor-kloyveoks-lang',
    name: 'Gränsfors Stor Kløyvøks m/langt skaft',
    category: 'ferdige-produkter',
    subcategory: 'gransfors-okser',
    price: 2299,
    oldPrice: null,
    image: BASE_IMG + 'web_images/direkteopplastet/609537a83922d_gransforsyxaaxeoksstorklyvoksgransforsbruks.jpg',
    description: 'Stor kløyvøks med langt skaft fra Gränsfors Bruks. Midlertidig utsolgt.',
    featured: false,
    inStock: false,
  },
  {
    id: 'gransfors-sleggeoks',
    name: 'Gränsfors Sleggeøks',
    category: 'ferdige-produkter',
    subcategory: 'gransfors-okser',
    price: 2399,
    oldPrice: null,
    image: BASE_IMG + 'web_images/direkteopplastet/609537d9b6025_gransforsyxaaxeokssleggeoksgransforsbruks.jpg',
    description: 'Sleggeøks fra Gränsfors Bruks. Midlertidig utsolgt.',
    featured: false,
    inStock: false,
  },

  // === FERDIGE PRODUKTER — STARTSETT ===
  {
    id: 'knivmakersett-nr1',
    name: 'Knivmakersett Nr 1',
    category: 'ferdige-produkter',
    subcategory: 'startsett',
    price: 1195,
    oldPrice: 1529,
    image: BASE_IMG + 'web_images/direkteopplastet/609928fbe2acb_startsettnr1knivmakersettnybegynnersettknivmakerutstyr.jpg',
    description: 'Komplett startsett for nybegynnere. Inkl. knivblad, skaftblokk, slireblankt, reimblank, syl, nåler, tråd, kantverktøy, lærfarge og mer.',
    featured: true,
    inStock: true,
  },
  {
    id: 'knivmakersett-nr2',
    name: 'Knivmakersett Nr 2',
    category: 'ferdige-produkter',
    subcategory: 'startsett',
    price: 525,
    oldPrice: 610,
    image: BASE_IMG + 'web_images/direkteopplastet/609927a1efa80_startsettnr2knivmakersettnybegynnersettknivmakerutstyr.jpg',
    description: 'Enkelt startsett for nybegynnere. Inkl. knivblad, skaftblokk, slireblankt, reimblank, syl og nåler.',
    featured: false,
    inStock: true,
  },
  {
    id: 'knivmakersett-nr3',
    name: 'Knivmakersett Nr 3',
    category: 'ferdige-produkter',
    subcategory: 'startsett',
    price: 825,
    oldPrice: 1015,
    image: BASE_IMG + 'web_images/direkteopplastet/60991ef861f34_startsettnr3knivmakersettnybegynnersettknivmakerutstyrmasurlaer.jpg',
    description: 'Startsett med fokus på sliremaking. 3 slireblankt, 3 reimblank, syl, nåler, tråd, kantverktøy og lærfarge.',
    featured: false,
    inStock: true,
  },
  {
    id: 'salmakersett',
    name: 'Salmakersett',
    category: 'ferdige-produkter',
    subcategory: 'startsett',
    price: 1085,
    oldPrice: 1268,
    image: BASE_IMG + 'web_images/direkteopplastet/60992a5e6a9ff_startsettnybegynnersettsalmakersett.jpg',
    description: 'Komplett salmakersett for nybegynnere. Inkl. nåler, sylhåndtak, blokk, syl, kantverktøy, skjærekniv, saumklyp, tråd og mer.',
    featured: false,
    inStock: true,
  },

  // === MATERIALER — BRYNER OG SLIPEUTSTYR ===
  {
    id: 'diamant-keramisk-lommebryne',
    name: 'Diamant/Keramisk Lommebryne',
    category: 'materialer',
    subcategory: 'slip-og-polering',
    price: 395,
    oldPrice: null,
    image: BASE_IMG + 'web_images/direkteopplastet/68b19d60c2117_diamantkeramiskslipesteindmd.jpg',
    description: 'Kombinert diamant og keramisk lommebryne.',
    featured: false,
    inStock: true,
  },
  {
    id: 'diamant-brynefil-400-600',
    name: 'Diamant Brynefil 400/600 Korn',
    category: 'materialer',
    subcategory: 'slip-og-polering',
    price: 195,
    oldPrice: null,
    image: BASE_IMG + 'web_images/direkteopplastet/68b6d1149c862_brynefil400600grit.jpg',
    description: 'Dobbeltsidig diamant brynefil, 400 og 600 korn.',
    featured: false,
    inStock: true,
  },
  {
    id: 'knivsliper-karbid-keramisk',
    name: 'Knivsliper Karbid/Keramisk',
    category: 'materialer',
    subcategory: 'slip-og-polering',
    price: 95,
    oldPrice: null,
    image: BASE_IMG + 'web_images/direkteopplastet/68b0562aa622c_knivsliperlommebrynegul.jpg',
    description: 'Lommeknivsliper med karbid og keramisk.',
    featured: false,
    inStock: true,
  },
  {
    id: 'diamant-benkebryne-3in1',
    name: 'Diamant Benkebryne 150/350/1200',
    category: 'materialer',
    subcategory: 'slip-og-polering',
    price: 1195,
    oldPrice: null,
    image: BASE_IMG + 'web_images/direkteopplastet/67ebe051387e9_dmddiamantbryne3in1benkebryne.jpg',
    description: 'Tredobbelt diamantbenkebryne med 150, 350 og 1200 korn.',
    featured: false,
    inStock: true,
  },
  {
    id: 'diamant-benkebryne-600-1200',
    name: 'Diamant Benkebryne 600/1200',
    category: 'materialer',
    subcategory: 'slip-og-polering',
    price: 495,
    oldPrice: null,
    image: BASE_IMG + 'web_images/direkteopplastet/62173e8c2555a_brynediamantbryneknivsliperbenkebryne.jpg',
    description: 'Dobbelt diamantbenkebryne med 600 og 1200 korn.',
    featured: false,
    inStock: true,
  },
  {
    id: 'diamant-benkebryne-400-1000',
    name: 'Diamant Benkebryne 400/1000',
    category: 'materialer',
    subcategory: 'slip-og-polering',
    price: 795,
    oldPrice: null,
    image: BASE_IMG + 'web_images/direkteopplastet/67ebecb748ebb_benkebryne2in11000grit400grit.jpg',
    description: 'Dobbelt diamantbenkebryne med 400 og 1000 korn.',
    featured: false,
    inStock: true,
  },
  {
    id: 'diamant-foldebryne-400-600',
    name: 'Diamant Foldebryne 400/600',
    category: 'materialer',
    subcategory: 'slip-og-polering',
    price: 395,
    oldPrice: null,
    image: BASE_IMG + 'web_images/direkteopplastet/67ebf38504871_foldebryne2in1.jpg',
    description: 'Foldbart dobbelt diamantbryne med 400 og 600 korn.',
    featured: false,
    inStock: true,
  },
  {
    id: 'diamant-brynestav',
    name: 'Diamant Brynestav',
    category: 'materialer',
    subcategory: 'slip-og-polering',
    price: 415,
    oldPrice: null,
    image: BASE_IMG + 'web_images/direkteopplastet/682aebb3e4293_diamantslipestl.jpg',
    description: 'Diamantbrynestav for vedlikehold av knivegger.',
    featured: false,
    inStock: true,
  },
  {
    id: 'keramisk-brynestav',
    name: 'Keramisk Brynestav',
    category: 'materialer',
    subcategory: 'slip-og-polering',
    price: 415,
    oldPrice: null,
    image: BASE_IMG + 'web_images/direkteopplastet/68306cf6ada1d_slipestavkeramisk.jpg',
    description: 'Keramisk brynestav for finsliping av knivegger.',
    featured: false,
    inStock: true,
  },
  {
    id: 'jj-slipestropp',
    name: 'JJ Slipestropp',
    category: 'materialer',
    subcategory: 'slip-og-polering',
    price: 395,
    oldPrice: null,
    image: BASE_IMG + 'web_images/direkteopplastet/605af41a9eb6b_slipestropp.jpg',
    description: 'Slipestropp i lær for polering av knivsegger.',
    featured: false,
    inStock: true,
  },
  {
    id: 'jj-slipestropp-polervoks',
    name: 'JJ Slipestropp + 2 stk polervoks',
    category: 'materialer',
    subcategory: 'slip-og-polering',
    price: 499,
    oldPrice: null,
    image: BASE_IMG + 'web_images/direkteopplastet/605af41a9eb6b_slipestropp.jpg',
    description: 'Slipestropp i lær inkl. 2 stk polervoks.',
    featured: false,
    inStock: true,
  },
  {
    id: 'gransfors-keramisk-slipsten-403-4',
    name: 'Gränsfors Keramisk Slipsten 403-4',
    category: 'materialer',
    subcategory: 'slip-og-polering',
    price: 489,
    oldPrice: null,
    image: BASE_IMG + 'web_images/direkteopplastet/5f71d10db4d7d_puckgransfors.png',
    description: 'Rund keramisk slipsten (puck) fra Gränsfors Bruks. Art.nr: 403-4.',
    featured: false,
    inStock: true,
  },
  {
    id: 'gransfors-oksefil-403-1',
    name: 'Gränsfors Øksefil 403-1',
    category: 'materialer',
    subcategory: 'slip-og-polering',
    price: 469,
    oldPrice: null,
    image: BASE_IMG + 'web_images/direkteopplastet/5f71d2e932be7_yxfil.png',
    description: 'Øksefil fra Gränsfors Bruks for sliping av økseegg. Art.nr: 403-1.',
    featured: false,
    inStock: true,
  },
  {
    id: 'gransfors-diamantfil-403-2',
    name: 'Gränsfors Diamantfil 403-2',
    category: 'materialer',
    subcategory: 'slip-og-polering',
    price: 569,
    oldPrice: null,
    image: BASE_IMG + 'web_images/direkteopplastet/5f71d2e932be7_yxfil.png',
    description: 'Diamantfil fra Gränsfors Bruks. Art.nr: 403-2.',
    featured: false,
    inStock: true,
  },
];

// Hjelpefunksjoner
function getCategories() {
  const cats = [...new Set(PRODUCTS.map(p => p.category))];
  return cats;
}

function getSubcategories(category) {
  return [...new Set(PRODUCTS.filter(p => p.category === category).map(p => p.subcategory))];
}

function getProductsByCategory(category) {
  return PRODUCTS.filter(p => p.category === category);
}

function getProductsBySubcategory(subcategory) {
  return PRODUCTS.filter(p => p.subcategory === subcategory);
}

function getFeaturedProducts() {
  return PRODUCTS.filter(p => p.featured);
}

function getProductById(id) {
  return PRODUCTS.find(p => p.id === id);
}

function searchProducts(query) {
  const q = query.toLowerCase();
  return PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.subcategory.toLowerCase().includes(q)
  );
}
```

- [ ] **Steg 2: Verifiser i nettleserkonsollen**

Åpne `test.html` som inkluderer `<script src="js/products.js"></script>`, og kjør i konsollen:
```js
console.log(PRODUCTS.length);           // forventet: 34+
console.log(getFeaturedProducts().length); // forventet: 5
console.log(getProductById('nkd-korpi-85').price); // forventet: 1500
```

---

## Task 3: Handlekurv-logikk (js/cart.js)

**Files:**
- Create: `js/cart.js`

- [ ] **Steg 1: Skriv js/cart.js**

```js
const CART_KEY = 'jj-cart';

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addItem(product) {
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: 1,
    });
  }
  saveCart(cart);
  updateCartCount();
}

function removeItem(id) {
  const cart = getCart().filter(item => item.id !== id);
  saveCart(cart);
  updateCartCount();
}

function updateQty(id, qty) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty = Math.max(1, parseInt(qty) || 1);
    saveCart(cart);
  }
  updateCartCount();
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartCount();
}

function getTotal() {
  return getCart().reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function updateCartCount() {
  const badge = document.querySelector('.cart-count');
  if (badge) {
    const count = getCartCount();
    badge.textContent = count > 0 ? `(${count})` : '';
  }
}

function formatCartForEmail() {
  return getCart()
    .map(item => `${item.name} x${item.qty} — Kr ${(item.price * item.qty).toLocaleString('nb-NO')},-`)
    .join('\n');
}
```

- [ ] **Steg 2: Verifiser i nettleserkonsollen**

I `test.html` med begge script-tagene, kjør:
```js
addItem({ id: 'test', name: 'Testprodukt', price: 500, image: '' });
addItem({ id: 'test', name: 'Testprodukt', price: 500, image: '' });
console.log(getCart()[0].qty);   // forventet: 2
console.log(getTotal());          // forventet: 1000
removeItem('test');
console.log(getCart().length);    // forventet: 0
```

---

## Task 4: Felles logikk (js/main.js)

**Files:**
- Create: `js/main.js`

- [ ] **Steg 1: Skriv js/main.js**

```js
const NAV_ITEMS = [
  { label: 'Produkter', href: 'products.html' },
  { label: 'Om oss',    href: 'about.html' },
  { label: 'Kontakt',   href: 'about.html#kontakt' },
];

function renderHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  header.innerHTML = `
    <a class="site-logo" href="index.html">Jørn Jensen Lærhandel</a>
    <nav class="site-nav">
      ${NAV_ITEMS.map(item => `<a href="${item.href}">${item.label}</a>`).join('')}
      <a class="cart-link" href="cart.html">Handlekurv <span class="cart-count"></span></a>
    </nav>
  `;
}

function renderFooter() {
  const footer = document.querySelector('.site-footer');
  if (!footer) return;
  footer.innerHTML = `
    <div class="footer-col">
      <h4>Jørn Jensen Lærhandel AS</h4>
      <p>Kvalitetsmaterialer for knivmaking og lærarbeid siden 1970-tallet.</p>
    </div>
    <div class="footer-col">
      <h4>Kontakt</h4>
      <p>Stallbakken 13, 2005 Rælingen<br>
      <a href="tel:+4764841010">+47 64 84 10 10</a><br>
      <a href="mailto:firmapost@jjensen.no">firmapost@jjensen.no</a></p>
      <p style="margin-top:0.4rem">Man–Fre 09–16 · Lør 09–14</p>
    </div>
    <div class="footer-col">
      <h4>Følg oss</h4>
      <p>
        <a href="https://www.facebook.com/groups/jjensen.no" target="_blank">Facebook</a><br>
        <a href="https://www.instagram.com/jjensen.no" target="_blank">Instagram</a><br>
        <a href="https://www.youtube.com/@jjensen.no" target="_blank">YouTube</a>
      </p>
    </div>
  `;
}

function renderFooterBottom() {
  const el = document.querySelector('.site-footer-bottom');
  if (!el) return;
  el.innerHTML = `
    <span>© ${new Date().getFullYear()} Jørn Jensen Lærhandel AS</span>
    <span>firmapost@jjensen.no</span>
  `;
}

function formatPrice(price) {
  return 'Kr ' + price.toLocaleString('nb-NO') + ',-';
}

function productCardHTML(product) {
  const badge = !product.inStock
    ? '<span class="product-badge utsolgt">Utsolgt</span>'
    : product.oldPrice
    ? '<span class="product-badge">Tilbud</span>'
    : '';

  const oldPriceHTML = product.oldPrice
    ? `<span class="product-card-old-price">${formatPrice(product.oldPrice)}</span>`
    : '';

  const addBtn = product.inStock
    ? `<button class="btn-add" onclick="addItem(getProductById('${product.id}'))">Legg i handlekurv</button>`
    : `<button class="btn-add" disabled style="opacity:0.4;cursor:not-allowed">Ikke på lager</button>`;

  return `
    <div class="product-card">
      <div class="product-card-img">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        ${badge}
      </div>
      <div class="product-card-body">
        <div class="product-card-name">${product.name}</div>
        <div class="product-card-sub">${subcategoryLabel(product.subcategory)}</div>
        <div class="product-card-price-row">
          <span class="product-card-price">${formatPrice(product.price)}</span>
          ${oldPriceHTML}
        </div>
        <div class="product-card-actions">${addBtn}</div>
      </div>
    </div>
  `;
}

const SUBCATEGORY_LABELS = {
  'kokkekniver':       'Kokkekniv',
  'friluftkniver':     'Friluftkniv',
  'handlagede-kniver': 'Håndlaget kniv',
  'gransfors-okser':   'Gränsfors øks',
  'startsett':         'Startsett',
  'slip-og-polering':  'Slip og polering',
};

function subcategoryLabel(key) {
  return SUBCATEGORY_LABELS[key] || key;
}

const CATEGORY_LABELS = {
  'ferdige-produkter': 'Ferdige produkter',
  'materialer':        'Materialer',
  'laer-og-skinn':     'Lær og skinn',
  'farger-kjemikalier':'Farger og kjemikalier',
  'verktoy':           'Verktøy',
};

function categoryLabel(key) {
  return CATEGORY_LABELS[key] || key;
}

document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderFooter();
  renderFooterBottom();
  updateCartCount();
});
```

---

## Task 5: Forside (index.html)

**Files:**
- Create: `index.html`

- [ ] **Steg 1: Skriv index.html**

```html
<!DOCTYPE html>
<html lang="no">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Jørn Jensen Lærhandel — Lær, kniver og håndverk</title>
  <meta name="description" content="Kvalitetsmaterialer for knivmaking og lærarbeid. Lær, kniver, verktøy og mer.">
  <link rel="stylesheet" href="css/style.css">
  <style>
    /* === HERO === */
    .hero {
      background: linear-gradient(135deg, #3a2a1a 0%, #5a4030 100%);
      color: var(--cream-dark);
      padding: 4rem 2rem;
      position: relative;
    }
    .hero-inner { max-width: 600px; }
    .hero-tag {
      display: inline-block;
      background: rgba(200,160,96,0.2);
      border: 1px solid rgba(200,160,96,0.4);
      color: var(--brown-light);
      font-size: 0.8rem;
      padding: 0.25rem 0.65rem;
      border-radius: 5px;
      margin-bottom: 1rem;
    }
    .hero h1 {
      font-size: 2.75rem;
      font-weight: 800;
      line-height: 1.15;
      margin-bottom: 1rem;
    }
    .hero p {
      font-size: 1.05rem;
      color: var(--cream-mid);
      margin-bottom: 1.5rem;
      max-width: 480px;
    }
    .hero-btns { display: flex; gap: 0.75rem; flex-wrap: wrap; }

    /* === KATEGORIER === */
    .categories { padding: 2.5rem 2rem; background: var(--cream-light); }
    .cat-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 1rem;
      margin-top: 1rem;
    }
    .cat-card {
      background: #fff;
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 1.25rem 0.75rem;
      text-align: center;
      cursor: pointer;
      transition: border-color 0.15s, transform 0.1s;
      text-decoration: none;
      color: var(--text-dark);
    }
    .cat-card:hover { border-color: var(--brown-dark); transform: translateY(-2px); }
    .cat-card-name { font-size: 0.85rem; font-weight: 600; color: var(--brown-dark); }

    /* === PRODUKTER === */
    .featured-products { padding: 2.5rem 2rem; }
    .product-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
      margin-top: 1rem;
    }
    .see-all-btn {
      display: block;
      text-align: center;
      margin-top: 1.75rem;
    }

    /* === INFO-STRIPE === */
    .info-strip {
      background: var(--cream-mid);
      border-top: 1px solid var(--border);
      border-bottom: 1px solid var(--border);
      padding: 1.5rem 2rem;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
    }
    .info-item { text-align: center; }
    .info-item h4 { font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.07em; color: var(--text-mid); margin-bottom: 0.3rem; }
    .info-item p { font-size: 0.9rem; color: var(--text-dark); }

    @media (max-width: 768px) {
      .hero h1 { font-size: 1.85rem; }
      .cat-grid { grid-template-columns: repeat(2, 1fr); }
      .product-grid { grid-template-columns: repeat(2, 1fr); }
      .info-strip { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>

  <header class="site-header"></header>

  <section class="hero">
    <div class="hero-inner">
      <span class="hero-tag">Familiebedrift siden 1970-tallet</span>
      <h1>Lær, kniver<br>og håndverk</h1>
      <p>Kvalitetsmaterialer for knivmaking og lærarbeid. Over 1000 produkter på lager i Rælingen.</p>
      <div class="hero-btns">
        <a href="products.html" class="btn-primary">Se alle produkter</a>
        <a href="about.html" class="btn-secondary">Om oss</a>
      </div>
    </div>
  </section>

  <section class="categories">
    <div class="section-label">Kategorier</div>
    <div class="cat-grid">
      <a class="cat-card" href="products.html?category=ferdige-produkter">
        <div class="cat-card-name">Ferdige produkter</div>
      </a>
      <a class="cat-card" href="products.html?category=materialer">
        <div class="cat-card-name">Materialer</div>
      </a>
      <a class="cat-card" href="products.html?category=laer-og-skinn">
        <div class="cat-card-name">Lær og skinn</div>
      </a>
      <a class="cat-card" href="products.html?category=farger-kjemikalier">
        <div class="cat-card-name">Farger og kjemikalier</div>
      </a>
      <a class="cat-card" href="products.html?category=verktoy">
        <div class="cat-card-name">Verktøy</div>
      </a>
    </div>
  </section>

  <section class="featured-products">
    <div class="section-label">Populære produkter</div>
    <div class="product-grid" id="featured-grid"></div>
    <div class="see-all-btn">
      <a href="products.html" class="btn-primary">Se alle produkter</a>
    </div>
  </section>

  <div class="info-strip">
    <div class="info-item">
      <h4>Åpningstider</h4>
      <p>Man–Fre 09:00–16:00<br>Lørdag 09:00–14:00</p>
    </div>
    <div class="info-item">
      <h4>Telefon</h4>
      <p><a href="tel:+4764841010">+47 64 84 10 10</a></p>
    </div>
    <div class="info-item">
      <h4>Adresse</h4>
      <p>Stallbakken 13<br>2005 Rælingen, Akershus</p>
    </div>
  </div>

  <footer class="site-footer"></footer>
  <div class="site-footer-bottom"></div>

  <script src="js/products.js"></script>
  <script src="js/cart.js"></script>
  <script src="js/main.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const grid = document.getElementById('featured-grid');
      grid.innerHTML = getFeaturedProducts().map(p => productCardHTML(p)).join('');
    });
  </script>
</body>
</html>
```

- [ ] **Steg 2: Verifiser**

Åpne `index.html` i nettleseren. Sjekk:
- Header og footer vises korrekt
- Handlekurv-teller er tom (0)
- 5 kategori-kort vises
- Fremhevede produkter vises med bilder fra jjensen.no
- "Legg i handlekurv"-knapp oppdaterer telleren
- Ingen feil i konsollen

---

## Task 6: Produktkatalog (products.html)

**Files:**
- Create: `products.html`

- [ ] **Steg 1: Skriv products.html**

```html
<!DOCTYPE html>
<html lang="no">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Produkter — Jørn Jensen Lærhandel</title>
  <link rel="stylesheet" href="css/style.css">
  <style>
    .page-layout {
      display: grid;
      grid-template-columns: 200px 1fr;
      gap: 0;
      min-height: 70vh;
    }
    .sidebar {
      background: var(--cream-light);
      border-right: 1px solid var(--border);
      padding: 1.25rem;
      position: sticky;
      top: 60px;
      height: calc(100vh - 60px);
      overflow-y: auto;
    }
    .sidebar-title { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-mid); margin-bottom: 0.85rem; }
    .search-input {
      width: 100%;
      background: #fff;
      border: 1.5px solid var(--border);
      border-radius: 7px;
      padding: 0.5rem 0.75rem;
      font-size: 0.85rem;
      font-family: var(--font);
      margin-bottom: 1.25rem;
      color: var(--text-dark);
    }
    .search-input:focus { outline: none; border-color: var(--brown-dark); }
    .filter-group { margin-bottom: 1.25rem; }
    .filter-group-title { font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em; color: var(--brown-mid); margin-bottom: 0.5rem; }
    .filter-item { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem; cursor: pointer; }
    .filter-item input[type="radio"],
    .filter-item input[type="checkbox"] { accent-color: var(--brown-dark); }
    .filter-item label { font-size: 0.82rem; color: var(--text-mid); cursor: pointer; }
    .filter-count { font-size: 0.7rem; color: var(--text-muted); margin-left: auto; }

    .main-area { padding: 1.5rem; }
    .top-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; }
    .result-count { font-size: 0.85rem; color: var(--text-mid); }
    .sort-select {
      background: #fff;
      border: 1.5px solid var(--border);
      border-radius: 7px;
      padding: 0.4rem 0.75rem;
      font-size: 0.82rem;
      font-family: var(--font);
      color: var(--text-dark);
      cursor: pointer;
    }
    .product-grid-main {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
    }
    .pagination { display: flex; justify-content: center; gap: 0.5rem; margin-top: 2rem; }
    .page-btn {
      background: #fff;
      border: 1.5px solid var(--border);
      border-radius: 6px;
      padding: 0.4rem 0.75rem;
      font-size: 0.85rem;
      cursor: pointer;
      color: var(--text-mid);
      transition: background 0.15s;
    }
    .page-btn:hover, .page-btn.active { background: var(--brown-dark); color: var(--cream-dark); border-color: var(--brown-dark); }

    .empty-state { text-align: center; padding: 3rem; color: var(--text-muted); }
    .empty-state h3 { font-size: 1.1rem; margin-bottom: 0.5rem; }

    @media (max-width: 768px) {
      .page-layout { grid-template-columns: 1fr; }
      .sidebar { position: static; height: auto; border-right: none; border-bottom: 1px solid var(--border); }
      .product-grid-main { grid-template-columns: repeat(2, 1fr); }
    }
  </style>
</head>
<body>

  <header class="site-header"></header>

  <div class="page-layout">
    <aside class="sidebar">
      <div class="sidebar-title">Filter</div>
      <input class="search-input" id="search-input" type="text" placeholder="Søk etter produkt...">

      <div class="filter-group">
        <div class="filter-group-title">Kategori</div>
        <div id="category-filters"></div>
      </div>

      <div class="filter-group" id="subcategory-group" style="display:none">
        <div class="filter-group-title">Underkategori</div>
        <div id="subcategory-filters"></div>
      </div>
    </aside>

    <main class="main-area">
      <div class="top-bar">
        <span class="result-count" id="result-count">Laster produkter...</span>
        <select class="sort-select" id="sort-select">
          <option value="default">Sorter: Standard</option>
          <option value="price-asc">Pris: Lav til høy</option>
          <option value="price-desc">Pris: Høy til lav</option>
          <option value="name-asc">Navn: A til Å</option>
        </select>
      </div>
      <div class="product-grid-main" id="product-grid"></div>
      <div class="pagination" id="pagination"></div>
    </main>
  </div>

  <footer class="site-footer"></footer>
  <div class="site-footer-bottom"></div>

  <script src="js/products.js"></script>
  <script src="js/cart.js"></script>
  <script src="js/main.js"></script>
  <script>
    const PER_PAGE = 18;
    let currentPage = 1;
    let activeCategory = null;
    let activeSubcategory = null;
    let searchQuery = '';
    let sortOrder = 'default';

    function getFilteredProducts() {
      let list = PRODUCTS;
      if (searchQuery) list = searchProducts(searchQuery);
      if (activeCategory) list = list.filter(p => p.category === activeCategory);
      if (activeSubcategory) list = list.filter(p => p.subcategory === activeSubcategory);
      switch (sortOrder) {
        case 'price-asc':  list = [...list].sort((a,b) => a.price - b.price); break;
        case 'price-desc': list = [...list].sort((a,b) => b.price - a.price); break;
        case 'name-asc':   list = [...list].sort((a,b) => a.name.localeCompare(b.name, 'nb')); break;
      }
      return list;
    }

    function renderProducts() {
      const all = getFilteredProducts();
      const total = all.length;
      const start = (currentPage - 1) * PER_PAGE;
      const page = all.slice(start, start + PER_PAGE);

      document.getElementById('result-count').textContent =
        `Viser ${page.length} av ${total} produkter` + (activeCategory ? ` i "${categoryLabel(activeCategory)}"` : '');

      const grid = document.getElementById('product-grid');
      if (page.length === 0) {
        grid.innerHTML = '<div class="empty-state"><h3>Ingen produkter funnet</h3><p>Prøv et annet søk eller filter.</p></div>';
      } else {
        grid.innerHTML = page.map(p => productCardHTML(p)).join('');
      }
      renderPagination(total);
    }

    function renderPagination(total) {
      const pages = Math.ceil(total / PER_PAGE);
      const el = document.getElementById('pagination');
      if (pages <= 1) { el.innerHTML = ''; return; }
      let html = '';
      if (currentPage > 1) html += `<button class="page-btn" onclick="goPage(${currentPage-1})">&#8592;</button>`;
      for (let i = 1; i <= pages; i++) {
        html += `<button class="page-btn${i===currentPage?' active':''}" onclick="goPage(${i})">${i}</button>`;
      }
      if (currentPage < pages) html += `<button class="page-btn" onclick="goPage(${currentPage+1})">&#8594;</button>`;
      el.innerHTML = html;
    }

    function goPage(n) { currentPage = n; renderProducts(); window.scrollTo(0, 0); }

    function renderCategoryFilters() {
      const cats = getCategories();
      const el = document.getElementById('category-filters');
      el.innerHTML = `
        <div class="filter-item">
          <input type="radio" name="cat" id="cat-all" value="" ${!activeCategory?'checked':''} onchange="setCategory('')">
          <label for="cat-all">Alle kategorier</label>
          <span class="filter-count">${PRODUCTS.length}</span>
        </div>
        ${cats.map(cat => `
          <div class="filter-item">
            <input type="radio" name="cat" id="cat-${cat}" value="${cat}" ${activeCategory===cat?'checked':''} onchange="setCategory('${cat}')">
            <label for="cat-${cat}">${categoryLabel(cat)}</label>
            <span class="filter-count">${PRODUCTS.filter(p=>p.category===cat).length}</span>
          </div>
        `).join('')}
      `;
    }

    function renderSubcategoryFilters() {
      if (!activeCategory) {
        document.getElementById('subcategory-group').style.display = 'none';
        return;
      }
      const subs = getSubcategories(activeCategory);
      document.getElementById('subcategory-group').style.display = 'block';
      document.getElementById('subcategory-filters').innerHTML = `
        <div class="filter-item">
          <input type="radio" name="sub" id="sub-all" value="" ${!activeSubcategory?'checked':''} onchange="setSubcategory('')">
          <label for="sub-all">Alle</label>
        </div>
        ${subs.map(sub => `
          <div class="filter-item">
            <input type="radio" name="sub" id="sub-${sub}" value="${sub}" ${activeSubcategory===sub?'checked':''} onchange="setSubcategory('${sub}')">
            <label for="sub-${sub}">${subcategoryLabel(sub)}</label>
            <span class="filter-count">${PRODUCTS.filter(p=>p.subcategory===sub).length}</span>
          </div>
        `).join('')}
      `;
    }

    function setCategory(cat) {
      activeCategory = cat || null;
      activeSubcategory = null;
      currentPage = 1;
      renderCategoryFilters();
      renderSubcategoryFilters();
      renderProducts();
    }

    function setSubcategory(sub) {
      activeSubcategory = sub || null;
      currentPage = 1;
      renderSubcategoryFilters();
      renderProducts();
    }

    document.addEventListener('DOMContentLoaded', () => {
      // Les URL-parameter for forhåndsvalgt kategori
      const params = new URLSearchParams(window.location.search);
      const cat = params.get('category');
      if (cat) activeCategory = cat;

      renderCategoryFilters();
      renderSubcategoryFilters();
      renderProducts();

      document.getElementById('search-input').addEventListener('input', e => {
        searchQuery = e.target.value.trim();
        currentPage = 1;
        activeCategory = null;
        activeSubcategory = null;
        renderCategoryFilters();
        renderSubcategoryFilters();
        renderProducts();
      });

      document.getElementById('sort-select').addEventListener('change', e => {
        sortOrder = e.target.value;
        currentPage = 1;
        renderProducts();
      });
    });
  </script>
</body>
</html>
```

- [ ] **Steg 2: Verifiser**

Åpne `products.html`. Sjekk:
- Alle produkter vises i grid
- Søk filtrerer live
- Kategori-filter fungerer
- Sortering fungerer
- Paginering vises når > 18 produkter
- URL-parameter `?category=ferdige-produkter` forhåndsvelger riktig kategori
- "Legg i handlekurv" oppdaterer teller i header

---

## Task 7: Handlekurv og bestilling (cart.html)

**Files:**
- Create: `cart.html`

- [ ] **Steg 1: Skriv cart.html**

```html
<!DOCTYPE html>
<html lang="no">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Handlekurv — Jørn Jensen Lærhandel</title>
  <link rel="stylesheet" href="css/style.css">
  <style>
    .cart-layout {
      display: grid;
      grid-template-columns: 1fr 360px;
      gap: 2rem;
      padding: 2rem;
      max-width: 1100px;
      margin: 0 auto;
    }
    .cart-title { font-size: 1.4rem; font-weight: 700; margin-bottom: 1.25rem; color: var(--text-dark); }

    /* Handlekurv-items */
    .cart-item {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      background: #fff;
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 1rem;
      margin-bottom: 0.75rem;
    }
    .cart-item-img {
      width: 72px; height: 72px;
      background: var(--cream-mid);
      border-radius: 8px;
      flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      overflow: hidden;
    }
    .cart-item-img img { max-width: 64px; max-height: 64px; object-fit: contain; }
    .cart-item-info { flex: 1; }
    .cart-item-name { font-size: 0.95rem; font-weight: 600; color: var(--text-dark); margin-bottom: 0.2rem; }
    .cart-item-unit-price { font-size: 0.8rem; color: var(--text-muted); }
    .qty-row { display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem; }
    .qty-btn {
      background: var(--cream-mid);
      border: 1px solid var(--border);
      border-radius: 5px;
      width: 28px; height: 28px;
      font-size: 1rem;
      font-weight: 700;
      color: var(--brown-dark);
      display: flex; align-items: center; justify-content: center;
    }
    .qty-btn:hover { background: var(--border); }
    .qty-val { font-size: 0.9rem; font-weight: 600; min-width: 20px; text-align: center; }
    .cart-item-price { font-size: 1rem; font-weight: 700; color: var(--brown-dark); white-space: nowrap; }
    .remove-btn { background: none; font-size: 1.1rem; color: #ccc; padding: 0.2rem; }
    .remove-btn:hover { color: var(--red); }

    .empty-cart { text-align: center; padding: 3rem 1rem; }
    .empty-cart h3 { font-size: 1.2rem; margin-bottom: 0.75rem; color: var(--text-mid); }
    .empty-cart p { color: var(--text-muted); margin-bottom: 1.5rem; }

    /* Oppsummering + skjema */
    .order-box {
      background: var(--cream-light);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 1.5rem;
    }
    .summary-row { display: flex; justify-content: space-between; font-size: 0.85rem; color: var(--text-mid); margin-bottom: 0.4rem; }
    .summary-divider { border: none; border-top: 1px solid var(--border); margin: 0.75rem 0; }
    .summary-total { display: flex; justify-content: space-between; font-size: 1rem; font-weight: 700; color: var(--text-dark); margin-bottom: 1.5rem; }

    .order-form-title { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em; color: var(--text-mid); margin-bottom: 1rem; }

    .submit-btn { width: 100%; background: var(--brown-dark); color: var(--cream-dark); border: none; padding: 0.85rem; border-radius: 8px; font-size: 1rem; font-weight: 700; cursor: pointer; transition: background 0.15s; margin-top: 0.25rem; }
    .submit-btn:hover { background: #5a4738; }
    .submit-note { font-size: 0.78rem; color: var(--text-muted); text-align: center; margin-top: 0.75rem; line-height: 1.5; }

    @media (max-width: 768px) {
      .cart-layout { grid-template-columns: 1fr; padding: 1rem; }
    }
  </style>
</head>
<body>

  <header class="site-header"></header>

  <div class="cart-layout">
    <div>
      <h1 class="cart-title">Handlekurv</h1>
      <div id="cart-items"></div>
    </div>

    <div>
      <div class="order-box">
        <div class="section-label" style="margin-bottom:0.75rem">Oppsummering</div>
        <div id="summary-lines"></div>
        <hr class="summary-divider">
        <div class="summary-total">
          <span>Totalt</span>
          <span id="total-price">Kr 0,-</span>
        </div>

        <div class="order-form-title">Kontaktopplysninger</div>
        <form id="order-form"
              action="https://formsubmit.co/firmapost@jjensen.no"
              method="POST">
          <input type="hidden" name="_subject" value="Ny bestillingsforespørsel fra jjensen.no">
          <input type="hidden" name="_next" value="takk.html">
          <input type="hidden" name="_captcha" value="false">
          <input type="hidden" name="Bestilling" id="bestilling-field">

          <div class="form-group">
            <label for="navn">Navn <span class="required">*</span></label>
            <input type="text" id="navn" name="Navn" required placeholder="Ola Nordmann">
          </div>
          <div class="form-group">
            <label for="epost">E-post <span class="required">*</span></label>
            <input type="email" id="epost" name="E-post" required placeholder="ola@epost.no">
          </div>
          <div class="form-group">
            <label for="telefon">Telefon</label>
            <input type="tel" id="telefon" name="Telefon" placeholder="+47 000 00 000">
          </div>
          <div class="form-group">
            <label for="adresse">Leveringsadresse <span class="required">*</span></label>
            <input type="text" id="adresse" name="Adresse" required placeholder="Gateveien 1, 0000 By">
          </div>
          <div class="form-group">
            <label for="melding">Melding / spørsmål</label>
            <textarea id="melding" name="Melding" placeholder="Evt. spesielle ønsker, spørsmål om frakt osv."></textarea>
          </div>

          <button type="submit" class="submit-btn">Send bestillingsforespørsel</button>
          <p class="submit-note">Vi sender deg en bekreftelse og faktura på e-post. Ingen betaling på nettsiden.</p>
        </form>
      </div>
    </div>
  </div>

  <footer class="site-footer"></footer>
  <div class="site-footer-bottom"></div>

  <script src="js/products.js"></script>
  <script src="js/cart.js"></script>
  <script src="js/main.js"></script>
  <script>
    function renderCart() {
      const cart = getCart();
      const itemsEl = document.getElementById('cart-items');
      const summaryEl = document.getElementById('summary-lines');

      if (cart.length === 0) {
        itemsEl.innerHTML = `
          <div class="empty-cart">
            <h3>Handlekurven er tom</h3>
            <p>Legg til produkter fra produktkatalogen.</p>
            <a href="products.html" class="btn-primary">Se produkter</a>
          </div>
        `;
        summaryEl.innerHTML = '';
        document.getElementById('total-price').textContent = 'Kr 0,-';
        document.getElementById('bestilling-field').value = '';
        return;
      }

      itemsEl.innerHTML = cart.map(item => `
        <div class="cart-item">
          <div class="cart-item-img">
            <img src="${item.image}" alt="${item.name}" loading="lazy">
          </div>
          <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-unit-price">${formatPrice(item.price)}/stk</div>
            <div class="qty-row">
              <button class="qty-btn" onclick="changeQty('${item.id}', ${item.qty - 1})">−</button>
              <span class="qty-val">${item.qty}</span>
              <button class="qty-btn" onclick="changeQty('${item.id}', ${item.qty + 1})">+</button>
            </div>
          </div>
          <span class="cart-item-price">${formatPrice(item.price * item.qty)}</span>
          <button class="remove-btn" onclick="deleteItem('${item.id}')" title="Fjern">×</button>
        </div>
      `).join('');

      summaryEl.innerHTML = cart.map(item =>
        `<div class="summary-row"><span>${item.name} x${item.qty}</span><span>${formatPrice(item.price * item.qty)}</span></div>`
      ).join('');

      document.getElementById('total-price').textContent = formatPrice(getTotal());
      document.getElementById('bestilling-field').value = formatCartForEmail();
    }

    function changeQty(id, qty) {
      if (qty < 1) return;
      updateQty(id, qty);
      renderCart();
    }

    function deleteItem(id) {
      removeItem(id);
      renderCart();
    }

    document.getElementById('order-form').addEventListener('submit', function() {
      document.getElementById('bestilling-field').value = formatCartForEmail();
    });

    document.addEventListener('DOMContentLoaded', renderCart);
  </script>
</body>
</html>
```

- [ ] **Steg 2: Verifiser**

Legg til et produkt fra `products.html` og gå til `cart.html`. Sjekk:
- Produktet vises med bilde, navn og pris
- Antallsjustering (+/-) fungerer og oppdaterer totalsum
- Fjern-knapp (×) fjerner produktet
- Tom handlekurv viser tøm-tilstand
- Skjema validerer påkrevde felt
- Bestillingsfeltet fylles ut automatisk ved submit

---

## Task 8: Om oss (about.html)

**Files:**
- Create: `about.html`

- [ ] **Steg 1: Skriv about.html**

```html
<!DOCTYPE html>
<html lang="no">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Om oss — Jørn Jensen Lærhandel</title>
  <link rel="stylesheet" href="css/style.css">
  <style>
    .about-layout {
      max-width: 1000px;
      margin: 0 auto;
      padding: 2.5rem 2rem;
    }
    .about-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      margin-bottom: 3rem;
    }
    .about-text h1 { font-size: 2rem; font-weight: 800; color: var(--text-dark); margin-bottom: 1rem; }
    .about-text p { font-size: 0.95rem; color: var(--text-mid); line-height: 1.75; margin-bottom: 0.85rem; }

    .hours-box {
      background: var(--cream-mid);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 1.5rem;
    }
    .hours-box h3 { font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em; color: var(--text-mid); margin-bottom: 0.85rem; }
    .hours-row { display: flex; justify-content: space-between; font-size: 0.9rem; padding: 0.4rem 0; border-bottom: 1px solid var(--border); }
    .hours-row:last-child { border-bottom: none; }
    .hours-row .day { color: var(--text-mid); }
    .hours-row .time { font-weight: 600; color: var(--text-dark); }

    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      margin-bottom: 2.5rem;
    }
    .contact-info h3 { font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em; color: var(--text-mid); margin-bottom: 0.85rem; }
    .contact-item { display: flex; flex-direction: column; margin-bottom: 0.75rem; }
    .contact-item .label { font-size: 0.72rem; color: var(--text-muted); margin-bottom: 0.15rem; }
    .contact-item a, .contact-item span { font-size: 0.95rem; color: var(--text-dark); font-weight: 500; }
    .contact-item a:hover { color: var(--brown-dark); }

    .social-links { display: flex; gap: 0.75rem; margin-top: 0.5rem; }
    .social-link {
      background: var(--brown-dark);
      color: var(--cream-dark);
      padding: 0.4rem 0.85rem;
      border-radius: 6px;
      font-size: 0.82rem;
      transition: background 0.15s;
    }
    .social-link:hover { background: #5a4738; }

    .map-section { margin-bottom: 2.5rem; }
    .map-section h3 { font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em; color: var(--text-mid); margin-bottom: 0.85rem; }
    .map-embed { border-radius: 10px; overflow: hidden; border: 1px solid var(--border); }

    .contact-form-section { max-width: 560px; }
    .contact-form-section h3 { font-size: 1.1rem; font-weight: 700; color: var(--text-dark); margin-bottom: 1.25rem; }
    .contact-submit-btn { background: var(--brown-dark); color: var(--cream-dark); border: none; padding: 0.7rem 1.5rem; border-radius: 7px; font-size: 0.95rem; font-weight: 600; cursor: pointer; transition: background 0.15s; }
    .contact-submit-btn:hover { background: #5a4738; }

    @media (max-width: 768px) {
      .about-grid, .contact-grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>

  <header class="site-header"></header>

  <div class="about-layout">

    <div class="about-grid">
      <div class="about-text">
        <h1>Om oss</h1>
        <p>Jørn Jensen Lærhandel AS er en norsk familiebedrift med lang tradisjon innen lær og håndverk. Vi tilbyr kvalitetsmaterialer for knivmaking og lærarbeid — alt fra knivblader og skaftmaterialer til lær, verktøy og kjemikalier.</p>
        <p>Vi holder til på Stallbakken 13 i Rælingen, Akershus. Du er hjertelig velkommen til å besøke oss i åpningstidene, eller ta kontakt på telefon og e-post.</p>
      </div>
      <div class="hours-box">
        <h3>Åpningstider</h3>
        <div class="hours-row"><span class="day">Mandag</span><span class="time">09:00 – 16:00</span></div>
        <div class="hours-row"><span class="day">Tirsdag</span><span class="time">09:00 – 16:00</span></div>
        <div class="hours-row"><span class="day">Onsdag</span><span class="time">09:00 – 16:00</span></div>
        <div class="hours-row"><span class="day">Torsdag</span><span class="time">09:00 – 16:00</span></div>
        <div class="hours-row"><span class="day">Fredag</span><span class="time">09:00 – 16:00</span></div>
        <div class="hours-row"><span class="day">Lørdag</span><span class="time">09:00 – 14:00</span></div>
        <div class="hours-row"><span class="day">Søndag</span><span class="time">Stengt</span></div>
      </div>
    </div>

    <div class="contact-grid" id="kontakt">
      <div class="contact-info">
        <h3>Kontaktinformasjon</h3>
        <div class="contact-item">
          <span class="label">Adresse</span>
          <span>Stallbakken 13, 2005 Rælingen, Akershus</span>
        </div>
        <div class="contact-item">
          <span class="label">Telefon</span>
          <a href="tel:+4764841010">+47 64 84 10 10</a>
        </div>
        <div class="contact-item">
          <span class="label">E-post</span>
          <a href="mailto:firmapost@jjensen.no">firmapost@jjensen.no</a>
        </div>
        <div style="margin-top:1rem">
          <div class="label" style="font-size:0.72rem;color:var(--text-muted);margin-bottom:0.5rem">Følg oss</div>
          <div class="social-links">
            <a class="social-link" href="https://www.facebook.com/groups/jjensen.no" target="_blank">Facebook</a>
            <a class="social-link" href="https://www.instagram.com/jjensen.no" target="_blank">Instagram</a>
            <a class="social-link" href="https://www.youtube.com/@jjensen.no" target="_blank">YouTube</a>
          </div>
        </div>
      </div>

      <div class="contact-form-section">
        <h3>Send oss en melding</h3>
        <form action="https://formsubmit.co/firmapost@jjensen.no" method="POST">
          <input type="hidden" name="_subject" value="Kontaktmelding fra jjensen.no">
          <input type="hidden" name="_next" value="takk.html">
          <input type="hidden" name="_captcha" value="false">
          <div class="form-group">
            <label for="c-navn">Navn <span class="required">*</span></label>
            <input type="text" id="c-navn" name="Navn" required placeholder="Ola Nordmann">
          </div>
          <div class="form-group">
            <label for="c-epost">E-post <span class="required">*</span></label>
            <input type="email" id="c-epost" name="E-post" required placeholder="ola@epost.no">
          </div>
          <div class="form-group">
            <label for="c-melding">Melding <span class="required">*</span></label>
            <textarea id="c-melding" name="Melding" required placeholder="Hva lurer du på?"></textarea>
          </div>
          <button type="submit" class="contact-submit-btn">Send melding</button>
        </form>
      </div>
    </div>

    <div class="map-section">
      <h3>Finn oss</h3>
      <div class="map-embed">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2000!2d11.028!3d59.946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sStallbakken+13%2C+2005+R%C3%A6lingen!5e0!3m2!1sno!2sno!4v1"
          width="100%" height="350" style="border:0;" allowfullscreen="" loading="lazy"
          referrerpolicy="no-referrer-when-downgrade" title="Kart til Jørn Jensen Lærhandel"></iframe>
      </div>
    </div>

  </div>

  <footer class="site-footer"></footer>
  <div class="site-footer-bottom"></div>

  <script src="js/products.js"></script>
  <script src="js/cart.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Steg 2: Verifiser**

Åpne `about.html`. Sjekk:
- Åpningstider vises korrekt
- Kontaktinfo er korrekt
- Kart lastes (kan hende ikke vises lokalt — OK, vil fungere på server)
- Kontaktskjema validerer påkrevde felt

---

## Task 9: Takkeside (takk.html)

**Files:**
- Create: `takk.html`

- [ ] **Steg 1: Skriv takk.html**

```html
<!DOCTYPE html>
<html lang="no">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Takk for din henvendelse — Jørn Jensen Lærhandel</title>
  <link rel="stylesheet" href="css/style.css">
  <style>
    .takk-page {
      min-height: 60vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 3rem 2rem;
      text-align: center;
    }
    .takk-box { max-width: 520px; }
    .takk-icon {
      width: 64px; height: 64px;
      background: var(--cream-mid);
      border: 2px solid var(--brown-light);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 1.5rem;
      font-size: 1.75rem;
    }
    .takk-box h1 { font-size: 1.75rem; font-weight: 800; color: var(--text-dark); margin-bottom: 0.75rem; }
    .takk-box p { font-size: 1rem; color: var(--text-mid); line-height: 1.7; margin-bottom: 0.5rem; }
    .takk-actions { display: flex; gap: 0.75rem; justify-content: center; margin-top: 2rem; }
  </style>
</head>
<body>

  <header class="site-header"></header>

  <div class="takk-page">
    <div class="takk-box">
      <div class="takk-icon">&#10003;</div>
      <h1>Takk for din henvendelse!</h1>
      <p>Vi har mottatt din bestillingsforespørsel og vil ta kontakt med deg så snart som mulig.</p>
      <p>Du vil motta en bekreftelse og faktura på e-post.</p>
      <div class="takk-actions">
        <a href="products.html" class="btn-primary">Fortsett å handle</a>
        <a href="index.html" class="btn-secondary" style="color:var(--brown-dark);border-color:var(--brown-dark)">Til forsiden</a>
      </div>
    </div>
  </div>

  <footer class="site-footer"></footer>
  <div class="site-footer-bottom"></div>

  <script src="js/products.js"></script>
  <script src="js/cart.js"></script>
  <script src="js/main.js"></script>
  <script>
    // Tøm handlekurven etter vellykket bestilling
    document.addEventListener('DOMContentLoaded', clearCart);
  </script>
</body>
</html>
```

- [ ] **Steg 2: Verifiser**

Åpne `takk.html` direkte. Sjekk:
- Hake-ikon og tekst vises korrekt
- "Fortsett å handle"- og "Til forsiden"-lenker fungerer
- Handlekurven er tømt (localStorage)

---

## Task 10: Sluttkontroll

- [ ] **Steg 1: Test komplett bestillingsflyt**

1. Åpne `index.html`
2. Klikk "Se alle produkter" — sjekk at `products.html` åpnes
3. Klikk "Legg i handlekurv" på to ulike produkter — handlekurv-teller skal vise (2)
4. Gå til handlekurv — begge produkter skal vises
5. Juster antall på ett produkt — totalsum skal oppdateres
6. Fjern ett produkt — skal forsvinne fra lista
7. Naviger tilbake til `products.html` og legg til et nytt produkt — handlekurven beholdes (localStorage)
8. Gå til `cart.html`, fyll ut skjema og send — sjekk at du videresendes til `takk.html`
9. Verifiser at handlekurven er tom på `takk.html`

- [ ] **Steg 2: Test navigasjon**

- `index.html` → alle lenker i header fungerer
- `products.html?category=ferdige-produkter` → forhåndsvelger riktig kategori
- `about.html#kontakt` → scroller til kontakt-seksjon (fungerer i nettleser)
- Logo-lenke tar tilbake til `index.html` fra alle sider

- [ ] **Steg 3: Test på mobil-bredde**

Åpne Chrome DevTools, velg "Responsive" og sett bredde til 375px. Sjekk:
- Header er lesbar
- Produktgrid går til 2 kolonner
- Sidepanel i `products.html` flyttes over produktgrid
- `cart.html` stacker layout vertikalt
- Footer stacker til én kolonne

- [ ] **Steg 4: Fjern test.html**

```bash
rm test.html
```
