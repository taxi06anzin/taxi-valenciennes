#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 GENERATOR.JS NOUVELLE GÉNÉRATION v2.0');
console.log('⚡ Objectif : Site Ultra-Rapide + Score 100/100 Mobile + SEO 2026\n');

// --- CONFIGURATION GLOBALE ---
const CONFIG = {
  BASE_URL: 'https://taxi-valenciennes.fr',
  PHONE_CALL: '0663039516',
  PHONE_CALL_DISPLAY: '06 63 03 95 16',
  PHONE_WHATSAPP: '0698432710',
  PHONE_WHATSAPP_DISPLAY: '06 98 43 27 10',
  PHONE_WHATSAPP_CLEAN: '698432710',
  CURRENT_YEAR: new Date().getFullYear()
};

function getBaseUrl() {
  // Netlify provides URL (production) and DEPLOY_PRIME_URL (deploy previews).
  const envUrl =
    process.env.BASE_URL ||
    process.env.URL ||
    process.env.DEPLOY_PRIME_URL ||
    process.env.SITE_URL ||
    CONFIG.BASE_URL;
  return String(envUrl).replace(/\/$/, '');
}

function baseJoin(baseUrl, pathPart) {
  if (!pathPart || pathPart === '/' || pathPart === 'index.html') return `${baseUrl}/`;
  return `${baseUrl}/${pathPart.replace(/^\//, '')}`;
}

// --- BASE DE DONNÉES COMMUNES ---
const communes = [
  { nom: 'Anzin', slug: 'anzin', cp: '59410', lat: '50.3717', lon: '3.5075', distance: '52', duree: '42', tarif: '128' },
  { nom: 'Artres', slug: 'artres', cp: '59269', lat: '50.2842', lon: '3.5519', distance: '58', duree: '48', tarif: '138' },
  { nom: 'Aubry-du-Hainaut', slug: 'aubry-du-hainaut', cp: '59494', lat: '50.3247', lon: '3.4472', distance: '56', duree: '46', tarif: '134' },
  { nom: 'Aulnoy-lez-Valenciennes', slug: 'aulnoy-lez-valenciennes', cp: '59300', lat: '50.3303', lon: '3.5347', distance: '53', duree: '43', tarif: '130' },
  { nom: 'Beuvrages', slug: 'beuvrages', cp: '59192', lat: '50.3942', lon: '3.5611', distance: '50', duree: '40', tarif: '125' },
  { nom: 'Bruay-sur-l\'Escaut', slug: 'bruay-sur-escaut', cp: '59860', lat: '50.3981', lon: '3.5397', distance: '51', duree: '41', tarif: '126' },
  { nom: 'Condé-sur-l\'Escaut', slug: 'conde-sur-escaut', cp: '59163', lat: '50.4561', lon: '3.5886', distance: '45', duree: '38', tarif: '120' },
  { nom: 'Crespin', slug: 'crespin', cp: '59154', lat: '50.4094', lon: '3.6608', distance: '48', duree: '39', tarif: '123' },
  { nom: 'Curgies', slug: 'curgies', cp: '59990', lat: '50.3458', lon: '3.6169', distance: '54', duree: '44', tarif: '131' },
  { nom: 'Denain', slug: 'denain', cp: '59220', lat: '50.3297', lon: '3.3931', distance: '58', duree: '48', tarif: '138' },
  { nom: 'Estreux', slug: 'estreux', cp: '59990', lat: '50.2994', lon: '3.5842', distance: '57', duree: '47', tarif: '136' },
  { nom: 'Famars', slug: 'famars', cp: '59300', lat: '50.3189', lon: '3.5186', distance: '54', duree: '44', tarif: '131' },
  { nom: 'Fresnes-sur-Escaut', slug: 'fresnes-sur-escaut', cp: '59970', lat: '50.4369', lon: '3.5806', distance: '46', duree: '38', tarif: '121' },
  { nom: 'Hergnies', slug: 'hergnies', cp: '59199', lat: '50.4683', lon: '3.5358', distance: '44', duree: '37', tarif: '119' },
  { nom: 'Maing', slug: 'maing', cp: '59233', lat: '50.3108', lon: '3.4867', distance: '55', duree: '45', tarif: '133' },
  { nom: 'Marly', slug: 'marly', cp: '59770', lat: '50.3486', lon: '3.5442', distance: '53', duree: '43', tarif: '130' },
  { nom: 'Monchaux-sur-Ecaillon', slug: 'monchaux-sur-ecaillon', cp: '59224', lat: '50.2467', lon: '3.5397', distance: '62', duree: '51', tarif: '144' },
  { nom: 'Odomez', slug: 'odomez', cp: '59970', lat: '50.4517', lon: '3.5636', distance: '46', duree: '38', tarif: '121' },
  { nom: 'Onnaing', slug: 'onnaing', cp: '59264', lat: '50.3864', lon: '3.6017', distance: '51', duree: '41', tarif: '126' },
  { nom: 'Petite-Forêt', slug: 'petite-foret', cp: '59494', lat: '50.3708', lon: '3.4731', distance: '54', duree: '44', tarif: '131' },
  { nom: 'Préseau', slug: 'preseau', cp: '59990', lat: '50.3353', lon: '3.6044', distance: '54', duree: '44', tarif: '131' },
  { nom: 'Prouvy', slug: 'prouvy', cp: '59121', lat: '50.3186', lon: '3.4486', distance: '56', duree: '46', tarif: '134' },
  { nom: 'Quarouble', slug: 'quarouble', cp: '59243', lat: '50.3906', lon: '3.6200', distance: '50', duree: '40', tarif: '125' },
  { nom: 'Quérénaing', slug: 'querenaing', cp: '59269', lat: '50.3264', lon: '3.5922', distance: '53', duree: '43', tarif: '130' },
  { nom: 'Quiévrechain', slug: 'quievrechain', cp: '59920', lat: '50.3922', lon: '3.6686', distance: '49', duree: '40', tarif: '124' },
  { nom: 'Rombies-et-Marchipont', slug: 'rombies-et-marchipont', cp: '59990', lat: '50.3106', lon: '3.6333', distance: '55', duree: '45', tarif: '133' },
  { nom: 'Rouvignies', slug: 'rouvignies', cp: '59220', lat: '50.2925', lon: '3.4508', distance: '58', duree: '48', tarif: '138' },
  { nom: 'Saint-Aybert', slug: 'saint-aybert', cp: '59163', lat: '50.4344', lon: '3.6169', distance: '47', duree: '39', tarif: '122' },
  { nom: 'Saint-Saulve', slug: 'saint-saulve', cp: '59880', lat: '50.3706', lon: '3.5511', distance: '52', duree: '42', tarif: '128' },
  { nom: 'Saultain', slug: 'saultain', cp: '59990', lat: '50.3197', lon: '3.6086', distance: '54', duree: '44', tarif: '131' },
  { nom: 'Sebourg', slug: 'sebourg', cp: '59990', lat: '50.3403', lon: '3.6400', distance: '53', duree: '43', tarif: '130' },
  { nom: 'Thivencelle', slug: 'thivencelle', cp: '59163', lat: '50.4231', lon: '3.6361', distance: '48', duree: '39', tarif: '123' },
  { nom: 'Valenciennes', slug: 'valenciennes', cp: '59300', lat: '50.3584', lon: '3.5233', distance: '53', duree: '43', tarif: '130' },
  { nom: 'Verchain-Maugré', slug: 'verchain-maugre', cp: '59227', lat: '50.2964', lon: '3.4906', distance: '57', duree: '47', tarif: '136' },
  { nom: 'Vicq', slug: 'vicq', cp: '59970', lat: '50.4286', lon: '3.5444', distance: '47', duree: '39', tarif: '122' },
  { nom: 'Vieux-Condé', slug: 'vieux-conde', cp: '59690', lat: '50.4617', lon: '3.5744', distance: '45', duree: '38', tarif: '120' }
];

