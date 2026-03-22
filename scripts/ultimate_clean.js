const fs = require('fs');

const indexHtml = '/Users/dikshantjangra/Documents/ProjectS/WeddingInvite/index.html';
const jsFile = '/Users/dikshantjangra/Documents/ProjectS/WeddingInvite/downloaded/sites/3bR6R2YrHoycodLqL6z8ep/6pW90hl_LWjZRtEVq1iartV66RJZ25zhIgPP6sQzSQg.CcXknUFo.mjs';

function cleanProject() {
    console.log('--- Healing and Cleaning project starting ---');
    
    // 1. Clean Main JS Bundle
    if (fs.existsSync(jsFile)) {
        let js = fs.readFileSync(jsFile, 'utf8');
        
        // Fix names (in case they were reverted)
        js = js.replace(/Abhishek/g, 'Kuldeep');
        js = js.replace(/Kanika/g, 'Khushboo');
        js = js.replace(/Taj Exotica Resort, Goa/g, 'Near Petrol Pump, Hisar Road, (Dhani) Dhansu (Blue Bells Public School)');
        
        // Hide watermarks by changing their opacity to 0 in JS object
        js = js.replace(/"Watermark"/g, '"_Cleaned_"');
        
        fs.writeFileSync(jsFile, js);
        console.log('Names and Watermark labels fixed in JS bundle.');
    }

    // 2. Clean and Heal index.html
    if (fs.existsSync(indexHtml)) {
        let html = fs.readFileSync(indexHtml, 'utf8');
        
        // === HEALING SECTION ===
        // Fix the broken markers "<div></div>/$" or similar debris from previous scripts
        console.log('Smoothing out broken hydration markers...');
        html = html.replace(/<div><\/div>\/\$/g, '<div></div>');
        html = html.replace(/<div[^>]*><\/div>\/\$/g, '<div></div>');
        html = html.replace(/<!--\$-->\/\$<!--\/$-->/g, ''); 
        html = html.replace(/\/\$<\/div>/g, '</div>');
        html = html.replace(/\s\/\$[\n\s]/g, '\n'); // Catch floating /$ in whitespace
        html = html.replace(/\s\$[\n\s]/g, '\n');   // Catch floating $ in whitespace
        
        // === CONTENT FIXES ===
        html = html.replace(/>Abhishek</g, '>Kuldeep<');
        html = html.replace(/>Kanika</g, '>Khushboo<');
        
        // === ULTIMATE WATERMARK KILLER (Non-destructive) ===
        // We use CSS to hide everything. This is 100% safe for React hydration.
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
            
            /* Ensure the Couple's names div is ALWAYS visible */
            [data-framer-name="Couple's names"], 
            .framer-1xpd67g-container {
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                height: auto !important;
                width: 100% !important;
                transform: none !important; /* Some animations might hide it */
            }
        </style>
        <script id="ultimate-watermark-killer-js">
            (function() {
                const hide = () => {
                    const selectors = [
                        '[data-framer-name="Watermark"]',
                        '[data-framer-name="Missing Piece Logo"]',
                        '[data-framer-name="Buy button stack"]',
                        '.__framer-badge',
                        '#framer-badge-container',
                        '.__framer-editorbar'
                    ];
                    selectors.forEach(sel => {
                        document.querySelectorAll(sel).forEach(el => {
                            if (el.style.display !== 'none') {
                                el.style.setProperty('display', 'none', 'important');
                            }
                        });
                    });
                };
                hide();
                // Run periodically to catch React renders
                setInterval(hide, 1000);
                
                // Mutation observer for instant hiding
                const observer = new MutationObserver(hide);
                observer.observe(document.documentElement, { childList: true, subtree: true });
            })();
        </script>
        `;
        
        // Remove any old version of the killer script if present
        html = html.replace(/<style id="watermark-killer">[\s\S]*?<\/script>/g, '');
        html = html.replace(/<style id="ultimate-watermark-killer">[\s\S]*?<\/script>/g, '');
        
        // Inject the new one
        html = html.replace('</head>', killerStyle + '\n</head>');
        
        // Ensure local paths
        html = html.replace(/https:\/\/framerusercontent\.com\/sites\/3bR6R2YrHoycodLqL6z8ep\//g, 'downloaded/sites/3bR6R2YrHoycodLqL6z8ep/');
        
        fs.writeFileSync(indexHtml, html);
        console.log('HTML healed, names fixed, and non-destructive killer injected.');
    }

    console.log('--- Cleaning/Healing project complete ---');
}

cleanProject();
