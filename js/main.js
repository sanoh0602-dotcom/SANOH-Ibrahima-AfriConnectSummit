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

/* COMMIT 7 : Compte à rebours, compteurs animés,
               animations fade-in, onglets programme */
   

/*
   1. COMPTE À REBOURS EN TEMPS RÉEL
   Affiche les jours/heures/minutes/secondes jusqu'à l'événement */

/*
   On définit la date fictive de la conférence.
   new Date('2027-03-15T09:00:00')
   → crée un objet Date représentant le 15 mars 2027 à 09h00.
   C'est la date cible vers laquelle le compte à rebours pointe.
*/
const dateConference = new Date('2027-03-15T09:00:00');

/*
   Fonction updateCountdown()
   → calcule et affiche le temps restant jusqu'à la conférence.

   Elle s'exécute toutes les secondes grâce à setInterval().

   Calculs :
   difference = dateConference - maintenant (en millisecondes)
   jours    = difference / (1000ms × 60s × 60min × 24h)
   heures   = (reste après les jours) / (1000 × 60 × 60)
   minutes  = (reste après les heures) / (1000 × 60)
   secondes = (reste après les minutes) / 1000

   Math.floor() → arrondit à l'entier inférieur (pas de décimales).
   % (modulo)   → donne le reste d'une division.
*/
function updateCountdown() {

  /* Date et heure actuelles */
  const maintenant = new Date();

  /* Différence en millisecondes entre la conférence et maintenant */
  const difference = dateConference - maintenant;

  /* Si la date est passée → afficher des zéros */
  if (difference <= 0) {
    document.getElementById('countdown-jours').textContent    = '00';
    document.getElementById('countdown-heures').textContent   = '00';
    document.getElementById('countdown-minutes').textContent  = '00';
    document.getElementById('countdown-secondes').textContent = '00';
    return;
  }

  /*
     Calcul des jours restants.
     1000 × 60 × 60 × 24 = nombre de millisecondes dans 1 jour.
     Math.floor() → on prend la partie entière (sans décimales).
  */
  const jours    = Math.floor(difference / (1000 * 60 * 60 * 24));

  /*
     % (modulo) → ce qui reste APRÈS avoir soustrait les jours.
     Divisé par (1000 × 60 × 60) → donne les heures restantes.
  */
  const heures   = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  /*
     Même logique pour les minutes.
     Ce qui reste après les heures, divisé par (1000 × 60).
  */
  const minutes  = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

  /*
     Ce qui reste après les minutes, divisé par 1000 → secondes.
  */
  const secondes = Math.floor((difference % (1000 * 60)) / 1000);

  /*
     padStart(2, '0')
     → ajoute un "0" devant si le nombre est inférieur à 10.
     Ex: 9 → "09", 45 → "45".
     C'est pour avoir toujours 2 chiffres (09:05 au lieu de 9:5).
  */
  const elJours    = document.getElementById('countdown-jours');
  const elHeures   = document.getElementById('countdown-heures');
  const elMinutes  = document.getElementById('countdown-minutes');
  const elSecondes = document.getElementById('countdown-secondes');

  /*
     On vérifie que les éléments existent avant de les modifier.
     Ils n'existent que sur index.html.
     Sur les autres pages → on ne fait rien.
  */
  if (elJours)    elJours.textContent    = String(jours).padStart(2, '0');
  if (elHeures)   elHeures.textContent   = String(heures).padStart(2, '0');
  if (elMinutes)  elMinutes.textContent  = String(minutes).padStart(2, '0');
  if (elSecondes) elSecondes.textContent = String(secondes).padStart(2, '0');
}

/*
   Exécuter updateCountdown() immédiatement au chargement.
   Sinon le compte à rebours affiche "00" pendant 1 seconde.
*/
updateCountdown();

/*
   setInterval(fonction, délai)
   → répète la fonction toutes les 1000ms (1 seconde).
   C'est ce qui rend le compte à rebours "en temps réel".
*/
setInterval(updateCountdown, 1000);


/*
   2. COMPTEURS ANIMÉS AU SCROLL
   Les chiffres s'animent de 0 à leur valeur cible
   grâce à IntersectionObserver*/

/*
   On sélectionne tous les éléments avec la classe .stat-number.
   Ces éléments ont data-target="1200", data-target="48" etc.
   Ils existent sur index.html (section chiffres clés).
*/
const counters = document.querySelectorAll('.stat-number');