// --- STRATÉGIE DE CONTENU UNIQUE (5 VARIANTES) ---
const contentVariants = [
  {
    type: 'rassurant',
    h2: (c) => `Transport Médical Serein depuis ${c.nom}`,
    intro: (c) => `Habitants de <strong>${c.nom}</strong>, nous comprenons que les déplacements médicaux nécessitent une attention particulière. Notre service de VSL conventionné a été pensé pour vous apporter tranquillité d'esprit et confort absolu. Depuis votre domicile à ${c.nom} (${c.cp}), nous assurons votre prise en charge intégrale.`,
    benefit: "Accompagnement personnalisé et écoute bienveillante.",
    metaDesc: (c) => `Taxi Conventionné VSL ${c.nom} (${c.cp}) pour transport médical serein vers CHU Lille. Chauffeurs bienveillants et accompagnement personnalisé. Conventionné CPAM 100%.`
  },
  {
    type: 'technique',
    h2: (c) => `Conventionnement CPAM & Tiers Payant à ${c.nom}`,
    intro: (c) => `En tant que transporteur agréé par la Caisse Primaire d'Assurance Maladie, nous garantissons aux résidents de <strong>${c.nom} (${c.cp})</strong> une gestion administrative simplifiée. Grâce à notre lecteur de carte vitale embarqué, la télétransmission est immédiate.`,
    benefit: "Gestion administrative complète : zéro papier à gérer pour vous.",
    metaDesc: (c) => `Taxi Conventionné VSL Agréé CPAM ${c.nom} : Tiers payant intégral et télétransmission directe. Transport médical sans avance de frais pour ALD depuis ${c.nom}.`
  },
  {
    type: 'pratique',
    h2: (c) => `Ponctualité et Efficacité au départ de ${c.nom}`,
    intro: (c) => `Le temps est précieux, surtout lors de rendez-vous médicaux. Depuis <strong>${c.nom}</strong>, nos chauffeurs empruntent les itinéraires les plus fluides pour rejoindre les centres hospitaliers de la région. Nous nous engageons sur une ponctualité irréprochable.`,
    benefit: "Trajets optimisés et respect strict des horaires de convocation.",
    metaDesc: (c) => `Taxi Conventionné VSL médical ${c.nom} : Ponctualité garantie pour vos rendez-vous hôpital. Trajet direct et rapide depuis ${c.nom} (${c.cp}). Conventionné Sécu.`
  },
  {
    type: 'local',
    h2: (c) => `Votre Taxi Conventionné VSL de Référence à ${c.nom}`,
    intro: (c) => `Ancrés localement, nous connaissons parfaitement <strong>${c.nom}</strong> et ses environs (${c.cp}). Cette expertise du terrain nous permet de vous récupérer rapidement, que vous habitiez en centre-ville ou dans les quartiers résidentiels périphériques.`,
    benefit: "Une connaissance parfaite de votre secteur géographique.",
    metaDesc: (c) => `Taxi Conventionné VSL de proximité : Service basé près de ${c.nom}. Connaissance parfaite du secteur ${c.cp} pour un ramassage rapide vers les hôpitaux.`
  },
  {
    type: 'professionnel',
    h2: (c) => `Transport Sanitaire VSL de Haute Qualité depuis ${c.nom}`,
    intro: (c) => `Exigez le meilleur pour votre santé. Au départ de <strong>${c.nom}</strong>, nous mettons à votre disposition une flotte de véhicules récents, climatisés et désinfectés après chaque course. Nos chauffeurs sont formés aux premiers secours.`,
    benefit: "Confort premium et hygiène irréprochable garantis.",
    metaDesc: (c) => `Taxi Conventionné VSL transport médical haut de gamme depuis ${c.nom}. Véhicules confortables et désinfectés. Chauffeurs formés. Prise en charge CPAM 100%.`
  }
];

