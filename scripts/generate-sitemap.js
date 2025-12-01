/**
 * Generate dynamic sitemap.xml with current date
 * Run this after build to ensure sitemap has latest modification dates
 */

const fs = require('fs');
const path = require('path');

const currentDate = new Date().toISOString().split('T')[0];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    
    <!-- Homepage -->
    <url>
        <loc>https://khatiwadaprashant.com.np/</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    
    <!-- About Section -->
    <url>
        <loc>https://khatiwadaprashant.com.np/#about</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    
    <!-- Portfolio/Projects Section -->
    <url>
        <loc>https://khatiwadaprashant.com.np/#portfolio</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
    
    <!-- Experience Section -->
    <url>
        <loc>https://khatiwadaprashant.com.np/#experience</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    
    <!-- Skills Section -->
    <url>
        <loc>https://khatiwadaprashant.com.np/#skills</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>
    
    <!-- Services Section -->
    <url>
        <loc>https://khatiwadaprashant.com.np/#services</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>
    
    <!-- Testimonials Section -->
    <url>
        <loc>https://khatiwadaprashant.com.np/#testimonials</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
    </url>
    
    <!-- Contact Section -->
    <url>
        <loc>https://khatiwadaprashant.com.np/#contact</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    
</urlset>`;

// Write to build directory
const buildPath = path.join(__dirname, '..', 'build', 'sitemap.xml');
const publicPath = path.join(__dirname, '..', 'public', 'sitemap.xml');

// Update both public and build directories
fs.writeFileSync(publicPath, sitemap);
console.log('✅ Sitemap generated successfully in public/');

// Also write to build if it exists
if (fs.existsSync(path.join(__dirname, '..', 'build'))) {
    fs.writeFileSync(buildPath, sitemap);
    console.log('✅ Sitemap copied to build/');
}

console.log(`📅 Last modified date: ${currentDate}`);