/*
   Fonction animateCounter(element)
   → anime un compteur de 0 jusqu'à sa valeur cible.

   Paramètre : element = le <span class="stat-number"> à animer.

   Étapes :
   1. Lire data-target → la valeur finale.
   2. Diviser par 50 → l'incrément à chaque étape.
   3. setInterval toutes les 30ms → ajouter l'incrément.
   4. Quand on atteint la cible → arrêter avec clearInterval.
*/
function animateCounter(element) {

  /* Lire la valeur cible depuis data-target="1200" */
  const target = parseInt(element.getAttribute('data-target'));

  /* Valeur de départ : 0 */
  let current = 0;

  /*
     Calcul de l'incrément.
     target / 50 → atteindre la cible en 50 étapes.
     Math.ceil() → arrondi supérieur (évite 0 si target < 50).
  */
  const increment = Math.ceil(target / 50);

  /*
     setInterval → répète toutes les 30 millisecondes.
     Crée l'effet de compteur qui s'incrémente progressivement.
  */
  const timer = setInterval(function () {

    current += increment;

    if (current >= target) {
      /*
         On a atteint ou dépassé la cible.
         Afficher exactement la valeur cible.
         toLocaleString('fr-FR') → formate avec espace milliers.
         Ex: 1200 → "1 200".
      */
      element.textContent = target.toLocaleString('fr-FR');
      clearInterval(timer);
    } else {
      /* Afficher la valeur intermédiaire */
      element.textContent = current.toLocaleString('fr-FR');
    }

  }, 30);
}

/*
   IntersectionObserver → surveille quand les compteurs
   deviennent visibles dans le viewport (l'écran).

   new IntersectionObserver(callback, options)
   → callback : fonction exécutée quand un élément devient visible.
   → threshold: 0.5 : déclenche quand 50% de l'élément est visible.

   Avantage : plus performant qu'écouter le scroll en permanence.
*/
if (counters.length > 0) {

  const counterObserver = new IntersectionObserver(function (entries) {

    /*
       entries → tableau de tous les éléments observés.
       On les parcourt un par un.
    */
    entries.forEach(function (entry) {

      /*
         entry.isIntersecting
         → true si l'élément est visible dans le viewport.
      */
      if (entry.isIntersecting) {

        /* Lancer l'animation du compteur */
        animateCounter(entry.target);

        /*
           Arrêter d'observer cet élément.
           Sans ça, le compteur recommencerait à chaque scroll.
        */
        counterObserver.unobserve(entry.target);
      }
    });

  }, { threshold: 0.5 });

  /* Observer chaque compteur de la page */
  counters.forEach(function (counter) {
    counterObserver.observe(counter);
  });
}


/*
   3. ANIMATIONS FADE-IN AU SCROLL
   Les sections apparaissent progressivement
   quand elles entrent dans le viewport */

/*
   On sélectionne toutes les sections avec .animate-section.
   Cette classe est sur toutes les sections de toutes les pages.
*/
const animatedSections = document.querySelectorAll('.animate-section');

/*
   IntersectionObserver pour les animations fade-in.

   threshold: 0.1
   → déclenche dès que 10% de la section est visible.
   On choisit 0.1 (pas 0.5) car les sections peuvent être très grandes.
*/
if (animatedSections.length > 0) {

  const sectionObserver = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

      if (entry.isIntersecting) {

        /*
           Ajouter la classe "visible".

           Le CSS a défini :
           .animate-section         → opacity: 0, translateY(30px)
           .animate-section.visible → opacity: 1, translateY(0)
           transition: 0.6s ease    → animation fluide

           L'ajout de "visible" déclenche la transition CSS.
           La section apparaît progressivement du bas vers le haut.
        */
        entry.target.classList.add('visible');

        /* Arrêter d'observer → l'animation ne rejoue pas */
        sectionObserver.unobserve(entry.target);
      }
    });

  }, { threshold: 0.1 });

  /* Observer chaque section */
  animatedSections.forEach(function (section) {
    sectionObserver.observe(section);
  });
}


/*
   4. ONGLETS DU PROGRAMME (programme.html)
   Affichage du planning du jour sélectionné
   Sans rechargement de page */

/*
   On sélectionne tous les boutons onglets.
   Chaque bouton a data-jour="1", "2" ou "3".
   Ils n'existent que sur programme.html.
*/
const tabBtns = document.querySelectorAll('.tab-btn');

