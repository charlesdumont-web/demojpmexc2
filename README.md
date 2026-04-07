# JPM Ops — Plateforme Opérations IA

Démo interactive pour **JPM Excavation** : une plateforme SaaS intelligente de gestion des comptes fournisseurs et de validation automatisée des factures pour l'industrie de la construction et excavation.

## Fonctionnalités

- **Tableau de bord** — KPIs en temps réel, anomalies actives, volume mensuel
- **Ingestion de factures** — Simulation d'extraction IA (PDF → données structurées)
- **Validation automatique** — Croisement facture vs liste de prix, tickets de livraison, bons de commande
- **Détection d'anomalies** — Écarts de prix, quantités, PO manquants avec niveau de confiance
- **Workflow d'approbation** — Approuver, rejeter, retourner au fournisseur
- **Gestion de projets** — Budget vs dépenses, top fournisseurs, factures par projet
- **Insights IA** — Panneau flottant avec alertes et recommandations intelligentes

## Lancement

Ouvrir `index.html` dans un navigateur. Aucune dépendance, aucun serveur requis.

```bash
# Ou avec un serveur local :
npx serve .
```

## Structure

```
├── index.html   # Shell de l'application (sidebar + contenu)
├── style.css    # Système de design complet
├── app.js       # Routeur, rendu des pages, interactions
├── data.js      # Données simulées réalistes (factures, PO, etc.)
└── README.md
```

## Technologies

- HTML5 / CSS3 / JavaScript (ES6+)
- Aucun framework — 100% vanilla
- Police : Inter (Google Fonts)
- Hébergeable sur GitHub Pages, Netlify, ou tout serveur statique

## Données simulées

- 8 fournisseurs québécois
- 5 projets (commercial, résidentiel, industriel, municipal)
- 15 factures avec statuts variés
- 12 bons de commande
- 20+ listes de prix
- 18 tickets de livraison
- 6 insights IA
