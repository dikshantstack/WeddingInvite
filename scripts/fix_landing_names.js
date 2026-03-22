const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const startMatch = html.indexOf('data-framer-name="Couple\'s names"');
const endMatch = html.indexOf('<div class="framer-un4mx2"', startMatch); // Start of Lanterns

if (startMatch !== -1 && endMatch !== -1) {
    let block = html.substring(startMatch, endMatch);
    if (block.includes('Kuldeep</h1>') && block.includes('Khushboo</h1>')) {
         console.log('Found names in Landing page. Swapping...');
         block = block.replace('Kuldeep</h1>', 'TEMP_NAME</h1>');
         block = block.replace('Khushboo</h1>', 'Kuldeep</h1>');
         block = block.replace('TEMP_NAME</h1>', 'Khushboo</h1>');
         
         html = html.substring(0, startMatch) + block + html.substring(endMatch);
         fs.writeFileSync('index.html', html);
         console.log('Landing page names swapped successfully!');
    } else {
         console.log('Could not find BOTH names correctly in Landing page chunk.');
    }
} else {
    console.log('Outer bounding box for Landing page names not found!');
}
