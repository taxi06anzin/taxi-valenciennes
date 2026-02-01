const fs = require('fs');
const cities = require('./src/data/cities.json');

let redirects = '';

// Canonical redirects for cities
cities.forEach(city => {
    if (city.oldUrl) {
        redirects += `/${city.oldUrl}  /${city.slug}  301\n`;
    }
});

// Manual redirects for main pages
redirects += `/index.html  /  301\n`;
redirects += `/contact-taxi-valenciennes-reservation-24h-24.html  /contact  301\n`;
redirects += `/taxi-valenciennes-tarif.html  /tarifs  301\n`;
redirects += `/taxi-aeroport-valenciennes-lille-charleroi-bruxelles.html  /services/aeroport  301\n`;

fs.writeFileSync('./public/_redirects', redirects);
console.log('Redirects generated.');
