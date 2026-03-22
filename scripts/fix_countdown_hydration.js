const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const originalUpdate = `const timerElement = document.getElementById("countdown-timer");

        if (!timerElement) return;`;

const robustUpdate = `let timerElement = document.getElementById("countdown-timer");
        if (!timerElement) {
           // Fallback to container if React Hydration wiped out our ID
           const container = document.querySelector('.framer-6329rn-container');
           if (container) {
               timerElement = container.querySelector('p') || container.querySelector('div') || container;
           }
        }

        if (!timerElement) return;`;

if (html.includes(originalUpdate)) {
    html = html.replace(originalUpdate, robustUpdate);
    console.log('Countdown function updated with robust fallback!');
} else {
    console.log('Original countdown timer placeholder string not found exact match.');
    // Let's do regex for safe measure
    const regexCountdown = /const timerElement\s*=\s*document\.getElementById\("countdown-timer"\);[\s\S]*?if\s*\(!timerElement\)\s*return;/;
    if (regexCountdown.test(html)) {
         html = html.replace(regexCountdown, robustUpdate);
         console.log('Countdown function updated via regex!');
    } else {
         console.log('Failed to identify countdown block completely!');
    }
}

// 2. Add more catchall for watermark selectors into both CSS and JS setup
// We find ultimate-watermark-killer style block and expand selectors
const styleBlock = `[data-framer-name="Watermark"],
    [data-framer-name="Missing Piece Logo"],
    [data-framer-name="Buy button stack"],`;

const extendedStyle = `[data-framer-name*="Watermark"],
    [data-framer-name*="Logo"],
    [data-framer-name*="framer-badge"],
    [data-framer-name="Buy button stack"],`;

if (html.includes(styleBlock)) {
    html = html.replace(styleBlock, extendedStyle);
    console.log('CSS absolute selectors updated!');
}

// Update JS absolute selectors inside `ultimate-watermark-killer-js`
const jsSelectors = `document.querySelectorAll('.__framer-badge, #framer-badge-container, .__framer-editorbar, [data-framer-name="Watermark"]')`;
const extendedJsSelectors = `document.querySelectorAll('.__framer-badge, #framer-badge-container, .__framer-editorbar, [data-framer-name*="Watermark"], [data-framer-name*="Logo"], [data-framer-name*="framer-badge"]')`;

if (html.includes(jsSelectors)) {
    html = html.replace(jsSelectors, extendedJsSelectors);
    console.log('JS absolute selectors updated!');
}

fs.writeFileSync('index.html', html);
console.log('Fully repaired index elements!');
