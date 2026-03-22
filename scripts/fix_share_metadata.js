const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Update OG and Twitter Title from "Beach – Indian Wedding..." to "Khushboo Weds Kuldeep"
html = html.replace(/<meta property="og:title" content="Beach – Indian Wedding Invitation Website Template">/g, '<meta property="og:title" content="Khushboo Weds Kuldeep">');
html = html.replace(/<meta name="twitter:title" content="Beach – Indian Wedding Invitation Website Template">/g, '<meta name="twitter:title" content="Khushboo Weds Kuldeep">');

// 2. Update Descriptions
const genericDescription = "A modern wedding invite that opens as a website. Customize instantly, add photos, and share with guests on WhatsApp. Perfect for every ceremony.";
const personalizedDescription = "Join us in the wedding ceremony of Khushboo and Kuldeep on Thursday, 26th March, 2026. View invitation details and schedule here!";

// Use a global regex replace to hit description, og:description, and twitter:description
const regexDesc = new RegExp('content="' + genericDescription.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '"', 'g');
html = html.replace(regexDesc, 'content="' + personalizedDescription + '"');

// 3. Remove JSON-LD Script with missingpieceinvites.com
const regexJsonLd = /<script type="application\/ld\+json">[\s\S]*?<\/script>/g;
html = html.replace(regexJsonLd, '');

fs.writeFileSync('index.html', html);
console.log('Successfully updated sharing metadata and removed JSON-LD!');
