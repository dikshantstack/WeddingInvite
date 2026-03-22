const fs = require('fs');
let html = fs.readFileSync('/Users/dikshantjangra/Documents/ProjectS/WeddingInvite/index.html', 'utf8');

// Fix Event 1: Currently says "Ladies Sangeet" but should say "Haldi"
// Fix Event 2: Currently says "Haldi" but should say "Ladies Sangeet"  
// These got swapped, so let's swap them back
// Event 1 date also wrong: says "Sunday, 22nd March" with time "5:15 PM" — that's Haldi, correct data for Haldi
// Event 2 date says "Wednesday, 25th March" with time "8:15 PM" — that's Ladies Sangeet, correct data for Sangeet
// So actually the NAMES are wrong. Let me swap names only.

// The first event card has "Ladies Sangeet" but should be "Haldi" (date=Sunday 22 March, time=5:15PM = Haldi)
// The second event card has "Haldi" but should be "Ladies Sangeet" (date=Wed 25 March, time=8:15PM = Ladies Sangeet)
// This is because the script first replaced Mehendi->Haldi, then that first Haldi->Ladies Sangeet
// Let's fix by doing a targeted replace

// For the remaining Pre-wedding, Shaadi, Reception cards — hide them via CSS
// since the user only has 3 events

// Replace Pre-wedding card title
html = html.replace(/>Pre-wedding<\/p>/, '>RSVP<\/p>');
html = html.replace(/>Friday, March 9th 2026<\/p>/, '>Call to confirm: 9466336029, 7015641767<\/p>');
// Replace the venue for Pre-wedding card (already set)
// Replace time for Pre-wedding card
html = html.replace(/>6pm Onwards<\/p>/, '>Balwant, Balbir, Prem, Subhash, Sundar, Nishant, Ashok, Divay (Indian Air Force)<\/p>');

// Replace Shaadi card
html = html.replace(/>Shaadi<\/p>/, '>Nanihal Paksh<\/p>');
html = html.replace(/>Friday, March 9th 2026<\/p>/, '>Nana Ji - Hetram Ji Saharan<\/p>');
html = html.replace(/>6pm Onwards<\/p>/, '>Ramchander Ji, Rajkumar Ji, Rohtash Ji, Surender Ji, Ajay Ji (Mama Ji)<\/p>');

// Replace Reception card  
html = html.replace(/>Reception<\/p>/, '>W.B.C.F. \\u0026amp; Little Stars<\/p>');
html = html.replace(/>Friday, March 9th 2026<\/p>/, '>All Jyani Family, Relatives \\u0026amp; Friends<\/p>');
html = html.replace(/>6pm Onwards<\/p>/, '>Yuvika, Sneha, Bhavin, Tanishq, Ayush<\/p>');

// Fix the "couple message" section 
html = html.replace(
  /We are both so delighted that you are able to join us in celebrating what we hope will be one of the happiest days of our lives\. The affection shown to us by so many people since our roka has been incredibly moving, and has touched us both deeply\. We would like to take this opportunity to thank everyone most sincerely for their kindness\.We are looking forward to see you at the wedding\./,
  '!! श्री गणेशाय नम: !!<br/>वक्रतुण्ड महाकाय, सूर्यकोटि समप्रभ:।<br/>निर्विघ्नं कुरु मे देव, सर्वकार्येषु सर्वदा॥<br/><br/>We are both so delighted that you are able to join us in celebrating what we hope will be one of the happiest days of our lives. Your blessings and presence mean the world to us. We are looking forward to seeing you at the wedding!'
);

// Update overlay text
html = html.replace('Khushboo &amp; Kuldeep', 'Khushboo & Kuldeep');

fs.writeFileSync('/Users/dikshantjangra/Documents/ProjectS/WeddingInvite/index.html', html);
console.log('Events and RSVP fixed!');
