/* =====================================================
   FOODLOGÍSTIC S.A. — JavaScript
   Funcionalitats:
     1. Menú hamburguesa (mòbil)
     2. Navbar activa en scroll
     3. Scroll spy (ressalta secció activa al menú)
     4. Validació del formulari de contacte
     5. Animació d'aparició en scroll (IntersectionObserver)
===================================================== */

/* ── 1. MENÚ HAMBURGUESA ── */
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Tanca el menú en fer clic a un enllaç
navMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
  });
});


/* ── 2. SCROLL SPY — Ressalta l'enllaç actiu ── */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const observerOptions = {
  root: null,
  rootMargin: '-30% 0px -60% 0px',
  threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === `#${id}`
        );
      });
    }
  });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));


/* ── 3. ANIMACIÓ D'APARICIÓ EN SCROLL ── */
const animatedElements = document.querySelectorAll(
  '.service-card, .stats-card, .value-item, .contact-item'
);

// Afegim l'estil initial ocult via JS per no trencar l'experiència sense JS
animatedElements.forEach(el => {
  el.style.opacity    = '0';
  el.style.transform  = 'translateY(30px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

const appearObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Retard escalonat
      setTimeout(() => {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 80);
      appearObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

animatedElements.forEach(el => appearObserver.observe(el));


/* ── 4. VALIDACIÓ DEL FORMULARI DE CONTACTE ── */
const form       = document.getElementById('contactForm');
const submitBtn  = document.getElementById('submitBtn');
const formSuccess= document.getElementById('formSuccess');

/**
 * Mostra un missatge d'error en un camp
 * @param {string} fieldId  - ID del camp
 * @param {string} message  - Text de l'error (buit per esborrar)
 */
function setError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(`error-${fieldId}`);

  if (message) {
    field.classList.add('error');
    error.textContent = message;
  } else {
    field.classList.remove('error');
    error.textContent = '';
  }
}

/**
 * Valida el format de l'email
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Valida el format del telèfon (mínim 9 dígits, permet espais i +)
 * @param {string} phone
 * @returns {boolean}
 */
function isValidPhone(phone) {
  return /^[+\d][\d\s\-().]{7,}$/.test(phone.trim());
}

/**
 * Valida tots els camps del formulari
 * @returns {boolean} — true si tot és vàlid
 */
function validateForm() {
  let isValid = true;

  const nom      = document.getElementById('nom').value.trim();
  const email    = document.getElementById('email').value.trim();
  const telefon  = document.getElementById('telefon').value.trim();
  const missatge = document.getElementById('missatge').value.trim();

  // Nom
  if (!nom) {
    setError('nom', 'El nom és obligatori.');
    isValid = false;
  } else if (nom.length < 2) {
    setError('nom', 'El nom ha de tenir almenys 2 caràcters.');
    isValid = false;
  } else {
    setError('nom', '');
  }

  // Email
  if (!email) {
    setError('email', 'El correu electrònic és obligatori.');
    isValid = false;
  } else if (!isValidEmail(email)) {
    setError('email', 'Introduïu un correu electrònic vàlid.');
    isValid = false;
  } else {
    setError('email', '');
  }

  // Telèfon
  if (!telefon) {
    setError('telefon', 'El telèfon de contacte és obligatori.');
    isValid = false;
  } else if (!isValidPhone(telefon)) {
    setError('telefon', 'Introduïu un número de telèfon vàlid.');
    isValid = false;
  } else {
    setError('telefon', '');
  }

  // Missatge
  if (!missatge) {
    setError('missatge', 'El missatge és obligatori.');
    isValid = false;
  } else if (missatge.length < 10) {
    setError('missatge', 'El missatge ha de tenir almenys 10 caràcters.');
    isValid = false;
  } else {
    setError('missatge', '');
  }

  return isValid;
}

// Validació en temps real (mentre l'usuari escriu)
['nom', 'email', 'telefon', 'missatge'].forEach(id => {
  document.getElementById(id).addEventListener('input', () => {
    // Revalida el camp concret quan canvia
    validateField(id);
  });
});

/**
 * Valida un camp individual
 * @param {string} id - ID del camp
 */
function validateField(id) {
  const value = document.getElementById(id).value.trim();

  switch (id) {
    case 'nom':
      if (!value) setError('nom', 'El nom és obligatori.');
      else if (value.length < 2) setError('nom', 'Mínim 2 caràcters.');
      else setError('nom', '');
      break;

    case 'email':
      if (!value) setError('email', 'El correu electrònic és obligatori.');
      else if (!isValidEmail(value)) setError('email', 'Format de correu no vàlid.');
      else setError('email', '');
      break;

    case 'telefon':
      if (!value) setError('telefon', 'El telèfon és obligatori.');
      else if (!isValidPhone(value)) setError('telefon', 'Format de telèfon no vàlid.');
      else setError('telefon', '');
      break;

    case 'missatge':
      if (!value) setError('missatge', 'El missatge és obligatori.');
      else if (value.length < 10) setError('missatge', 'Mínim 10 caràcters.');
      else setError('missatge', '');
      break;
  }
}

// Enviament del formulari
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Evita l'enviament real al servidor

  formSuccess.classList.remove('show');

  if (!validateForm()) return;

  // Simulació d'enviament (loading)
  submitBtn.disabled = true;
  submitBtn.querySelector('.btn-text').textContent = 'Enviant...';

  setTimeout(() => {
    // Simulació de resposta exitosa
    submitBtn.disabled = false;
    submitBtn.querySelector('.btn-text').textContent = 'Enviar missatge 🚀';
    formSuccess.classList.add('show');
    form.reset();

    // Scroll suau cap al missatge d'èxit
    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Amaga el missatge d'èxit al cap de 6 segons
    setTimeout(() => {
      formSuccess.classList.remove('show');
    }, 6000);
  }, 1500);
});

const cookieBanner = document.getElementById('cookie-banner');
const acceptCookies = document.getElementById('acceptCookies');
const rejectCookies = document.getElementById('rejectCookies');

// Si ja hi ha consentiment, no mostrem el banner
if (localStorage.getItem('cookieConsent')) {
  cookieBanner.style.display = 'none';
}

// Acceptar cookies
acceptCookies.addEventListener('click', () => {
  localStorage.setItem('cookieConsent', 'accepted');
  cookieBanner.style.display = 'none';
});

// Rebutjar cookies
rejectCookies.addEventListener('click', () => {
  localStorage.setItem('cookieConsent', 'rejected');
  cookieBanner.style.display = 'none';
});
