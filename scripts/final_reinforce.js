const fs = require('fs');

const indexHtml = '/Users/dikshantjangra/Documents/ProjectS/WeddingInvite/index.html';

function finalReinforce() {
    console.log('--- REINFORCING WATERMARK KILLER & NAME POSITIONS ---');
    if (!fs.existsSync(indexHtml)) return;

    let html = fs.readFileSync(indexHtml, 'utf8');
    
    // 1. Re-Inject Ultimate Killer (CSS + JS)
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
            
            /* GENTLE LANDING FIX (RESERVES ANIMATION) */
            .framer-1xpd67g-container {
                visibility: visible !important;
                z-index: 999 !important;
            }
            .names-restored {
                transition: transform 1.2s cubic-bezier(0.23, 1, 0.32, 1), opacity 1.2s ease-out !important;
                transform: translateY(0) !important;
                opacity: 1 !important;
            }
        </style>
        <script id="ultimate-watermark-killer-js">
            (function() {
                const fix = () => {
                    document.querySelectorAll('.__framer-badge, #framer-badge-container, .__framer-editorbar, [data-framer-name="Watermark"]').forEach(el => {
                        el.style.setProperty('display', 'none', 'important');
                    });
                    const nameContainer = document.querySelector('.framer-1xpd67g-container');
                    if (nameContainer && !nameContainer.classList.contains('names-restored')) {
                         setTimeout(() => {
                             nameContainer.classList.add('names-restored');
                             nameContainer.querySelectorAll('div').forEach(d => {
                                 d.style.setProperty('transform', 'none', 'important');
                                 d.style.setProperty('opacity', '1', 'important');
                             });
                         }, 1500); 
                    }
                };
                fix();
                const observer = new MutationObserver(fix);
                observer.observe(document.documentElement, { childList: true, subtree: true });
            })();
        </script>
    `;

    // 2. Re-Inject Surgical Image Interceptor (Carousel ONLY)
    const interceptorJs = `
        <script id="carousel-surgical-interceptor">
            (function() {
                const myImages = ['./images/1.png','./images/2.png','./images/3.png','./images/4.png','./images/5.png'];
                const fixOnlyCarousel = () => {
                    const carousel = document.querySelector('.framer-1h12l0p-container');
                    if (!carousel) return;
                    const slots = carousel.querySelectorAll('[data-framer-name="Wedding shoot (Do not delete)"]');
                    slots.forEach((slot, index) => {
                        const img = slot.querySelector('img');
                        if (img) {
                             const localSrc = myImages[index % myImages.length];
                             if (img.src.indexOf(localSrc.substring(2)) === -1) {
                                 img.src = localSrc;
                                 img.srcset = localSrc + ' 1080w';
                             }
                        }
                    });
                };
                fixOnlyCarousel();
                setInterval(fixOnlyCarousel, 300);
            })();
        </script>
    `;

    // Remove duplicates
    html = html.replace(/<style id="ultimate-watermark-killer">[\s\S]*?<\/script>/g, '');
    html = html.replace(/<script id="carousel-surgical-interceptor">[\s\S]*?<\/script>/g, '');
    
    // Inject at head end
    html = html.replace('</head>', killerStyle + '\n' + interceptorJs + '\n</head>');
    
    fs.writeFileSync(indexHtml, html);
    console.log('--- REINFORCEMENT COMPLETE ---');
}

finalReinforce();
