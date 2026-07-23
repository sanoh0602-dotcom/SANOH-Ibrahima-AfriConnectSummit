/*
   AFRICONNECT SUMMIT 2027 — MAIN.JS
   COMMIT 6 : Dark mode + localStorage, Navbar dynamique,
   Bouton retour en haut, Année dynamique*/


/* 1. ANNÉE DYNAMIQUE DANS LE FOOTER */

/*
   document.getElementById('currentYear')
   → cherche le <span id="currentYear"> dans le footer de chaque page.

   new Date().getFullYear()
   → retourne l'année en cours (ex: 2027).

   .textContent = ...
   → insère l'année dans le span.
   Le copyright se met à jour automatiquement chaque année.
*/
const currentYearEl = document.getElementById('currentYear');
if (currentYearEl) {
  // Met à jour la valeur textuelle de l'élément cible avec l'année système courante
  currentYearEl.textContent = new Date().getFullYear();
}


/*2. DARK MODE / LIGHT MODE + localStorage */

/*
   Récupération du bouton dark mode (id="darkModeToggle")
   présent dans la navbar de TOUTES les pages.
*/
const darkModeToggle = document.getElementById('darkModeToggle');

/*
   Fonction applyTheme(theme)
   → applique 'dark' ou 'light' sur la page.

   Actions :
   1. document.body.setAttribute('data-theme', theme)
      → ajoute data-theme="dark" ou "light" sur le <body>
      → le CSS [data-theme="dark"] s'active automatiquement

   2. Change l'icône du bouton :
      dark  → lune devient soleil (bi-sun-fill)
      light → soleil devient lune (bi-moon-fill)

   3. Change la couleur du bouton :
      dark  → outline-warning (jaune)
      light → outline neutre
*/
function applyTheme(theme) {

  /* Étape 1 : coller l'étiquette sur le body */
  document.body.setAttribute('data-theme', theme);

  /* Étape 2 : récupérer l'icône dans le bouton */
  const icon = darkModeToggle ? darkModeToggle.querySelector('i') : null;

  if (theme === 'dark') {

    /* MODE SOMBRE → icône soleil */
    if (icon) {
      // Bascule de la classe d'icône Bootstrap Icons vers le soleil
      icon.classList.remove('bi-moon-fill');
      icon.classList.add('bi-sun-fill');
    }

  } else {

    /* MODE CLAIR → icône lune */
    if (icon) {
      // Bascule de la classe d'icône Bootstrap Icons vers la lune
      icon.classList.remove('bi-sun-fill');
      icon.classList.add('bi-moon-fill');
    }
  }
}

/*
   Lecture du thème sauvegardé au chargement de la page.

   localStorage.getItem('theme')
   → lit la valeur stockée dans le navigateur.
   Retourne null si première visite.

   || 'light'
   → si null, utilise 'light' par défaut.

   Cela permet au thème de PERSISTER entre les pages
   et les rechargements.
*/
const savedTheme = localStorage.getItem('theme') || 'light';
// Application immédiate du thème récupéré depuis le stockage local
applyTheme(savedTheme);

/*
   Clic sur le bouton dark mode :
   1. Lire le thème actuel
   2. Calculer le nouveau thème (inverse)
   3. Appliquer le nouveau thème
   4. Sauvegarder dans localStorage

   localStorage.setItem('theme', newTheme)
   → stocke le choix dans le navigateur.
   Persiste même après fermeture du navigateur.
*/
if (darkModeToggle) {
  darkModeToggle.addEventListener('click', function () {
    // Écouteur d'événement au clic pour permuter l'état du thème (Toggle)
    const currentTheme = document.body.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    // Persistance du nouveau thème sélectionné dans la mémoire du navigateur
    localStorage.setItem('theme', newTheme);
  });
}


/* 3. MENU HAMBURGER MOBILE*/

