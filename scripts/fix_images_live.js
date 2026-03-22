const fs = require('fs');

const indexHtml = '/Users/dikshantjangra/Documents/ProjectS/WeddingInvite/index.html';

function injectInterceptor() {
    console.log('--- Injecting Global Image Interceptor ---');
    if (!fs.existsSync(indexHtml)) return;

    let html = fs.readFileSync(indexHtml, 'utf8');
    
    // This script will run in the browser and swap images on the fly!
    const interceptorJs = `
        <script id="carousel-image-interceptor">
            (function() {
                const myImages = [
                    './images/1.png',
                    './images/2.png',
                    './images/3.png',
                    './images/4.png',
                    './images/5.png'
                ];
                
                const fixCarousel = () => {
                    // Target the carousel container specifically
                    const carousel = document.querySelector('.framer-1h12l0p-container');
                    if (!carousel) return;
                    
                    // All slots with the specific data-attribute
                    // (Matching any variant of the name)
                    const slots = carousel.querySelectorAll('[data-framer-name*="Wedding shoot"]');
                    slots.forEach((slot, index) => {
                        const img = slot.querySelector('img');
                        if (img) {
                            const newSrc = myImages[index % myImages.length];
                            if (img.getAttribute('src') !== newSrc) {
                                img.setAttribute('src', newSrc);
                                img.setAttribute('srcset', newSrc + ' 1080w');
                                // Ensure style doesn't have a background image if any
                                if (img.style.backgroundImage) img.style.backgroundImage = 'none';
                            }
                        }
                        // Also check for background-image wrappers
                        const bgWrapper = slot.querySelector('[data-framer-background-image-wrapper]');
                        if (bgWrapper) {
                             const img2 = bgWrapper.querySelector('img');
                             if (img2) {
                                 const newSrc = myImages[index % myImages.length];
                                 if (img2.getAttribute('src') !== newSrc) {
                                     img2.setAttribute('src', newSrc);
                                     img2.setAttribute('srcset', newSrc + ' 1080w');
                                 }
                             }
                        }
                    });
                };
                
                // Run immediately and then on every DOM change
                fixCarousel();
                const observer = new MutationObserver(fixCarousel);
                observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['src', 'srcset'] });
                
                // Faster interval to ensure buttons/scrolling don't revert images
                setInterval(fixCarousel, 200);
            })();
        </script>
    `;

    // Remove old interceptor if exists
    html = html.replace(/<script id="carousel-image-interceptor">[\s\S]*?<\/script>/g, '');
    
    // Inject at head end, before our watermark killer
    html = html.replace('</head>', interceptorJs + '\n</head>');
    
    fs.writeFileSync(indexHtml, html);
    console.log('Global Image Interceptor injected into index.html');
}

injectInterceptor();