// --- CHARGEMENT DES TEMPLATES ---
function loadTemplates() {
  const templatesPath = path.join(__dirname, 'templates');
  const sharedPath = path.join(templatesPath, 'shared');
  
  return {
    base: fs.readFileSync(path.join(templatesPath, 'base.html'), 'utf8'),
    header: fs.readFileSync(path.join(sharedPath, 'header.html'), 'utf8'),
    navigation: fs.readFileSync(path.join(sharedPath, 'navigation.html'), 'utf8'),
    footer: fs.readFileSync(path.join(sharedPath, 'footer.html'), 'utf8'),
    stickyCta: fs.readFileSync(path.join(sharedPath, 'sticky-cta.html'), 'utf8')
  };
}

// --- COPIE DES ASSETS ---
function copyAssets() {
  const assetsPath = path.join(__dirname, 'assets');
  const publicPath = path.join(__dirname, 'public');
  
  if (!fs.existsSync(publicPath)) {
    fs.mkdirSync(publicPath, { recursive: true });
  }

  // Copie CSS
  fs.copyFileSync(
    path.join(assetsPath, 'style.css'), 
    path.join(publicPath, 'style.css')
  );
  
  // Copie JS
  fs.copyFileSync(
    path.join(assetsPath, 'script.js'), 
    path.join(publicPath, 'script.js')
  );
  
  console.log('✅ Assets (CSS/JS) copiés avec succès.');
}

function cleanPublicDir() {
  const publicPath = path.join(__dirname, 'public');
  if (!fs.existsSync(publicPath)) fs.mkdirSync(publicPath, { recursive: true });
  for (const entry of fs.readdirSync(publicPath)) {
    if (entry.endsWith('.html')) {
      fs.unlinkSync(path.join(publicPath, entry));
    }
  }
}

