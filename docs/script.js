/* =========================
   NAVBAR MÒBIL
========================= */
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});

navMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
  });
});

/* =========================
   FORMULARI
========================= */
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');

function setError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(`error-${fieldId}`);
  if (!field || !error) return;

  if (message) {
    field.classList.add('error');
    error.textContent = message;
  } else {
    field.classList.remove('error');
    error.textContent = '';
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm() {
  let valid = true;

  const nom = document.getElementById('nom').value.trim();
  const email = document.getElementById('email').value.trim();
  const telefon = document.getElementById('telefon').value.trim();
  const missatge = document.getElementById('missatge').value.trim();

  if (!nom) { setError('nom', 'Nom obligatori'); valid = false; } else setError('nom', '');
  if (!email || !isValidEmail(email)) { setError('email', 'Email incorrecte'); valid = false; } else setError('email', '');
  if (!telefon) { setError('telefon', 'Telèfon obligatori'); valid = false; } else setError('telefon', '');
  if (missatge.length < 10) { setError('missatge', 'Mínim 10 caràcters'); valid = false; } else setError('missatge', '');

  return valid;
}

form.addEventListener('submit', e => {
  e.preventDefault();
  if (!validateForm()) return;

  submitBtn.disabled = true;
  submitBtn.querySelector('.btn-text').textContent = 'Enviant...';

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.querySelector('.btn-text').textContent = 'Enviar missatge 🚀';
    form.reset();
    formSuccess.classList.add('show');
  }, 1200);
});

/* =========================
   COOKIES + STATCOUNTER
========================= */
const cookieBanner = document.getElementById('cookie-banner');
const acceptCookies = document.getElementById('acceptCookies');
const rejectCookies = document.getElementById('rejectCookies');

function loadStatcounter() {
  if (document.getElementById('statcounter-script')) return;

  const vars = document.createElement('script');
  vars.text = `
    var sc_project=13221979;
    var sc_invisible=1;
    var sc_security="6bb6adfd";
  `;

  const script = document.createElement('script');
  script.src = 'https://www.statcounter.com/counter/counter.js';
  script.async = true;
  script.id = 'statcounter-script';

  document.body.appendChild(vars);
  document.body.appendChild(script);
}

if (localStorage.getItem('cookieConsent') === 'accepted') {
  cookieBanner.style.display = 'none';
  loadStatcounter();
}

acceptCookies.addEventListener('click', () => {
  localStorage.setItem('cookieConsent', 'accepted');
  cookieBanner.style.display = 'none';
  loadStatcounter();
});

rejectCookies.addEventListener('click', () => {
  localStorage.setItem('cookieConsent', 'rejected');
  cookieBanner.style.display = 'none';
});
