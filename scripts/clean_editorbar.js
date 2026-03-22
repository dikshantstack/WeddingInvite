const fs = require('fs');

let content = fs.readFileSync('/Users/dikshantjangra/Documents/ProjectS/WeddingInvite/index.html', 'utf8');

// Remove the __framer-editorbar iframe
content = content.replace(/<iframe id="__framer-editorbar"[\s\S]*?<\/iframe>/g, '');

// Remove the Framer editor bar CSS
content = content.replace(/<style>[\s\S]*?#__framer-editorbar[\s\S]*?<\/style>/g, '');
// Actually many styles have #__framer-editorbar. Let's find the large <style> block containing these.
// Sometimes it's one big block. In index.html line 823 sounds like where it starts.

// Let's use a regex to find the style block containing #__framer-editorbar
content = content.replace(/<style[^>]*>[\s\S]*?#__framer-editorbar[\s\S]*?<\/style>/g, '');

// Re-check for any remaining ones
content = content.replace(/#__framer-editorbar[\s\S]*?}/g, '');
content = content.replace(/#__framer-editorbar-container[\s\S]*?}/g, '');

// Final save
fs.writeFileSync('/Users/dikshantjangra/Documents/ProjectS/WeddingInvite/index.html', content);
console.log('Framer editor bar and CSS removed.');