// --- GÉNÉRATION DU SCHEMA JSON-LD ---
function generateSchemaLocalBusiness(baseUrl, commune, canonicalPath) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Taxi Conventionné VSL ${commune.nom}`,
    "telephone": `+33${CONFIG.PHONE_CALL.substring(1)}`,
    "url": baseJoin(baseUrl, canonicalPath),
    "email": "contact@taxi-valenciennes.fr",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": commune.nom,
      "postalCode": commune.cp,
      "addressRegion": "Hauts-de-France",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": commune.lat,
      "longitude": commune.lon
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "07:00",
        "closes": "18:00"
      }
    ],
    "priceRange": "€€",
    "serviceType": ["Taxi", "VSL Transport médical conventionné CPAM", "Transfert aéroport", "Transport professionnel"],
    "areaServed": `${commune.nom} et environs`
  }, null, 0);
}

// --- GÉNÉRATION DU CONTENU D'UNE PAGE COMMUNE ---
function generateCommuneContent(commune, variant) {
  const tempsEstime = parseInt(commune.duree) + 5;
  const whatsappMsg = encodeURIComponent(`Bonjour, je souhaite réserver un taxi VSL depuis ${commune.nom}.`);
  
  const voisines = communes
    .filter(c => c.slug !== commune.slug)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  return `
  <section class="hero">
    <div class="container hero-content">
      <div class="hero-text">
        <h1>Taxi Conventionné VSL ${commune.nom}</h1>
        <p>Transport médical assis agréé CPAM, disponible pour ${commune.nom} (${commune.cp}) et toute la métropole valenciennoise.</p>
        <div class="hero-badges">
          <div class="badge">Agréé CPAM</div>
          <div class="badge">Tiers Payant</div>
          <div class="badge">Ponctuel 24/7*</div>
          <div class="badge">Zéro Avance</div>
        </div>
      </div>
      <div class="booking-panel">
        <h3>Réservation rapide</h3>
        <div class="booking-row">
          <div class="booking-item">📍 Départ : ${commune.nom} (${commune.cp})</div>
          <div class="booking-item">🏥 Destination : CHU Lille / Clinique</div>
          <div class="booking-item">⏱️ Estimation : ~${tempsEstime} min</div>
        </div>
        <div class="booking-cta">
          <a href="tel:${CONFIG.PHONE_CALL}" class="btn-primary">📞 Appeler ${CONFIG.PHONE_CALL_DISPLAY}</a>
          <a href="https://wa.me/33${CONFIG.PHONE_WHATSAPP_CLEAN}?text=${whatsappMsg}" class="btn-secondary">💬 WhatsApp</a>
        </div>
        <div class="booking-item">⚠️ Nuit/Week-end : réservation 24h à l’avance.</div>
      </div>
    </div>
  </section>

  <section class="trust-strip">
    <div class="container trust-list">
      <div>✅ Conventionné CPAM</div>
      <div>🚗 Véhicules premium</div>
      <div>⏱️ Ponctualité garantie</div>
      <div>⭐ Service privé</div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2 class="section-title">${variant.h2(commune)}</h2>
      <p class="section-subtitle">${variant.intro(commune)}</p>

      <div class="cards">
        <div class="card">
          <h3>CHU Lille (Huriez / Salengro)</h3>
          <div class="price-tag">${commune.tarif}€</div>
          <p>Aller-retour estimatif • ~${tempsEstime} min</p>
          <div class="chip">✅ 100% remboursé ALD</div>
        </div>
        <div class="card">
          <h3>Centre Oscar Lambret</h3>
          <div class="price-tag">${commune.tarif}€</div>
          <p>Aller-retour estimatif • ~${tempsEstime} min</p>
          <div class="chip">✅ 100% remboursé ALD</div>
        </div>
        <div class="card">
          <h3>Transport privé</h3>
          <p>Déplacements professionnels et particuliers, longue distance ou gare/aéroport.</p>
          <div class="chip">Service premium</div>
        </div>
      </div>
    </div>
  </section>

  <section class="cta-bar">
    <div class="container cta-inner">
      <div>
        <strong>Besoin d’un taxi maintenant ?</strong><br>
        Service 7j/7 – réservation obligatoire la nuit et le week-end.
      </div>
      <div class="cta-actions">
        <a href="tel:${CONFIG.PHONE_CALL}" class="btn-call">📞 ${CONFIG.PHONE_CALL_DISPLAY}</a>
        <a href="https://wa.me/33${CONFIG.PHONE_WHATSAPP_CLEAN}" class="btn-whatsapp">💬 WhatsApp</a>
      </div>
    </div>
  </section>
  `;
}

// --- GÉNÉRATION D'UNE PAGE COMMUNE COMPLÈTE ---
function generateCommunePage(baseUrl, commune, index, templates) {
  const variant = contentVariants[index % contentVariants.length];
  const canonicalPath = `taxi-conventionne-${commune.slug}.html`;
  const pageUrl = baseJoin(baseUrl, canonicalPath);
  
  // Remplacement des variables dans les templates
  const header = templates.header
    .replace(/{{PHONE_CALL}}/g, CONFIG.PHONE_CALL)
    .replace(/{{PHONE_DISPLAY}}/g, CONFIG.PHONE_CALL_DISPLAY)
    .replace(/{{PHONE_WHATSAPP_CLEAN}}/g, CONFIG.PHONE_WHATSAPP_CLEAN);
    
  const footer = templates.footer
    .replace(/{{COMMUNE_NOM}}/g, commune.nom)
    .replace(/{{PHONE_CALL}}/g, CONFIG.PHONE_CALL)
    .replace(/{{PHONE_DISPLAY}}/g, CONFIG.PHONE_CALL_DISPLAY)
    .replace(/{{PHONE_WHATSAPP_CLEAN}}/g, CONFIG.PHONE_WHATSAPP_CLEAN)
    .replace(/{{PHONE_WHATSAPP_DISPLAY}}/g, CONFIG.PHONE_WHATSAPP_DISPLAY);
    
  const stickyCta = templates.stickyCta
    .replace(/{{PHONE_CALL}}/g, CONFIG.PHONE_CALL);
  
  // Génération du HTML final
  let html = templates.base
    .replace('{{TITLE}}', `Taxi Conventionné VSL ${commune.nom} ${commune.cp} | Transport Médical CPAM 100%`)
    .replace('{{DESCRIPTION}}', variant.metaDesc(commune))
    .replace('{{CANONICAL_URL}}', pageUrl)
    .replace('{{OG_TITLE}}', `Taxi Conventionné VSL ${commune.nom} - Agréé CPAM`)
    .replace('{{OG_DESCRIPTION}}', `Transport médical assis professionnalisé depuis ${commune.nom}. Tiers payant intégral.`)
    .replace('{{SCHEMA_JSON}}', generateSchemaLocalBusiness(baseUrl, commune, canonicalPath))
    .replace('{{HEADER}}', header)
    .replace('{{NAVIGATION}}', templates.navigation)
    .replace('{{CONTENT}}', generateCommuneContent(commune, variant))
    .replace('{{FOOTER}}', footer)
    .replace('{{STICKY_CTA}}', stickyCta)
    .replace('{{JAVASCRIPT}}', `<script src="script.js" defer></script>`);
  
  // HTML non minifié pour le debug
  return html;
}

// --- GÉNÉRATION DU SITEMAP.XML ---
function generateSitemap(baseUrl) {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${baseJoin(baseUrl, 'index.html')}</loc><priority>1.0</priority><changefreq>weekly</changefreq></url>
  <url><loc>${baseJoin(baseUrl, 'contact-taxi-valenciennes-reservation-24h-24.html')}</loc><priority>0.9</priority></url>
  <url><loc>${baseJoin(baseUrl, 'taxi-valenciennes-tarif.html')}</loc><priority>0.8</priority></url>
  <url><loc>${baseJoin(baseUrl, 'taxi-aeroport-valenciennes-lille-charleroi-bruxelles.html')}</loc><priority>0.8</priority></url>
  <url><loc>${baseJoin(baseUrl, 'taxi-conventionne-valenciennes-transport-cpam-100.html')}</loc><priority>0.9</priority></url>
`;

  communes.forEach(commune => {
    sitemap += `  <url>
    <loc>${baseJoin(baseUrl, `taxi-conventionne-${commune.slug}.html`)}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.9</priority>
  </url>
`;
  });

  sitemap += `</urlset>`;
  return sitemap;
}

