const fs = require('fs');

const indexHtml = '/Users/dikshantjangra/Documents/ProjectS/WeddingInvite/index.html';
const jsBundle = '/Users/dikshantjangra/Documents/ProjectS/WeddingInvite/downloaded/sites/3bR6R2YrHoycodLqL6z8ep/6pW90hl_LWjZRtEVq1iartV66RJZ25zhIgPP6sQzSQg.CcXknUFo.mjs';

function finalPolish() {
    console.log('--- REFINING WEDDING DETAILS ---');
    
    // 1. Update JS Bundle (Countdown & Locations)
    if (fs.existsSync(jsBundle)) {
        let js = fs.readFileSync(jsBundle, 'utf8');
        
        // A. Countdown Date: 2026-03-26
        console.log('Updating Countdown Target to 26th March 2026...');
        js = js.replace(/date:`202[^\d]-0[^\d]-10T00:00:00.000Z`/g, 'date:`2026-03-26T18:15:00.000Z`');
        js = js.replace(/date:`202[^\d]-0[^\d]-28T18:00:00.000Z`/g, 'date:`2026-03-26T18:15:00.000Z`');
        
        // B. Global Location Replace
        console.log('Replacing location names globally...');
        js = js.replace(/Taj Exotica Resort, Goa/g, 'Near Petrol Pump, Hisar Road, (Dhani) Dhansu (Blue Bells Public School)');
        js = js.replace(/Friday, March 9th 2026/g, 'Thursday, 26th March 2026');
        
        fs.writeFileSync(jsBundle, js);
    }

    // 2. Update index.html
    if (fs.existsSync(indexHtml)) {
        let html = fs.readFileSync(indexHtml, 'utf8');
        
        // A. Location & Date
        html = html.replace(/Taj Exotica Resort, Goa/g, 'Near Petrol Pump, Hisar Road, (Dhani) Dhansu (Blue Bells Public School)');
        html = html.replace(/Friday, March 9th 2026/g, 'Thursday, 26th March 2026');
        
        // B. Update Event Details
        // The user mentioned: 
        // Bhaat — 6:15 PM
        // Dinner — 7:15 PM
        // Reception of Barat — 8:15 PM
        // Doli — Tarron Ki Chhaon Mein
        
        // Looking at the typical Section 3 (Event Cards), I will update them or concatenate them.
        // Actually, I'll update the specific card areas.
        
        console.log('Updating Event Schedule details...');
        html = html.replace(/Sangeet/g, 'Bhaat');
        html = html.replace(/Haldi Ceremony/g, 'Dinner');
        html = html.replace(/The Wedding/g, 'Reception of Barat');
        html = html.replace(/RSVP/g, 'Doli'); // Replaced the RSVP card with Doli
        
        // Update Times
        html = html.replace(/06:00 PM onwards/g, '6:15 PM / 7:15 PM / 8:15 PM');
        
        // If there's a block for Sangeet date/time, replace it
        // (This relies on my previous fix_events logic)
        html = html.replace(/Sunday, 8th March 2026/g, 'Thursday, 26th March 2026');
        
        fs.writeFileSync(indexHtml, html);
    }

    console.log('--- REFINEMENT COMPLETE ---');
}

finalPolish();
