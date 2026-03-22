const fs = require('fs');

// === STEP 1: Fix the main JS bundle ===
const jsFile = '/Users/dikshantjangra/Documents/ProjectS/WeddingInvite/downloaded/sites/3bR6R2YrHoycodLqL6z8ep/6pW90hl_LWjZRtEVq1iartV66RJZ25zhIgPP6sQzSQg.CcXknUFo.mjs';
let js = fs.readFileSync(jsFile, 'utf8');

// Names
js = js.replace(/Abhishek/g, 'Kuldeep');
js = js.replace(/Kanika/g, 'Khushboo');

// Events
js = js.replace(/Mehendi/g, 'Haldi');
js = js.replace(/Cocktail/g, 'Ladies Sangeet');
js = js.replace(/Pre-wedding/g, 'RSVP');
js = js.replace(/Shaadi/g, 'Nanihal Paksh');
// Keep Reception but update with schedule info

// Dates
js = js.replace(/Friday, March 9th 2026/g, 'Thursday, 26th March, 2026');

// Times
js = js.replace(/6pm Onwards/g, 'Schedule on Cards');

// Venue
js = js.replace(/Taj Exotica Resort, Goa/g, 'Near Petrol Pump, Hisar Road, (Dhani) Dhansu (Blue Bells Public School)');
js = js.replace(/JW Mariott, Mussoorie/g, 'Near Petrol Pump, Hisar Road, (Dhani) Dhansu (Blue Bells Public School)');

// Family names - Main Invite
js = js.replace(/With the heavenly blessings of /g, 'Inviting family head: Smt. Maanti Devi W/o Late Sh. Nathu Ram Jyani request your loving presence to shower your blessings on the auspicious occasion of the Wedding Ceremony of her Loving Grandaughter');
js = js.replace(/Smt\. Lata Devi & Sm\. Kamal Kapoor/g, '');
js = js.replace(/Smt\. Lata Devi &amp; Sm\. Kamal Kapoor/g, '');
js = js.replace(/Mrs\. Reena & Mr\. Rajiv Kapoor/g, '');
js = js.replace(/Mrs\. Reena &amp; Mr\. Rajiv Kapoor/g, '');
js = js.replace(/Daughter of/g, 'D/o Smt. Rajbala & Sh. Ugersain Jyani');
js = js.replace(/Mrs\. Shalini & Mr\. Aakash Mittal,/g, 'With Groom: Kuldeep, S/o Smt. Roshani Devi & Sh. Mahender Singh Bhadu (Ex. AEO (Sports), Ed. Dept. Hisar) of H. No. 1244-P, Sec. 33, Hisar');
js = js.replace(/Mrs\. Shalini &amp; Mr\. Aakash Mittal,/g, 'With Groom: Kuldeep, S/o Smt. Roshani Devi &amp; Sh. Mahender Singh Bhadu (Ex. AEO (Sports), Ed. Dept. Hisar) of H. No. 1244-P, Sec. 33, Hisar');

// Mantra
js = js.replace(/\\u0950 \\u0936\\u094D\\u0930\\u0940 \\u0917\\u0923\\u0947\\u0936\\u093E\\u092F \\u0928\\u092E/g, 
  '!! \\u0936\\u094D\\u0930\\u0940 \\u0917\\u0923\\u0947\\u0936\\u093E\\u092F \\u0928\\u092E: !!');
// Also try direct Unicode
js = js.replace(/ॐ श्री गणेशाय नम/g, '!! श्री गणेशाय नम: !!');

// Couple message
js = js.replace(/We are both so delighted that you are able to join us in celebrating what we hope will be one of the happiest days of our lives\. The affection shown to us by so many people since our roka has been incredibly moving, and has touched us both deeply\. We would like to take this opportunity to thank everyone most sincerely for their kindness\.We are looking forward to see you at the wedding\./g,
  'हमें बहुत खुशी है कि आप हमारे जीवन के इस शुभ अवसर का हिस्सा बनेंगे। आपके आशीर्वाद और उपस्थिति से हमारा यह दिन और भी खास बन जाएगा। हम आपसे शादी में मिलने के लिए उत्सुक हैं!');

// Missing Piece branding
js = js.replace(/Missing Piece/g, 'Khushboo Weds Kuldeep');
js = js.replace(/missingpiecedesign\.com/g, '');
js = js.replace(/missingpieceinvites\.com/g, '');
js = js.replace(/BadriKiDulhania/g, '');

fs.writeFileSync(jsFile, js);
console.log('JS bundle updated!');

// === STEP 2: Also fix the demos/beach file ===
const beachFile = '/Users/dikshantjangra/Documents/ProjectS/WeddingInvite/downloaded/demos/beach';
if (fs.existsSync(beachFile)) {
  let beach = fs.readFileSync(beachFile, 'utf8');
  beach = beach.replace(/Abhishek/g, 'Kuldeep');
  beach = beach.replace(/Kanika/g, 'Khushboo');
  fs.writeFileSync(beachFile, beach);
  console.log('demos/beach updated!');
}

// === STEP 3: Update index.html to load JS from local downloaded/ folder ===
let html = fs.readFileSync('/Users/dikshantjangra/Documents/ProjectS/WeddingInvite/index.html', 'utf8');

// Replace all CDN URLs with local paths
html = html.replace(/https:\/\/framerusercontent\.com\/sites\/3bR6R2YrHoycodLqL6z8ep\//g, 'downloaded/sites/3bR6R2YrHoycodLqL6z8ep/');
html = html.replace(/https:\/\/framer\.com\/edit\/init\.mjs/g, 'downloaded/edit/init.mjs');

fs.writeFileSync('/Users/dikshantjangra/Documents/ProjectS/WeddingInvite/index.html', html);
console.log('index.html updated to use local JS files!');

// Final verification
const verifyJs = fs.readFileSync(jsFile, 'utf8');
console.log('Remaining Abhishek in JS:', (verifyJs.match(/Abhishek/g) || []).length);
console.log('Kuldeep count in JS:', (verifyJs.match(/Kuldeep/g) || []).length);
console.log('Khushboo count in JS:', (verifyJs.match(/Khushboo/g) || []).length);

const verifyHtml = fs.readFileSync('/Users/dikshantjangra/Documents/ProjectS/WeddingInvite/index.html', 'utf8');
console.log('CDN JS references remaining:', (verifyHtml.match(/framerusercontent\.com\/sites/g) || []).length);
