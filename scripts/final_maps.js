const fs = require('fs');

const indexHtml = '/Users/dikshantjangra/Documents/ProjectS/WeddingInvite/index.html';
const mapLink = 'https://maps.app.goo.gl/GqsaFwC3T9AzowSRA';

function finalMapUpdate() {
    console.log('--- UPDATING MAP LINKS & LOCATION TEXT ---');
    if (!fs.existsSync(indexHtml)) return;

    let html = fs.readFileSync(indexHtml, 'utf8');
    
    // 1. TEXT UPDATES
    console.log('Replacing Instagram/Action text with Location text...');
    
    // Replace "Follow the action"
    html = html.replace(/Follow\s+the\s+action/gi, 'See the Location');
    
    // Replace "Click to open Instagram"
    html = html.replace(/Click\s+to\s+open\s+Instagram/gi, 'Open Google Maps'); // Or "See the Location"
    
    // 2. LINK UPDATES
    console.log('Updating all map links...');
    
    // Replace existing Google Maps links (placeholders)
    // Common pattern in this template seems to be "https://maps.app.goo.gl/..."
    // or links near "See the route"
    
    // Find all links near "See the route"
    // (Framer structure: <a ... href="LINK">...See the route...</a>)
    // We'll use a broad approach for ANY link that was originally a placeholder map link.
    
    // Replace any URL that starts with maps.app.goo.gl or looks like a map placeholder
    // (In index.html, user might have old links or placeholders)
    html = html.replace(/https:\/\/maps\.app\.goo\.gl\/[a-zA-Z0-9]+/g, mapLink);
    
    // Special case for the Instagram block which we just renamed
    // Find the link that was https://missingpiecedesign.com (or similar) and update it to mapLink
    // if it's near the newly named "See the Location".
    // I'll use a more targeted approach for the specific Instagram section.
    
    // Let's also replace any https://www.instagram.com links with the map link!
    html = html.replace(/https:\/\/www\.instagram\.com\/[^\s"<>]+/gi, mapLink);
    
    // Replace the specific placeholder I saw earlier near Instagram
    html = html.replace(/https:\/\/missingpiecedesign\.com/g, mapLink);

    fs.writeFileSync(indexHtml, html);
    console.log('--- MAP UPDATES COMPLETE ---');
}

finalMapUpdate();
