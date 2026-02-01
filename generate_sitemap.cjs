const fs = require('fs');
const path = require('path');

const distDir = './dist';
const sitemapPath = path.join(distDir, 'sitemap.xml');
const siteUrl = 'https://taxi-valenciennes.fr';

function getHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getHtmlFiles(filePath, fileList);
        } else {
            if (path.extname(file) === '.html' && file !== '404.html') {
                fileList.push(filePath);
            }
        }
    });
    
    return fileList;
}

const htmlFiles = getHtmlFiles(distDir);
const today = new Date().toISOString().split('T')[0];

let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

htmlFiles.forEach(file => {
    // Convert file path to URL
    let relativePath = path.relative(distDir, file).replace(/\\/g, '/');
    
    // Remove index.html for clean URLs
    if (relativePath.endsWith('index.html')) {
        relativePath = relativePath.replace('index.html', '');
    }
    
    // Remove .html extension
    if (relativePath.endsWith('.html')) {
        relativePath = relativePath.replace('.html', '');
    }

    // Ensure trailing slash for directories (optional but good for consistency)
    if (relativePath !== '' && !relativePath.endsWith('/')) {
        relativePath += '/';
    }

    const url = `${siteUrl}/${relativePath}`;
    
    sitemapContent += `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${relativePath === '' ? '1.0' : '0.8'}</priority>
  </url>
`;
});

sitemapContent += `</urlset>`;

fs.writeFileSync(sitemapPath, sitemapContent);
console.log(`Sitemap generated at ${sitemapPath} with ${htmlFiles.length} URLs.`);
