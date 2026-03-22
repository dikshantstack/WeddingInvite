const fs = require('fs');

const indexHtml = '/Users/dikshantjangra/Documents/ProjectS/WeddingInvite/index.html';
const jsBundle = '/Users/dikshantjangra/Documents/ProjectS/WeddingInvite/downloaded/sites/3bR6R2YrHoycodLqL6z8ep/6pW90hl_LWjZRtEVq1iartV66RJZ25zhIgPP6sQzSQg.CcXknUFo.mjs';

function finalFix() {
    console.log('--- FINAL POLISH: Carousel JS + Countdown ---');
    
    // 1. Fix JS Bundle
    if (fs.existsSync(jsBundle)) {
        let js = fs.readFileSync(jsBundle, 'utf8');
        
        // A. Fix Countdown Date
        console.log('Updating Countdown Date...');
        js = js.replace(/date:`202[^\d]-03-10T00:00:00.000Z`/g, 'date:`2026-04-28T18:00:00.000Z`');
        
        // B. Fix Carousel Images
        console.log('Updating Carousel Images in JS...');
        const myImages = [
            './images/1.png',
            './images/2.png',
            './images/3.png',
            './images/4.png',
            './images/5.png'
        ];
        
        let imgIdx = 0;
        // The slots occur in a list. We can find the background objects.
        // Format: background:{...,src:`https://...`,srcSet:`https://...`}
        // We'll use a split on "Wedding shoot" to find the slots specifically.
        const sections = js.split('"data-framer-name":`Wedding shoot (Do not delete)`');
        let newJs = sections[0];
        
        for (let i = 1; i < sections.length; i++) {
            let block = sections[i];
            const nextImg = myImages[imgIdx % myImages.length];
            imgIdx++;
            
            // We need to go back into the PREVIOUS block (sections[i-1]) to find the background object.
            // But wait, sections[i] contains the block FOLLOWING the name.
            // Actually, in the JS, the "background" object is often BEFORE the name is assigned in the same object literal.
            // Example: {background:{...}, className:..., "data-framer-name":`Wedding shoot...`}
            // So we need to modify the tail of the PREVIOUS block.
            
            let prevBlock = newJs;
            // Find the last "src" before the current "Wedding shoot"
            const lastSrcIdx = prevBlock.lastIndexOf('src:');
            if (lastSrcIdx !== -1) {
                // Replace the src and srcset in that area
                const tail = prevBlock.substring(lastSrcIdx);
                const updatedTail = tail.replace(/src:`https:\/\/framerusercontent\.com\/images\/[^`]*`/, `src:\`${nextImg}\``)
                                        .replace(/srcSet:`https:\/\/framerusercontent\.com\/images\/[^`]*`/, `srcSet:\`${nextImg} 1080w\``);
                
                newJs = prevBlock.substring(0, lastSrcIdx) + updatedTail;
            }
            
            newJs += '"data-framer-name":`Wedding shoot (Do not delete)`' + block;
        }
        
        fs.writeFileSync(jsBundle, newJs);
        console.log(`Updated ${imgIdx} image slots in JS Bundle.`);
    }

    // 2. Ensure index.html matches (Refresh it just in case)
    if (fs.existsSync(indexHtml)) {
         // I'll re-run my image fixer logic but ensure it uses 1-5
         console.log('Refreshing index.html carousel images...');
         // (Simulating the fix_images logic)
         let html = fs.readFileSync(indexHtml, 'utf8');
         const myImages = ['./images/1.png','./images/2.png','./images/3.png','./images/4.png','./images/5.png'];
         const startMarker = '<div class="framer-1h12l0p-container">';
         const startIdx = html.indexOf(startMarker);
         if (startIdx !== -1) {
             const carouselChunk = html.substring(startIdx, startIdx + 50000);
             const parts = carouselChunk.split('data-framer-name="Wedding shoot (Do not delete)"');
             let fixedChunk = parts[0];
             for (let i = 1; i < parts.length; i++) {
                 let block = parts[i];
                 const nextImg = myImages[(i-1) % 5];
                 block = block.replace(/src="[^"]*"/, `src="${nextImg}"`);
                 block = block.replace(/srcset="[^"]*"/g, `srcset="${nextImg} 1080w"`);
                 fixedChunk += 'data-framer-name="Wedding shoot (Do not delete)"' + block;
             }
             html = html.substring(0, startIdx) + fixedChunk + html.substring(startIdx + 50000);
             fs.writeFileSync(indexHtml, html);
         }
    }

    console.log('--- REBOOT COMPLETE ---');
}

finalFix();
