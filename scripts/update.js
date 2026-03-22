const fs = require('fs');

let html = fs.readFileSync('/Users/dikshantjangra/Documents/ProjectS/WeddingInvite/index.html', 'utf8');

function replaceFirst(searchText, replaceText) {
    if(!html.includes(searchText)) {
        console.log("WARNING: Could not find search text: " + searchText);
    }
    html = html.replace(searchText, replaceText);
}

function replaceAll(searchText, replaceText) {
    // Escape regex
    const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    html = html.replace(new RegExp(escapeRegExp(searchText), 'g'), replaceText);
}

// 1. Cover / Base Names
replaceAll('>Abhishek<', '>Kuldeep<');
replaceAll('Abhishek & Kanika', 'Khushboo & Kuldeep'); // In our overlay update
replaceAll('>Kanika<', '>Khushboo<');

replaceFirst('>Abhishek</h1>', '>Kuldeep</h1>');
replaceFirst('>Kanika</h1>', '>Khushboo</h1>');

// 2. Cover Additional "From" and "Mobile" injection
// We can inject a floating bar or just add it near the bottom of the structure.
// Let's create a custom fixed banner for the 'From' and 'Mobile' details that stays fixed at bottom left
const fromBanner = `
<div style="position:fixed;bottom:20px;left:20px;z-index:999998;font-family:'Cormorant';background:rgba(255,255,255,0.9);padding:10px 15px;border-radius:10px;box-shadow:0 0 10px rgba(0,0,0,0.1);max-width:300px;font-size:14px;color:#333;line-height:1.4;">
  <strong>From:</strong> Ugersain Jyani (Blue Bells Public School)<br>
  Near Petrol Pump, Hisar Road, Dhansu<br>
  <strong>Mobile:</strong> 9466336029, 7015641767
</div>
`;
// Inject before </body>
replaceFirst('</body>', fromBanner + '\n</body>');

// 3. Mantras & Main Info (Page 3)
replaceAll('>ॐ श्री गणेशाय नम<', '>!! श्री गणेशाय नम: !!<br/>विघ्न हरण, मंगल करण, श्री गणपति जी महाराज।<br/>प्रथम निमन्त्रण आपको, पूर्ण करियो काज॥<');

replaceFirst('>With the heavenly blessings of <', '>Inviting family head:<br/>Smt. Maanti Devi W/o Late Sh. Nathu Ram Jyani<br/>request your loving presence to shower your blessings on the auspicious occasion of the Wedding Ceremony of her Loving Grandaughter<');
replaceFirst('>Smt. Lata Devi &amp; Sm. Kamal Kapoor<', '><');
replaceFirst('>Mrs. Reena &amp; Mr. Rajiv Kapoor<', '><');
replaceFirst('>Daughter of<', '>D/o Smt. Rajbala &amp; Sh. Ugersain Jyani<');
replaceFirst('>Mrs. Shalini &amp; Mr. Aakash Mittal,<', '>With Groom: Kuldeep<br/>S/o Smt. Roshani Devi &amp; Sh. Mahender Singh Bhadu (Ex. AEO (Sports), Ed. Dept. Hisar) of H. No. 1244-P, Sec. 33, Hisar<');


// 4. Golden Moments Schedule & Venue
// Event 1 processing
replaceFirst('>Mehendi<', '>Haldi<');
replaceFirst('>Friday, March 9th 2026<', '>Sunday, 22nd March, 2026<');
replaceFirst('>6pm Onwards<', '>5:15 PM<');

// Event 2 processing
replaceFirst('>Haldi<', '>Ladies Sangeet<');
replaceFirst('>Friday, March 9th 2026<', '>Wednesday, 25th March, 2026<');
replaceFirst('>6pm Onwards<', '>8:15 PM<');

// Event 3 processing
replaceFirst('>Cocktail<', '>Bhaat, Dinner &amp; Reception<');
replaceFirst('>Friday, March 9th 2026<', '>Thursday, 26th March, 2026<');
replaceFirst('>6pm Onwards<', '>Bhaat — 6:15 PM<br>Dinner — 7:15 PM<br>Reception of Barat — 8:15 PM<br>Doli — Tarron Ki Chhaon Mein<');

// Event 4 - Hide it (Pre-wedding)
// Since we have 4 templates in DOM but 3 user events, let's hide the 4th
// The 4th is named Pre-wedding
const styleRuleToHidePreWedding = '<style>[data-framer-name="Event name"]:has(:contains("Pre-wedding")) { display:none!important; } .framer-text:contains("Pre-wedding") { display:none!important; }</style>';
replaceFirst('</body>', styleRuleToHidePreWedding + '\n</body>');


// Venue - replace all
replaceAll('Taj Exotica Resort, Goa', 'Near Petrol Pump, Hisar Road, (Dhani) Dhansu (Blue Bells Public School)');
replaceAll('JW Mariott, Mussoorie', 'Near Petrol Pump, Hisar Road, (Dhani) Dhansu (Blue Bells Public School)');

fs.writeFileSync('/Users/dikshantjangra/Documents/ProjectS/WeddingInvite/index.html', html);
console.log('Update script completely executed and index.html overwritten');
