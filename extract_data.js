const fs = require('fs');
const path = require('path');

const legacyDir = './legacy';
const outputDir = './src/content';
const outputFile = path.join(outputDir, 'cities.json');

// Ensure output dir exists
if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(legacyDir).filter(file => file.endsWith('.html') && file !== 'index.html' && !file.includes('contact') && !file.includes('tarif') && !file.includes('aeroport'));

const cities = files.map(file => {
    const content = fs.readFileSync(path.join(legacyDir, file), 'utf8');
    
    // Extract Title
    const titleMatch = content.match(/<title>(.*?)<\/title>/);
    const title = titleMatch ? titleMatch[1] : '';
    
    // Extract Meta Description
    const descMatch = content.match(/<meta name="description" content="(.*?)">/);
    const description = descMatch ? descMatch[1] : '';

    // Extract H1 to guess the City Name better if filename is messy
    const h1Match = content.match(/<h1>(.*?)<\/h1>/);
    const h1 = h1Match ? h1Match[1] : '';

    // Simple heuristic to extract city name from filename
    // Format: taxi-conventionne-CITYNAME.html or taxi-conventionne-CITYNAME-transport-cpam-100.html
    let slugName = file.replace('.html', '').replace('taxi-conventionne-', '').replace('-transport-cpam-100', '');
    
    // Capitalize
    const name = slugName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    return {
        slug: file.replace('.html', ''), // Keep the old filename as slug for now to handle redirects or legacy urls if we want
        oldUrl: file,
        name: name,
        metaTitle: title,
        metaDesc: description,
        h1: h1
    };
});

// Add main cities if missed or specific pages
// (This is a simplified extraction, in a real scenario we'd parse more deeply)

console.log(`Extracted ${cities.length} cities.`);
fs.writeFileSync(outputFile, JSON.stringify(cities, null, 2));