function generateRobotsTxt(baseUrl) {
  return `User-agent: *\nAllow: /\nSitemap: ${baseJoin(baseUrl, 'sitemap.xml')}\n`;
}

function renderPage(baseUrl, templates, { canonicalPath, title, description, ogTitle, ogDescription, schemaJson, contentHtml, communeNom }) {
  const header = templates.header
    .replace(/{{PHONE_CALL}}/g, CONFIG.PHONE_CALL)
    .replace(/{{PHONE_DISPLAY}}/g, CONFIG.PHONE_CALL_DISPLAY)
    .replace(/{{PHONE_WHATSAPP_CLEAN}}/g, CONFIG.PHONE_WHATSAPP_CLEAN);

  const footer = templates.footer
    .replace(/{{COMMUNE_NOM}}/g, communeNom || 'Valenciennes')
    .replace(/{{PHONE_CALL}}/g, CONFIG.PHONE_CALL)
    .replace(/{{PHONE_DISPLAY}}/g, CONFIG.PHONE_CALL_DISPLAY)
    .replace(/{{PHONE_WHATSAPP_CLEAN}}/g, CONFIG.PHONE_WHATSAPP_CLEAN)
    .replace(/{{PHONE_WHATSAPP_DISPLAY}}/g, CONFIG.PHONE_WHATSAPP_DISPLAY);

  const pageUrl = baseJoin(baseUrl, canonicalPath);

  return templates.base
    .replace('{{TITLE}}', title)
    .replace('{{DESCRIPTION}}', description)
    .replace('{{CANONICAL_URL}}', pageUrl)
    .replace('{{OG_TITLE}}', ogTitle || title)
    .replace('{{OG_DESCRIPTION}}', ogDescription || description)
    .replace('{{SCHEMA_JSON}}', schemaJson)
    .replace('{{HEADER}}', header)
    .replace('{{NAVIGATION}}', templates.navigation)
    .replace('{{CONTENT}}', contentHtml)
    .replace('{{FOOTER}}', footer)
    .replace('{{STICKY_CTA}}', templates.stickyCta)
    .replace('{{JAVASCRIPT}}', `<script src="script.js" defer></script>`);
}

function pageHero({ title, subtitle, primaryLabel }) {
  return `
  <section class="hero">
    <div class="container hero-content">
      <div class="hero-text">
        <h1>${title}</h1>
        <p>${subtitle}</p>
        <div class="hero-badges">
          <div class="badge">Agréé CPAM</div>
          <div class="badge">Tiers Payant</div>
          <div class="badge">Particuliers & Pros</div>
          <div class="badge">Réponse rapide</div>
        </div>
      </div>
      <div class="booking-panel">
        <h3>${primaryLabel}</h3>
        <div class="booking-row">
          <div class="booking-item">📞 Appel prioritaire : ${CONFIG.PHONE_CALL_DISPLAY}</div>
          <div class="booking-item">💬 WhatsApp : ${CONFIG.PHONE_WHATSAPP_DISPLAY}</div>
          <div class="booking-item">⚠️ Nuit/Week-end : réservation 24h à l’avance.</div>
        </div>
        <div class="booking-cta">
          <a href="tel:${CONFIG.PHONE_CALL}" class="btn-primary">📞 Appeler maintenant</a>
          <a href="https://wa.me/33${CONFIG.PHONE_WHATSAPP_CLEAN}" class="btn-secondary">💬 WhatsApp</a>
        </div>
      </div>
    </div>
  </section>`;
}