/*
   On vérifie qu'on est sur programme.html.
   Si les onglets n'existent pas → on ne fait rien.
*/
if (tabBtns.length > 0) {

  /*
     Fonction afficherJour(numeroJour)
     → affiche le planning du jour choisi
     → cache les plannings des autres jours.

     Paramètre : numeroJour = "1", "2" ou "3".
  */
  function afficherJour(numeroJour) {

    /*
       Étape 1 : cacher TOUS les plannings.
       On sélectionne tous les éléments avec la classe .planning.
       display: none → sort du flux, invisible.
    */
    document.querySelectorAll('.planning').forEach(function (planning) {
      planning.style.display = 'none';
    });

    /*
       Étape 2 : afficher LE planning du jour choisi.
       id="planning-jour1", "planning-jour2" ou "planning-jour3".
       display: block → visible et dans le flux.
    */
    const planningActif = document.getElementById('planning-jour' + numeroJour);
    if (planningActif) {
      planningActif.style.display = 'block';
    }

    /*
       Étape 3 : retirer la classe "active" de TOUS les onglets.
       On repart de zéro avant d'en activer un.
    */
    tabBtns.forEach(function (btn) {
      btn.classList.remove('active');
      btn.setAttribute('aria-selected', 'false');
    });

    /*
       Étape 4 : ajouter "active" sur le bouton du jour choisi.
       data-jour="1" → on cherche le bouton avec ce data-jour.
    */
    const btnActif = document.querySelector('.tab-btn[data-jour="' + numeroJour + '"]');
    if (btnActif) {
      btnActif.classList.add('active');
      btnActif.setAttribute('aria-selected', 'true');
    }
  }

  /*
     Ajouter un écouteur de clic sur chaque bouton onglet.
  */
  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {

      /*
         Lire le numéro du jour depuis data-jour="2".
         getAttribute('data-jour') → retourne "1", "2" ou "3".
      */
      const jour = this.getAttribute('data-jour');

      /* Afficher le planning de ce jour */
      afficherJour(jour);
    });
  });

  /*
     Initialisation : afficher le Jour 1 par défaut au chargement.
     Le bouton Jour 1 a déjà la classe "active" dans le HTML.
     Le planning Jour 1 est visible, les autres ont display:none.
  */
  afficherJour('1');
}

/* 
   AFRICONNECT SUMMIT 2027 — MAIN.JS
   COMMIT 8 : Filtrage dynamique des intervenants
               + Validation complète du formulaire
  */


/* 
   1. FILTRAGE DYNAMIQUE DES INTERVENANTS (intervenants.html)
   Affiche/masque les cartes selon la thématique choisie
   Sans rechargement de page */

/*
   On sélectionne tous les boutons de filtre.
   Chaque bouton a data-filtre="ia-tech", "business" etc.
   Ils n'existent que sur intervenants.html.
*/
const filtreBtns = document.querySelectorAll('.filtre-btn');

/*
   On sélectionne toutes les cartes intervenants.
   Chaque carte a data-categorie="ia-tech", "business" etc.
*/
const intervenantCards = document.querySelectorAll('.intervenant-card');

/*
   On vérifie qu'on est sur intervenants.html.
   Si les boutons n'existent pas → on ne fait rien.
*/
if (filtreBtns.length > 0) {

  /*
     Fonction filtrerIntervenants(categorieChoisie)
     → affiche les cartes qui correspondent à la catégorie
     → cache toutes les autres cartes.

     Paramètre : categorieChoisie = "tous", "ia-tech", "business"...
  */
  function filtrerIntervenants(categorieChoisie) {

    /*
       On parcourt chaque carte intervenant une par une.
    */
    intervenantCards.forEach(function (carte) {

      /*
         Lire la catégorie de cette carte.
         data-categorie="ia-tech" → on lit "ia-tech".
      */
      const categorieCartee = carte.getAttribute('data-categorie');

      /*
         CONDITION D'AFFICHAGE :
         - "tous" → afficher toutes les cartes
         - même catégorie que le filtre → afficher
         - sinon → cacher
      */
      if (categorieChoisie === 'tous' || categorieCartee === categorieChoisie) {

        /* Afficher la carte */
        carte.style.display = '';

        /*
           Petite animation d'apparition.
           On commence avec opacity 0 puis on passe à 1.
           setTimeout avec 10ms → laisse le navigateur
           calculer l'état initial avant la transition.
        */
        carte.style.opacity = '0';
        carte.style.transform = 'translateY(20px)';
        carte.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

        setTimeout(function () {
          carte.style.opacity = '1';
          carte.style.transform = 'translateY(0)';
        }, 10);

      } else {

        /*
           Cacher la carte.
           display: 'none' → sort complètement du flux.
           La grille CSS Grid se réorganise automatiquement.
        */
        carte.style.display = 'none';
      }
    });
  }

  /*
     Écouter le clic sur chaque bouton de filtre.
  */
  filtreBtns.forEach(function (bouton) {

    bouton.addEventListener('click', function () {

      /*
         Étape 1 : retirer "active" de TOUS les boutons.
         On repart de zéro avant d'en activer un.
      */
      filtreBtns.forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });

      /*
         Étape 2 : ajouter "active" sur le bouton cliqué.
         "this" → le bouton sur lequel on vient de cliquer.
      */
      this.classList.add('active');
      this.setAttribute('aria-pressed', 'true');

      /*
         Étape 3 : lire la catégorie de ce bouton.
         data-filtre="design" → on lit "design".
      */
      const categorieChoisie = this.getAttribute('data-filtre');

      /*
         Étape 4 : filtrer les cartes.
      */
      filtrerIntervenants(categorieChoisie);
    });
  });

  /*
     Initialisation : afficher tous les intervenants au chargement.
     Le bouton "Tous" est déjà actif dans le HTML.
  */
  filtrerIntervenants('tous');
}


