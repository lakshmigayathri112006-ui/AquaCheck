// ===== Mobile Navigation Toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked (mobile)
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ===== Interactive Water Analyzer =====
// WHO recommended limits
const LIMITS = {
  ph: { min: 6.5, max: 8.5, idealMin: 6.5, idealMax: 7.5, label: 'pH' },
  tds: { max: 1000, idealMax: 300, label: 'TDS (mg/L)' },
  turbidity: { max: 5, idealMax: 1, label: 'Turbidity (NTU)' },
  nitrate: { max: 45, idealMax: 10, label: 'Nitrate (mg/L)' },
  hardness: { max: 500, idealMax: 150, label: 'Hardness (mg/L)' },
  chlorine: { max: 5, idealMax: 0.5, label: 'Free Chlorine (mg/L)' },
};

const analyzerForm = document.getElementById('analyzerForm');
const analyzerOutput = document.getElementById('analyzerOutput');

analyzerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const values = {
    ph: parseFloat(document.getElementById('ph').value),
    tds: parseFloat(document.getElementById('tds').value),
    turbidity: parseFloat(document.getElementById('turbidity').value),
    nitrate: parseFloat(document.getElementById('nitrate').value),
    hardness: parseFloat(document.getElementById('hardness').value),
    chlorine: parseFloat(document.getElementById('chlorine').value),
  };

  const results = [];
  let overall = 'good';

  for (const key in LIMITS) {
    const limit = LIMITS[key];
    const val = values[key];
    let status;

    if (key === 'ph') {
      if (val >= limit.idealMin && val <= limit.idealMax) status = 'good';
      else if (val >= limit.min && val <= limit.max) status = 'warn';
      else status = 'bad';
    } else {
      if (val <= limit.idealMax) status = 'good';
      else if (val <= limit.max) status = 'warn';
      else status = 'bad';
    }

    if (status === 'bad' && overall !== 'bad') overall = 'bad';
    else if (status === 'warn' && overall === 'good') overall = 'warn';

    results.push({ label: limit.label, value: val, status });
  }

  renderResults(results, overall);
});

function renderResults(results, overall) {
  const banner = {
    good: { class: 'good', text: '✅ Excellent — Your water meets ideal quality standards.' },
    warn: { class: 'warn', text: '⚠️ Acceptable — Your water is within limits but some parameters need attention.' },
    bad: { class: 'bad', text: '❌ Unsafe — One or more parameters exceed safe drinking water limits.' },
  }[overall];

  let rows = results
    .map(
      (r) =>
        `<div class="param-row">
          <span>${r.label}</span>
          <span class="status ${r.status}">${r.status === 'good' ? 'Good' : r.status === 'warn' ? 'Caution' : 'Unsafe'} · ${r.value}</span>
        </div>`
    )
    .join('');

  analyzerOutput.innerHTML = `
    <div class="result-banner ${banner.class}">${banner.text}</div>
    <div class="param-list">${rows}</div>
    <p class="result-summary">This assessment is based on WHO drinking water guidelines. For a certified laboratory report, please <a href="#contact" style="color:#22d3ee;text-decoration:underline;">contact us</a>.</p>
  `;
}

// ===== Contact Form (demo) =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  const original = btn.textContent;
  btn.textContent = '✓ Message Sent!';
  btn.style.background = '#16a34a';
  contactForm.reset();

  setTimeout(() => {
    btn.textContent = original;
    btn.style.background = '';
  }, 3000);
});
