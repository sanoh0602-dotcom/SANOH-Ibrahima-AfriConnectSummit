# AfriConnect Summit 2027 🌍

> Site vitrine d'une conférence tech fictive panafricaine — Examen Technologie Web L1 — ISI 2026

---

## 📌 Informations

| Élément       | Détail                                         |
| ------------- | ---------------------------------------------- |
| **Projet**    | AfriConnect Summit 2027 — Site vitrine complet |
| **Étudiant**  | SANOH Ibrahima                                 |
| **Classe**    | [TA CLASSE]                                    |
| **Encadrant** | Robert DIASSÉ                                  |
| **École**     | ISI (Institut Supérieur d'Informatique)        |
| **Date**      | Juillet 2026                                   |

---

## 🌐 Lien GitHub Pages

**[Voir le site en ligne](https://sanoh0602-dotcom.github.io/SANOH-Ibrahima-AfriConnectSummit/)**

---

## 📖 Description du projet

L'Afrique francophone accueille chaque année des centaines de conférences tech et de sommets économiques. AfriConnect Summit est un événement annuel fictif panafricain qui réunit développeurs, entrepreneurs et investisseurs du continent.

Ce site vitrine présente la conférence, son programme sur 3 jours, ses 9 intervenants et permet l'inscription en ligne.

---

## 📄 Pages du site

| Page         | Fichier             | Contenu                                                                    |
| ------------ | ------------------- | -------------------------------------------------------------------------- |
| Accueil      | `index.html`        | Hero + compte à rebours + chiffres clés + intervenants vedettes + sponsors |
| Programme    | `programme.html`    | Onglets 3 jours + tableaux sessions + thématiques                          |
| Intervenants | `intervenants.html` | Filtrage dynamique + 9 profils                                             |
| Contact      | `contact.html`      | Formulaire inscription + FAQ CSS pur + Google Maps                         |

---

## 🛠️ Technologies utilisées

- **HTML5** — Structure sémantique (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- **CSS3** — Flexbox, CSS Grid, variables CSS, animations, transitions, responsive design
- **JavaScript Vanilla** — Aucun framework, aucune bibliothèque
- **Bootstrap Icons** — Icônes via CDN
- **Google Fonts** — Syne (titres) + Inter (corps)
- **Git & GitHub Pages** — Versioning + déploiement

---

## ⚡ Fonctionnalités JavaScript

| #   | Fonctionnalité            | Description                                              |
| --- | ------------------------- | -------------------------------------------------------- |
| 1   | **Dark mode**             | Toggle lune/soleil, thème sauvegardé dans `localStorage` |
| 2   | **Navbar dynamique**      | Changement de style après 80px de scroll                 |
| 3   | **Menu hamburger**        | Ouverture/fermeture sur mobile                           |
| 4   | **Compte à rebours**      | Temps réel jusqu'au 15 mars 2027 avec `setInterval`      |
| 5   | **Compteurs animés**      | `IntersectionObserver` déclenche l'animation au scroll   |
| 6   | **Animations fade-in**    | Sections apparaissent progressivement au scroll          |
| 7   | **Onglets programme**     | Affichage des 3 jours sans rechargement                  |
| 8   | **Filtrage intervenants** | Par thématique sans rechargement de page                 |
| 9   | **Validation formulaire** | Email regex, téléphone 8 chiffres, message 20 carac. min |
| 10  | **Bouton retour en haut** | Apparaît après 300px, scroll smooth                      |
| 11  | **Année dynamique**       | `new Date().getFullYear()` dans tous les footers         |

## 🎨 Choix de design

### Palette de couleurs (max 4 couleurs)

| Variable             | Couleur                 | Usage                    |
| -------------------- | ----------------------- | ------------------------ |
| `--color-primary`    | `#10b981` vert émeraude | Boutons, icônes, accents |
| `--color-secondary`  | `#0f172a` bleu nuit     | Navbar, footer, hero     |
| `--color-background` | `#f8fafc` blanc cassé   | Fond de page             |
| `--color-text`       | `#1e293b` quasi-noir    | Texte principal          |

### Typographie

- **Syne 800** → titres expressifs et impactants
- **Inter 400/500/600** → corps de texte lisible

## 📁 Structure du projet

SANOH-Ibrahima-AfriConnectSummit/
├── index.html
├── programme.html
├── intervenants.html
├── contact.html
├── css/
│ └── style.css
├── js/
│ └── main.js
├── images/
│ └── (photos libres Unsplash & Pexels)
└── README.md

```


## 🔧 Contraintes techniques respectées

- ✅ HTML5 sémantique
- ✅ Un seul fichier CSS externe (`css/style.css`)
- ✅ 16 variables CSS dans `:root` (minimum 8 requis)
- ✅ Flexbox — 9 usages distincts (minimum 3 requis)
- ✅ CSS Grid — 4 usages distincts (minimum 2 requis)
- ✅ 2 Google Fonts importées et appliquées
- ✅ Responsive : 375px / 768px / 1200px+
- ✅ Bootstrap Icons via CDN
- ✅ Attribut `alt` sur toutes les images
- ✅ Code commenté (HTML, CSS, JavaScript)
- ✅ Transitions CSS sur tous les éléments interactifs
- ✅ Accordéon FAQ en CSS pur (`<details>` + `<summary>`)
- ✅ Dark mode via `[data-theme="dark"]`
- ✅ JavaScript Vanilla pur (ni jQuery, ni framework)
- ✅ Aucun CSS inline dans le HTML



## 📚 Ressources consultées

| Ressource | URL |
|---|---|
| MDN Web Docs | https://developer.mozilla.org/fr/ |
| W3Schools | https://www.w3schools.com/ |
| CSS-Tricks | https://css-tricks.com/ |
| Google Fonts | https://fonts.google.com/ |
| Bootstrap Icons | https://icons.getbootstrap.com/ |
| Unsplash | https://unsplash.com/ |
| Pexels | https://www.pexels.com/fr-fr/ |
| Coolors | https://coolors.co/ |
| W3C Validator | https://validator.w3.org/ |
| Git Documentation | https://git-scm.com/doc |

---

## 🚀 Lancer le projet en local

# Cloner le dépôt
git clone https://github.com/sanoh0602-dotcom/SANOH-Ibrahima-AfriConnectSummit.git

# Entrer dans le dossier
cd SANOH-Ibrahima-AfriConnectSummit

# Ouvrir index.html dans le navigateur
# ou utiliser l'extension Live Server dans VS Code

*Projet réalisé dans le cadre de l'examen Technologie Web L1 — ISI — Juillet 2026*
```
