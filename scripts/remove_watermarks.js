const fs = require('fs');

function removeElementByName(html, name) {
    const regex = new RegExp('<div[^>]*data-framer-name="' + name + '"[^>]*>', 'g');
    let match;
    let newHtml = html;
    
    // We process from end to start to not mess up indices if we were using indices, 
    // but here we will just do a replacement for each match.
    // Actually, finding the matching closing tag for a div is hard with regex if nested.
    // Let's use a simpler approach: replace the entire block with an empty string.
    // Since Framer usually has a predictable structure for these.
    
    // For Watermark, they seem to be self-contained in one line or a small block.
    // Let's try to match the whole div block.
    
    const matches = [...html.matchAll(regex)];
    for (const m of matches) {
        const startIdx = m.index;
        // Count nested divs to find matching closing tag
        let openDivs = 1;
        let currentIdx = startIdx + m[0].length;
        
        while (openDivs > 0 && currentIdx < html.length) {
            const nextOpen = html.indexOf('<div', currentIdx);
            const nextClose = html.indexOf('</div>', currentIdx);
            
            if (nextClose === -1) break; // Should not happen
            
            if (nextOpen !== -1 && nextOpen < nextClose) {
                openDivs++;
                currentIdx = nextOpen + 4;
            } else {
                openDivs--;
                currentIdx = nextClose + 6;
            }
        }
        
        const endIdx = currentIdx;
        const block = html.substring(startIdx, endIdx);
        newHtml = newHtml.replace(block, '');
    }
    return newHtml;
}

let content = fs.readFileSync('/Users/dikshantjangra/Documents/ProjectS/WeddingInvite/index.html', 'utf8');

// Remove Watermarks
content = removeElementByName(content, 'Watermark');
// Remove Missing Piece Logo (just in case)
content = removeElementByName(content, 'Missing Piece Logo');
// Remove Buy button stack (as requested previously, and often considered watermark/upsell)
content = removeElementByName(content, 'Buy button stack');

// Also remove style/script injections that hide these things, since they are now gone from HTML
// (This makes the file cleaner)
content = content.replace(/<style>\s*\/\* Hide the Made with Framer badge \*\/[\s\S]*?<\/style>/g, '');
content = content.replace(/#__framer-badge-container\s*{\s*display:\s*none\s*!important;\s*}/g, '');

// Save back
fs.writeFileSync('/Users/dikshantjangra/Documents/ProjectS/WeddingInvite/index.html', content);
console.log('Watermarks removed directly from HTML.');
