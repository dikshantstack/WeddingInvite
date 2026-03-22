const fs = require('fs');

const indexHtml = '/Users/dikshantjangra/Documents/ProjectS/WeddingInvite/index.html';
const jsFile = '/Users/dikshantjangra/Documents/ProjectS/WeddingInvite/downloaded/sites/3bR6R2YrHoycodLqL6z8ep/6pW90hl_LWjZRtEVq1iartV66RJZ25zhIgPP6sQzSQg.CcXknUFo.mjs';

function cleanProject() {
    console.log('--- Cleaning project and restoring animations ---');
    
    if (fs.existsSync(jsFile)) {
        let js = fs.readFileSync(jsFile, 'utf8');
        js = js.replace(/Abhishek/g, 'Kuldeep');
        js = js.replace(/Kanika/g, 'Khushboo');
        js = js.replace(/Taj Exotica Resort, Goa/g, 'Near Petrol Pump, Hisar Road, (Dhani) Dhansu (Blue Bells Public School)');
        js = js.replace(/"Watermark"/g, '"_Cleaned_"');
        fs.writeFileSync(jsFile, js);
    }

    if (fs.existsSync(indexHtml)) {
        let html = fs.readFileSync(indexHtml, 'utf8');
        
        // Healing debris
        html = html.replace(/<div><\/div>\/\$/g, '<div></div>');
        html = html.replace(/<div[^>]*><\/div>\/\$/g, '<div></div>');
        html = html.replace(/<!--\$-->\/\$<!--\/$-->/g, ''); 
        html = html.replace(/\/\$<\/div>/g, '</div>');
        
        const killerStyle = `
        <style id="ultimate-watermark-killer">
            /* Hide watermarks and badges */
            [data-framer-name="Watermark"], 
            [data-framer-name="Missing Piece Logo"], 
            [data-framer-name="Buy button stack"],
            .__framer-badge,
            #framer-badge-container,
            [class*="framer-badge"],
            .__framer-editorbar {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                pointer-events: none !important;
                height: 0 !important;
                width: 0 !important;
                position: absolute !important;
                top: -9999px !important;
            }
            
            /* GENTLE LANDING FIX (Restores Animation) */
            .framer-1xpd67g-container {
                /* We don't force translateY(0) here yet to let original animation play.
                   But we ensure it's not hidden by mistake. */
                visibility: visible !important;
                z-index: 999 !important;
            }

            /* Custom smooth entry if original animation is stuck */
            .names-restored {
                transition: transform 1.2s cubic-bezier(0.23, 1, 0.32, 1), opacity 1.2s ease-out !important;
                transform: translateY(0) !important;
                opacity: 1 !important;
            }
        </style>
        <script id="ultimate-watermark-killer-js">
            (function() {
                const fix = () => {
                    // Hide junk
                    document.querySelectorAll('.__framer-badge, #framer-badge-container, .__framer-editorbar, [data-framer-name="Watermark"]').forEach(el => {
                        el.style.setProperty('display', 'none', 'important');
                    });
                    
                    // Recover names if they are stuck
                    const nameContainer = document.querySelector('.framer-1xpd67g-container');
                    if (nameContainer) {
                        // If it's still far down after 1.5 seconds, or if opacity is 0
                        const currentTransform = window.getComputedStyle(nameContainer).transform;
                        // Check for translateY > 500 (matrix[13] or matrix[5] depending on matrix type)
                        // But simpler: just add our class after a short delay OR if it's clearly broken
                        if (!nameContainer.classList.contains('names-restored')) {
                             // Let it sit for a moment to allow original animation to try and play
                             setTimeout(() => {
                                 nameContainer.classList.add('names-restored');
                                 // Also check inner divs
                                 nameContainer.querySelectorAll('div').forEach(d => {
                                     d.style.setProperty('transform', 'none', 'important');
                                     d.style.setProperty('opacity', '1', 'important');
                                 });
                             }, 1500); 
                        }
                    }
                };
                
                fix();
                setTimeout(fix, 500);
                const observer = new MutationObserver(fix);
                observer.observe(document.documentElement, { childList: true, subtree: true });
            })();
        </script>
        `;
        
        // Remove existing killers
        html = html.replace(/<style id="watermark-killer">[\s\S]*?<\/script>/g, '');
        html = html.replace(/<style id="ultimate-watermark-killer">[\s\S]*?<\/script>/g, '');
        
        html = html.replace('</head>', killerStyle + '\n</head>');
        
        fs.writeFileSync(indexHtml, html);
        console.log('Animation recovery script injected.');
    }
}

cleanProject();
