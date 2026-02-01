# 🚀 Instructions de Déploiement - Taxi Valenciennes

Le projet a été mis à jour avec un script de production optimisé pour le SEO.

## 1. Prérequis
Assurez-vous d'avoir Node.js installé sur votre machine.

## 2. Génération du Site
Le nouveau script `generate-prod.cjs` remplace les anciens scripts. Il génère :
- Les pages HTML pour chaque commune avec contenu unique.
- Le fichier `sitemap.xml` complet.
- Les balises SEO (Canonical, Schema.org, OpenGraph).

Pour générer le site, ouvrez un terminal dans le dossier `project` et lancez :

```bash
cd project
node generate-prod.cjs
```

## 3. Vérification
Une fois le script exécuté :
1. Vérifiez le dossier `public/`.
2. Ouvrez `public/sitemap.xml` pour confirmer qu'il contient bien toutes les URLs.
3. Ouvrez une page commune (ex: `public/taxi-conventionne-anzin.html`) pour vérifier les numéros de téléphone et le bloc "Disponibilité".

## 4. Déploiement
Le contenu du dossier `public` est prêt à être mis en ligne (FTP, Vercel, Netlify, etc.).
