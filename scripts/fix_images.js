const fs = require('fs');

const indexHtml = '/Users/dikshantjangra/Documents/ProjectS/WeddingInvite/index.html';

function fixImages() {
    console.log('--- Fixing Images in Message Carousel (Restricted Scope) ---');
    if (!fs.existsSync(indexHtml)) {
        console.error('index.html not found');
        return;
    }

    let html = fs.readFileSync(indexHtml, 'utf8');
    
    // Use only existing images: 1, 3, 4, 5
    const myImages = [
        './images/1.png',
        './images/3.png',
        './images/4.png',
        './images/5.png'
    ];

    // Find the Carousel container specifically
    const carouselStartMarker = '<div class="framer-1h12l0p-container">';
    const startIdx = html.indexOf(carouselStartMarker);
    
    if (startIdx === -1) {
        console.error('Could not find carousel container!');
        return;
    }

    // Find the end of this container. Usually ends with the next sibling or closing div ladder.
    // Framer often has a structure where the section ends before the next large block.
    // Let's take a 50,000 character chunk to be safe but not touch the footer.
    const carouselChunk = html.substring(startIdx, startIdx + 50000);
    
    // Within this chunk, find all "Wedding shoot" blocks
    const parts = carouselChunk.split('data-framer-name="Wedding shoot (Do not delete)"');
    let fixedChunk = parts[0];
    let imgCount = 0;

    for (let i = 1; i < parts.length; i++) {
        let block = parts[i];
        const nextImage = myImages[imgCount % myImages.length];
        imgCount++;
        
        // This time, we target ONLY the <img> tag within this specific block
        // We look for the first img tag and replace its src and srcset
        block = block.replace(/<img[^>]+src="https:\/\/framerusercontent\.com\/images\/([^"]+)"/, (match) => {
            // Replace both src and srcset in the match
            let updated = match.replace(/src="[^"]+"/, `src="${nextImage}"`);
            updated = updated.replace(/srcset="[^"]+"/, `srcset="${nextImage} 1080w"`);
            return updated;
        });
        
        // Also catch srcset if it was missed or separate
        if (!block.includes(`src="${nextImage}"`)) {
             // Fallback: just replace any CDN image in this block
             block = block.replace(/src="https:\/\/framerusercontent\.com\/images\/[^"]+"/, `src="${nextImage}"`);
             block = block.replace(/srcset="https:\/\/framerusercontent\.com\/images\/[^"]+"/, `srcset="${nextImage} 1080w"`);
        }

        fixedChunk += 'data-framer-name="Wedding shoot (Do not delete)"' + block;
    }

    // Replace the old chunk with the fixed one in the full HTML
    html = html.substring(0, startIdx) + fixedChunk + html.substring(startIdx + 50000);
    
    fs.writeFileSync(indexHtml, html);
    console.log(`Replaced ${imgCount} carousel images correctly.`);
}

fixImages();