// --- EXÉCUTION PRINCIPALE ---
async function main() {
  try {
    const baseUrl = getBaseUrl();
    console.log('📂 Chargement des templates...');
    const templates = loadTemplates();
    
    console.log('🧹 Nettoyage public (HTML)…');
    cleanPublicDir();

    console.log('📦 Copie des assets...');
    copyAssets();
    
    console.log('🏗️  Génération des pages HTML...');
    let createdCount = 0;

    // Pages principales (unifiées)
    const valenciennes = { nom: 'Valenciennes', cp: '59300', lat: '50.3584', lon: '3.5233', slug: 'valenciennes' };
    const schemaHome = generateSchemaLocalBusiness(baseUrl, valenciennes, 'index.html');

    const homeHtml = renderPage(baseUrl, templates, {
      canonicalPath: 'index.html',
      title: `Taxi Valenciennes | Taxi Conventionné VSL CPAM + Transport Privé | ${CONFIG.PHONE_CALL_DISPLAY}`,
      description: `Taxi à Valenciennes : VSL conventionné CPAM (ALD), trajets particuliers & professionnels, gare/aéroport. Appel ${CONFIG.PHONE_CALL_DISPLAY} (WhatsApp ${CONFIG.PHONE_WHATSAPP_DISPLAY}).`,
      ogTitle: `Taxi Valenciennes - Taxi Conventionné VSL CPAM`,
      ogDescription: `VSL CPAM + taxi privé à Valenciennes. Appel ${CONFIG.PHONE_CALL_DISPLAY}. Réservation nuit/week-end 24h avant.`,
      schemaJson: schemaHome,
      communeNom: 'Valenciennes',
      contentHtml: `
        ${pageHero({
          title: `Taxi Valenciennes & VSL Conventionné`,
          subtitle: `Transport médical CPAM (ALD) + taxi privé (particuliers & professionnels).`,
          primaryLabel: `Réserver en 30 secondes`
        })}
        <section class="trust-strip"><div class="container trust-list">
          <div>✅ Conventionné CPAM</div><div>🚗 Confort premium</div><div>⏱️ Ponctualité</div><div>🧾 Devis rapide</div>
        </div></section>
        <section class="section"><div class="container">
          <h2 class="section-title">Services</h2>
          <p class="section-subtitle">Transport VSL, taxi privé, pro, gare & aéroports.</p>
          <div class="cards">
            <div class="card"><h3>VSL Conventionné CPAM</h3><p>ALD, hôpital, examens. Tiers payant selon prescription.</p></div>
            <div class="card"><h3>Taxi Particulier</h3><p>Déplacements du quotidien, soirées, longue distance (sur réservation).</p></div>
            <div class="card"><h3>Taxi Professionnel</h3><p>Entreprises, rendez-vous, gares, prise en charge fiable.</p></div>
          </div>
        </div></section>
        <section class="cta-bar"><div class="container cta-inner">
          <div><strong>Besoin d’un taxi maintenant ?</strong><br>Appel prioritaire : ${CONFIG.PHONE_CALL_DISPLAY}</div>
          <div class="cta-actions">
            <a href="tel:${CONFIG.PHONE_CALL}" class="btn-call">📞 ${CONFIG.PHONE_CALL_DISPLAY}</a>
            <a href="https://wa.me/33${CONFIG.PHONE_WHATSAPP_CLEAN}" class="btn-whatsapp">💬 WhatsApp</a>
          </div>
        </div></section>
      `
    });
    fs.writeFileSync(path.join(__dirname, 'public', 'index.html'), homeHtml);

    const contactSchema = generateSchemaLocalBusiness(baseUrl, valenciennes, 'contact-taxi-valenciennes-reservation-24h-24.html');
    const contactHtml = renderPage(baseUrl, templates, {
      canonicalPath: 'contact-taxi-valenciennes-reservation-24h-24.html',
      title: `Réserver Taxi Valenciennes | Taxi Conventionné VSL CPAM | ${CONFIG.PHONE_CALL_DISPLAY}`,
      description: `Réservation taxi & VSL à Valenciennes : appelez ${CONFIG.PHONE_CALL_DISPLAY} ou WhatsApp ${CONFIG.PHONE_WHATSAPP_DISPLAY}. Nuit/week-end : réservation 24h à l’avance.`,
      schemaJson: contactSchema,
      communeNom: 'Valenciennes',
      contentHtml: `
        ${pageHero({
          title: `Réserver un taxi / VSL`,
          subtitle: `Choisissez Appel (prioritaire) ou WhatsApp. Nuit/week-end : réservation 24h avant.`,
          primaryLabel: `Réservation`
        })}
        <section class="section"><div class="container">
          <h2 class="section-title">Formulaire (WhatsApp)</h2>
          <p class="section-subtitle">Envoi en 1 clic vers WhatsApp — réponse rapide.</p>
          <form class="card" data-whatsapp-form data-whatsapp-phone="33${CONFIG.PHONE_WHATSAPP_CLEAN}">
            <div class="cards" style="grid-template-columns: 1fr 1fr;">
              <div class="booking-item"><label>Nom<br><input name="nom" style="width:100%;padding:10px;border:1px solid #e6e8ec;border-radius:10px;"></label></div>
              <div class="booking-item"><label>Téléphone<br><input name="telephone" style="width:100%;padding:10px;border:1px solid #e6e8ec;border-radius:10px;"></label></div>
              <div class="booking-item"><label>Type<br>
                <select name="type" style="width:100%;padding:10px;border:1px solid #e6e8ec;border-radius:10px;">
                  <option>Taxi</option><option>Taxi Conventionné VSL</option><option>Transport Pro</option><option>Aéroport / Gare</option>
                </select></label></div>
              <div class="booking-item"><label>Date<br><input type="date" name="date" style="width:100%;padding:10px;border:1px solid #e6e8ec;border-radius:10px;"></label></div>
              <div class="booking-item"><label>Heure<br><input type="time" name="heure" style="width:100%;padding:10px;border:1px solid #e6e8ec;border-radius:10px;"></label></div>
              <div class="booking-item"><label>Départ<br><input name="depart" style="width:100%;padding:10px;border:1px solid #e6e8ec;border-radius:10px;"></label></div>
              <div class="booking-item" style="grid-column: 1 / -1;"><label>Destination<br><input name="destination" style="width:100%;padding:10px;border:1px solid #e6e8ec;border-radius:10px;"></label></div>
              <div class="booking-item" style="grid-column: 1 / -1;"><label>Infos (optionnel)<br><textarea name="notes" style="width:100%;padding:10px;border:1px solid #e6e8ec;border-radius:10px;min-height:90px;"></textarea></label></div>
            </div>
            <div style="margin-top:14px;display:flex;gap:12px;flex-wrap:wrap;">
              <button type="submit" class="btn-primary" style="border:none;cursor:pointer;">💬 Envoyer sur WhatsApp</button>
              <a href="tel:${CONFIG.PHONE_CALL}" class="btn-secondary">📞 Appel prioritaire</a>
            </div>
          </form>
        </div></section>
      `
    });
    fs.writeFileSync(path.join(__dirname, 'public', 'contact-taxi-valenciennes-reservation-24h-24.html'), contactHtml);

    const tarifsSchema = generateSchemaLocalBusiness(baseUrl, valenciennes, 'taxi-valenciennes-tarif.html');
    const tarifsHtml = renderPage(baseUrl, templates, {
      canonicalPath: 'taxi-valenciennes-tarif.html',
      title: `Tarifs Taxi Valenciennes | Taxi Conventionné VSL CPAM | ${CONFIG.PHONE_CALL_DISPLAY}`,
      description: `Tarifs taxi à Valenciennes : estimations CHU Lille, Oscar Lambret, gare/aéroport. Appel ${CONFIG.PHONE_CALL_DISPLAY}.`,
      schemaJson: tarifsSchema,
      communeNom: 'Valenciennes',
      contentHtml: `
        ${pageHero({ title:`Tarifs & estimations`, subtitle:`Transparence : compteur fait foi. ALD : 100% CPAM selon prescription.`, primaryLabel:`Demander un devis` })}
        <section class="section"><div class="container">
          <h2 class="section-title">Estimations courantes</h2>
          <p class="section-subtitle">Ces montants sont indicatifs. Pour un devis exact : appelez.</p>
          <div class="cards">
            <div class="card"><h3>Valenciennes ↔ CHU Lille</h3><div class="price-tag">≈ 130€</div><p>Aller-retour estimatif</p><div class="chip">✅ ALD possible</div></div>
            <div class="card"><h3>Valenciennes ↔ Oscar Lambret</h3><div class="price-tag">≈ 130€</div><p>Aller-retour estimatif</p><div class="chip">✅ ALD possible</div></div>
            <div class="card"><h3>Gare / Aéroport</h3><p>Forfait/estimation selon distance, horaire et trafic.</p><div class="chip">Devis rapide</div></div>
          </div>
        </div></section>
      `
    });
    fs.writeFileSync(path.join(__dirname, 'public', 'taxi-valenciennes-tarif.html'), tarifsHtml);

    const aeroportSchema = generateSchemaLocalBusiness(baseUrl, valenciennes, 'taxi-aeroport-valenciennes-lille-charleroi-bruxelles.html');
    const aeroportHtml = renderPage(baseUrl, templates, {
      canonicalPath: 'taxi-aeroport-valenciennes-lille-charleroi-bruxelles.html',
      title: `Taxi Aéroport Valenciennes | Lille, Charleroi, Bruxelles | ${CONFIG.PHONE_CALL_DISPLAY}`,
      description: `Transferts aéroports depuis Valenciennes : Lille-Lesquin, Charleroi, Bruxelles. Appel ${CONFIG.PHONE_CALL_DISPLAY}.`,
      schemaJson: aeroportSchema,
      communeNom: 'Valenciennes',
      contentHtml: `
        ${pageHero({ title:`Transferts Aéroports`, subtitle:`Départs tôt / retours tard : organisation fiable (réservation conseillée).`, primaryLabel:`Réserver un transfert` })}
        <section class="section"><div class="container">
          <h2 class="section-title">Destinations</h2>
          <p class="section-subtitle">Lille-Lesquin • Charleroi • Bruxelles • Paris</p>
          <div class="cards">
            <div class="card"><h3>Lille-Lesquin</h3><p>Prise en charge à Valenciennes et environs.</p><div class="chip">Ponctuel</div></div>
            <div class="card"><h3>Charleroi</h3><p>Longue distance sur réservation.</p><div class="chip">Devis</div></div>
            <div class="card"><h3>Bruxelles</h3><p>Chauffeur privé & confort premium.</p><div class="chip">Pro</div></div>
          </div>
        </div></section>
      `
    });
    fs.writeFileSync(path.join(__dirname, 'public', 'taxi-aeroport-valenciennes-lille-charleroi-bruxelles.html'), aeroportHtml);

    const cpamSchema = generateSchemaLocalBusiness(baseUrl, valenciennes, 'taxi-conventionne-valenciennes-transport-cpam-100.html');
    const cpamHtml = renderPage(baseUrl, templates, {
      canonicalPath: 'taxi-conventionne-valenciennes-transport-cpam-100.html',
      title: `Taxi Conventionné VSL Valenciennes | CPAM ALD | ${CONFIG.PHONE_CALL_DISPLAY}`,
      description: `Taxi conventionné VSL à Valenciennes : ALD, consultations, examens. Tiers payant selon prescription. Appel ${CONFIG.PHONE_CALL_DISPLAY}.`,
      schemaJson: cpamSchema,
      communeNom: 'Valenciennes',
      contentHtml: `
        ${pageHero({ title:`VSL Conventionné CPAM`, subtitle:`Transport médical assis – tiers payant selon prescription et droits.`, primaryLabel:`Réserver un VSL` })}
        <section class="section"><div class="container">
          <h2 class="section-title">Prise en charge</h2>
          <p class="section-subtitle">ALD • Hospitalisation • HDJ • Dialyse • Chimiothérapie (sur prescription).</p>
          <div class="cards">
            <div class="card"><h3>ALD Exonérante</h3><p>Prise en charge possible à 100% CPAM.</p><div class="chip">Zéro avance*</div></div>
            <div class="card"><h3>Non‑ALD</h3><p>Remboursement selon droits CPAM + mutuelle.</p><div class="chip">Sur dossier</div></div>
            <div class="card"><h3>Documents</h3><p>Bon de transport + carte Vitale + attestation droits.</p><div class="chip">Simple</div></div>
          </div>
          <p class="section-subtitle" style="margin-top:14px;">*Selon situation et justificatifs. Confirmation par téléphone.</p>
        </div></section>
      `
    });
    fs.writeFileSync(path.join(__dirname, 'public', 'taxi-conventionne-valenciennes-transport-cpam-100.html'), cpamHtml);
    
    // Génération des pages communes
    communes.forEach((commune, index) => {
      try {
        const html = generateCommunePage(baseUrl, commune, index, templates);
        const filename = path.join(__dirname, 'public', `taxi-conventionne-${commune.slug}.html`);
        fs.writeFileSync(filename, html);
        createdCount++;
        
        if (createdCount % 10 === 0) {
          console.log(`   ✅ ${createdCount}/${communes.length} pages générées...`);
        }
      } catch (err) {
        console.error(`❌ Erreur sur ${commune.nom}:`, err.message);
      }
    });
    
    console.log(`✅ ${createdCount} pages communes créées avec succès.`);
    
    // Génération du sitemap
    console.log('🗺️  Génération du Sitemap XML...');
    const sitemap = generateSitemap(baseUrl);
    fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml'), sitemap);
    console.log('✅ sitemap.xml généré.');

    // robots.txt (base URL cohérent)
    fs.writeFileSync(path.join(__dirname, 'public', 'robots.txt'), generateRobotsTxt(baseUrl));
    console.log('✅ robots.txt généré.');
    
    // Statistiques finales
    const totalFiles = fs.readdirSync(path.join(__dirname, 'public')).length;
    console.log(`\n🎉 GÉNÉRATION TERMINÉE !`);
    console.log(`📊 Statistiques :`);
    console.log(`   • ${createdCount} pages communes générées`);
    console.log(`   • 1 sitemap.xml créé`);
    console.log(`   • ${totalFiles} fichiers au total dans /public`);
    console.log(`   • Assets copiés (style.css, script.js)`);
    console.log(`   • HTML propre et lisible`);
    console.log(`\n🚀 Site prêt pour production !`);
    
  } catch (error) {
    console.error('❌ Erreur fatale:', error);
    process.exit(1);
  }
}

// Lancement du générateur
main();