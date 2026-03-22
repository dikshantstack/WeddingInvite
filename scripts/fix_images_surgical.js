const fs = require('fs');

const indexHtml = '/Users/dikshantjangra/Documents/ProjectS/WeddingInvite/index.html';

function injectSurgicalInterceptor() {
    console.log('--- Injecting Surgical Image Interceptor ---');
    if (!fs.existsSync(indexHtml)) return;

    let html = fs.readFileSync(indexHtml, 'utf8');
    
    const interceptorJs = `
        <script id="carousel-surgical-interceptor">
            (function() {
                const myImages = [
                    './images/1.png',
                    './images/2.png',
                    './images/3.png',
                    './images/4.png',
                    './images/5.png'
                ];
                
                const fixOnlyCarousel = () => {
                    // EXTREMELY SPECIFIC CONTAINER
                    const carouselContainer = document.querySelector('.framer-1h12l0p-container');
                    if (!carouselContainer) return;
                    
                    // Only slots with this exact data name inside THIS container
                    const slots = carouselContainer.querySelectorAll('[data-framer-name="Wedding shoot (Do not delete)"]');
                    slots.forEach((slot, index) => {
                        const img = slot.querySelector('img');
                        if (img) {
                             const localSrc = myImages[index % myImages.length];
                             if (img.src.indexOf(localSrc.substring(2)) === -1) { // Check if already local
                                 img.src = localSrc;
                                 img.srcset = localSrc + ' 1080w';
                             }
                        }
                    });
                };
                
                // Run periodically and on interaction
                fixOnlyCarousel();
                setInterval(fixOnlyCarousel, 300);
                
                // Also catch button clicks on the arrows (they usually have these classes)
                document.addEventListener('click', () => setTimeout(fixOnlyCarousel, 50));
            })();
        </script>
    `;

    // Remove any old ones
    html = html.replace(/<script id="carousel-image-interceptor">[\s\S]*?<\/script>/g, '');
    html = html.replace(/<script id="carousel-surgical-interceptor">[\s\S]*?<\/script>/g, '');
    
    // Inject into head
    html = html.replace('</head>', interceptorJs + '\n</head>');
    
    fs.writeFileSync(indexHtml, html);
    console.log('Surgical Interceptor injected.');
}

injectSurgicalInterceptor();
