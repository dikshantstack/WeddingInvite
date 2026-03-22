const fs = require('fs');

let content = fs.readFileSync('/Users/dikshantjangra/Documents/ProjectS/WeddingInvite/index.html', 'utf8');

// Remove Badge module preload
content = content.replace(/<link[^>]*Badge\.BkRmcCXf\.mjs[^>]*>/g, '');

// Remove Framer events script
content = content.replace(/<script[^>]*events\.framer\.com[^>]*><\/script>/g, '');

fs.writeFileSync('/Users/dikshantjangra/Documents/ProjectS/WeddingInvite/index.html', content);
console.log('Framer events and badge module preloads removed.');
