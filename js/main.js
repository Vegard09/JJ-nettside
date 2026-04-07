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