/* 
   2. VALIDATION DU FORMULAIRE D'INSCRIPTION (contact.html)
   Contrôle complet à la soumission avec retour visuel par champ */

/*
   Récupération du formulaire par id="inscriptionForm".
   S'il n'existe pas (autres pages) → on ne fait rien.
*/
const inscriptionForm = document.getElementById('inscriptionForm');

if (inscriptionForm) {

  /* 
     FONCTIONS UTILITAIRES DE VALIDATION*/

  /*
     showError(idChamp, message)
     → affiche une erreur sur un champ.

     Actions :
     1. Ajoute la classe "invalid" sur le champ → bordure rouge CSS.
     2. Retire la classe "valid".
     3. Écrit le message d'erreur dans la zone dédiée.

     Paramètres :
     - idChamp : l'id du champ (ex: 'nom', 'email')
     - message : le texte d'erreur à afficher
  */
  function showError(idChamp, message) {
    const champ = document.getElementById(idChamp);
    const zoneErreur = document.getElementById(idChamp + '-error');

    if (champ) {
      champ.classList.add('invalid');
      champ.classList.remove('valid');
    }
    if (zoneErreur) {
      zoneErreur.textContent = message;
    }
  }

  /*
     showSuccess(idChamp)
     → marque un champ comme valide.

     Actions :
     1. Ajoute "valid" → bordure verte CSS.
     2. Retire "invalid".
     3. Vide le message d'erreur.
  */
  function showSuccess(idChamp) {
    const champ = document.getElementById(idChamp);
    const zoneErreur = document.getElementById(idChamp + '-error');

    if (champ) {
      champ.classList.remove('invalid');
      champ.classList.add('valid');
    }
    if (zoneErreur) {
      zoneErreur.textContent = '';
    }
  }

  /*
     clearValidation(idChamp)
     → remet le champ à son état neutre (ni rouge, ni vert).
     Utilisé avant chaque validation pour recommencer proprement.
  */
  function clearValidation(idChamp) {
    const champ = document.getElementById(idChamp);
    const zoneErreur = document.getElementById(idChamp + '-error');

    if (champ) {
      champ.classList.remove('invalid', 'valid');
    }
    if (zoneErreur) {
      zoneErreur.textContent = '';
    }
  }

  /*
     verifierEmail(email)
     → vérifie que le format de l'email est correct.
     → retourne true (valide) ou false (invalide).

     La regex /^[^\s@]+@[^\s@]+\.[^\s@]+$/ vérifie :
     ^ → début de la chaîne
     [^\s@]+ → texte sans espace ni @
     @ → le symbole arobase
     [^\s@]+ → le domaine (gmail, yahoo...)
     \. → un point littéral
     [^\s@]+ → l'extension (.com, .sn, .africa...)
     $ → fin de la chaîne

     Exemples valides   : ibrahima@gmail.com, contact@africonnect.africa
     Exemples invalides : ibrahima@, @gmail.com, sans-arobase.com
  */
  function verifierEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  /*
     verifierTelephone(telephone)
     → vérifie que le téléphone a au moins 8 chiffres.
     → retourne true (valide) ou false (invalide).

     replace(/\D/g, '')
     → supprime TOUT ce qui n'est pas un chiffre.
     \D = "non-digit" (espaces, +, -, parenthèses...)
     Ex: "+221 77 000 00 00" → "22177000000" (11 chiffres)

     .length >= 8 → au moins 8 chiffres requis.
  */
  function verifierTelephone(telephone) {
    const chiffresUniquement = telephone.replace(/\D/g, '');
    return chiffresUniquement.length >= 8;
  }


  /*
     VALIDATION PRINCIPALE — AU CLIC SUR "ENVOYER"
   */

  /*
     Écouter la soumission du formulaire.

     event.preventDefault()
     → BLOQUE l'envoi natif du formulaire.
     Sans ça, la page se rechargerait et on perdrait tout.
     On gère nous-mêmes la validation et l'affichage du résultat.
  */
  inscriptionForm.addEventListener('submit', function (event) {

    /* Bloquer l'envoi natif */
    event.preventDefault();

    /*
       Variable pour suivre si tout est valide.
       Commence à true, passe à false dès qu'on trouve une erreur.
    */
    let toutEstValide = true;

    /*
       Lire les valeurs de chaque champ.
       .value → ce que l'utilisateur a tapé.
       .trim() → supprime les espaces en début et fin.
       Ex: "  Ibrahima  " → "Ibrahima".
    */
    const valeurNom           = document.getElementById('nom').value.trim();
    const valeurEmail         = document.getElementById('email').value.trim();
    const valeurTelephone     = document.getElementById('telephone').value.trim();
    const valeurParticipation = document.getElementById('participation').value;
    const valeurPays          = document.getElementById('pays').value;
    const valeurMessage       = document.getElementById('message').value.trim();

    /*
       Réinitialiser l'état visuel de tous les champs.
       On repart de zéro avant de valider.
    */
    clearValidation('nom');
    clearValidation('email');
    clearValidation('telephone');
    clearValidation('participation');
    clearValidation('pays');
    clearValidation('message');


    /* --- VÉRIFICATION DU NOM --- */
    if (valeurNom === '') {
      showError('nom', 'Le nom complet est obligatoire.');
      toutEstValide = false;
    } else if (valeurNom.length < 2) {
      showError('nom', 'Le nom doit contenir au moins 2 caractères.');
      toutEstValide = false;
    } else {
      showSuccess('nom');
    }


    /* --- VÉRIFICATION DE L'EMAIL --- */
    if (valeurEmail === '') {
      showError('email', "L'adresse email est obligatoire.");
      toutEstValide = false;
    } else if (!verifierEmail(valeurEmail)) {
      /*
         !verifierEmail() → le ! inverse le résultat.
         Si verifierEmail retourne false → !false = true → on entre dans le if.
      */
      showError('email', "Format invalide. Exemple : ibrahima@gmail.com");
      toutEstValide = false;
    } else {
      showSuccess('email');
    }


    /* --- VÉRIFICATION DU TÉLÉPHONE --- */
    if (valeurTelephone === '') {
      showError('telephone', 'Le numéro de téléphone est obligatoire.');
      toutEstValide = false;
    } else if (!verifierTelephone(valeurTelephone)) {
      showError('telephone', 'Le numéro doit contenir au moins 8 chiffres.');
      toutEstValide = false;
    } else {
      showSuccess('telephone');
    }


    /* --- VÉRIFICATION DU TYPE DE PARTICIPATION --- */
    /*
       Le select a une option par défaut avec value="".
       Si l'utilisateur n'a pas choisi → value est vide.
    */
    if (valeurParticipation === '') {
      showError('participation', 'Veuillez choisir votre type de participation.');
      toutEstValide = false;
    } else {
      showSuccess('participation');
    }


    /* --- VÉRIFICATION DU PAYS --- */
    if (valeurPays === '') {
      showError('pays', 'Veuillez sélectionner votre pays.');
      toutEstValide = false;
    } else {
      showSuccess('pays');
    }


    /* --- VÉRIFICATION DU MESSAGE --- */
    if (valeurMessage === '') {
      showError('message', 'Le message/motivation est obligatoire.');
      toutEstValide = false;
    } else if (valeurMessage.length < 20) {
      /*
         .length → nombre de caractères dans la chaîne.
         Minimum 20 caractères exigés dans le sujet.
      */
      showError('message',
        'Minimum 20 caractères. Actuellement : ' + valeurMessage.length + ' caractère(s).'
      );
      toutEstValide = false;
    } else {
      showSuccess('message');
    }


    /* --- RÉSULTAT FINAL --- */

    if (toutEstValide) {

      /*
         TOUT EST VALIDE !
         1. Afficher le message de succès.
         2. Vider le formulaire.
         3. Retirer les bordures vertes.
         4. Masquer le message après 5 secondes.
      */

      /* Afficher le message de succès */
      const messageSucces = document.getElementById('successMessage');
      if (messageSucces) {
        messageSucces.style.display = 'flex';

        /*
           Faire défiler jusqu'au message pour que
           l'utilisateur le voie sans chercher.
        */
        messageSucces.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }

      /*
         contactForm.reset()
         → vide tous les champs du formulaire en une ligne.
         Remet les selects à leur option par défaut.
      */
      inscriptionForm.reset();

      /* Retirer les bordures vertes après reset */
      ['nom', 'email', 'telephone', 'participation', 'pays', 'message'].forEach(function (id) {
        clearValidation(id);
      });

      /*
         Masquer automatiquement le message de succès
         après 5 secondes (5000 millisecondes).
      */
      setTimeout(function () {
        if (messageSucces) {
          messageSucces.style.display = 'none';
        }
      }, 5000);
    }

    /*
       Si toutEstValide = false :
       Les messages d'erreur rouges sont déjà affichés.
       Le formulaire ne s'envoie pas.
       L'utilisateur voit exactement quel champ corriger.
    */
  });


  /* 
     VALIDATION EN DIRECT — AU MOMENT OÙ L'UTILISATEUR QUITTE UN CHAMP
     Retour visuel immédiat sans attendre la soumission
      */

  /*
     'blur' → événement déclenché quand un champ perd le focus.
     (L'utilisateur clique ailleurs ou appuie sur Tab)
     On valide le champ dès qu'il le quitte.
  */

  /* Validation live : Nom */
  const champNom = document.getElementById('nom');
  if (champNom) {
    champNom.addEventListener('blur', function () {
      const val = this.value.trim();
      if (val === '') {
        showError('nom', 'Le nom complet est obligatoire.');
      } else if (val.length < 2) {
        showError('nom', 'Au moins 2 caractères requis.');
      } else {
        showSuccess('nom');
      }
    });
  }

  /* Validation live : Email */
  const champEmail = document.getElementById('email');
  if (champEmail) {
    champEmail.addEventListener('blur', function () {
      const val = this.value.trim();
      if (val === '') {
        showError('email', "L'adresse email est obligatoire.");
      } else if (!verifierEmail(val)) {
        showError('email', "Format invalide. Exemple : ibrahima@gmail.com");
      } else {
        showSuccess('email');
      }
    });
  }

  /* Validation live : Téléphone */
  const champTelephone = document.getElementById('telephone');
  if (champTelephone) {
    champTelephone.addEventListener('blur', function () {
      const val = this.value.trim();
      if (val === '') {
        showError('telephone', 'Le numéro de téléphone est obligatoire.');
      } else if (!verifierTelephone(val)) {
        showError('telephone', 'Au moins 8 chiffres requis.');
      } else {
        showSuccess('telephone');
      }
    });
  }

  /*
     Validation live : Message avec compteur de caractères en temps réel.

     'input' → événement déclenché à CHAQUE frappe du clavier.
     Permet d'afficher le compteur pendant que l'utilisateur tape.
  */
  const champMessage = document.getElementById('message');
  if (champMessage) {

    /* Validation quand on quitte le champ */
    champMessage.addEventListener('blur', function () {
      const val = this.value.trim();
      if (val === '') {
        showError('message', 'Le message/motivation est obligatoire.');
      } else if (val.length < 20) {
        showError('message', 'Minimum 20 caractères. Actuellement : ' + val.length + '.');
      } else {
        showSuccess('message');
      }
    });

    /* Compteur en temps réel pendant la frappe */
    champMessage.addEventListener('input', function () {
      const val = this.value.trim();
      const zoneErreur = document.getElementById('message-error');

      if (val.length > 0 && val.length < 20 && zoneErreur) {
        /*
           Afficher combien de caractères il reste à écrire.
           20 - val.length → nombre de caractères manquants.
        */
        zoneErreur.textContent = 'Encore ' + (20 - val.length) + ' caractère(s) à écrire.';
        this.classList.add('invalid');
        this.classList.remove('valid');
      } else if (val.length >= 20) {
        /* 20 caractères atteints → vert */
        showSuccess('message');
      }
    });
  }

}