/*
   .btn-hamburger → bouton menu visible sur mobile.
   id="hamburger" ciblé ici.
   Au clic → ouvre/ferme le menu en ajoutant/retirant
   la classe "menu-ouvert" sur .nav-links.
*/
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', function () {

    /* Vérifier si le menu est déjà ouvert */
    const isOpen = navLinks.classList.contains('menu-ouvert');

    if (isOpen) {
      /* Fermer le menu */
      navLinks.classList.remove('menu-ouvert');
      // Gestion de l'accessibilité (ARIA) et remplacement d'icône (X vers hamburger)
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.querySelector('i').classList.replace('bi-x', 'bi-list');
    } else {
      /* Ouvrir le menu */
      navLinks.classList.add('menu-ouvert');
      // Gestion de l'accessibilité (ARIA) et remplacement d'icône (hamburger vers X)
      hamburger.setAttribute('aria-expanded', 'true');
      hamburger.querySelector('i').classList.replace('bi-list', 'bi-x');
    }
  });

  /*
     Fermer le menu quand on clique sur un lien.
     Évite que le menu reste ouvert après navigation.
  */
  navLinks.querySelectorAll('.nav-link').forEach(function (link) {
    // Attache un écouteur de fermeture sur chaque lien individuel de la navigation
    link.addEventListener('click', function () {
      navLinks.classList.remove('menu-ouvert');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.querySelector('i').classList.replace('bi-x', 'bi-list');
    });
  });
}


/*
   4. NAVBAR DYNAMIQUE AU SCROLL
   Changement de fond et d'ombre après 80px de défilement */

/*
   Récupération de la navbar par son id="navbar".
*/
const navbar = document.getElementById('navbar');

/*
   Fonction handleNavbarScroll()
   → vérifie la position de scroll et adapte le style.

   window.scrollY
   → nombre de pixels scrollés depuis le haut.
   0 = en haut, augmente quand on descend.

   Si scrollY > 80 → ajoute classe 'scrolled'
   → CSS .navbar.scrolled réduit le padding (effet shrink).

   Sinon → retire 'scrolled' → taille normale.
*/
function handleNavbarScroll() {
  // Sécurité : stoppe la fonction si la navbar n'existe pas sur la page
  if (!navbar) return;

  // Seuil de déclenchement fixé à 80 pixels
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

/*
   Écoute le scroll sur toute la fenêtre.
   handleNavbarScroll() s'exécute à chaque mouvement.
*/
window.addEventListener('scroll', handleNavbarScroll);

/*
   Appel immédiat au chargement.
   Si l'utilisateur recharge la page en bas,
   la navbar aura déjà le bon style.
*/
handleNavbarScroll();


/*
   5. BOUTON RETOUR EN HAUT
   Apparaît après 300px de scroll, remonte en douceur au clic
*/

/*
   Récupération du bouton id="backToTop".
*/
const backToTopBtn = document.getElementById('backToTop');

/*
   Fonction handleBackToTop()
   → affiche ou masque le bouton selon le scroll.

   Si scrollY > 300 → display: 'flex' (visible).
   On utilise 'flex' pour centrer l'icône (align-items + justify-content).

   Sinon → display: 'none' (caché).
*/
function handleBackToTop() {
  // Sécurité : vérifie la présence du bouton dans le DOM
  if (!backToTopBtn) return;

  // Déclenchement de la visibilité au-delà de 300px de défilement vertical
  if (window.scrollY > 300) {
    backToTopBtn.style.display = 'flex';
  } else {
    backToTopBtn.style.display = 'none';
  }
}

/* Écoute du scroll */
window.addEventListener('scroll', handleBackToTop);

/* Vérification initiale */
handleBackToTop();

/*
   Clic sur le bouton → remonter en haut de page.

   window.scrollTo({ top: 0, behavior: 'smooth' })
   → défile jusqu'au pixel 0 (haut de page).
   behavior: 'smooth' → animation fluide.
   Sans 'smooth' → saut instantané et brutal.
*/
if (backToTopBtn) {
  // Attachement de l'événement de défilement doux (smooth scroll) lors du clic
  backToTopBtn.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}