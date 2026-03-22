const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const targetScript = `<script id="ultimate-watermark-killer-js">
    (function () {
      const fix = () => {`;

const injection = `<script id="ultimate-watermark-killer-js">
    (function () {
      const fix = () => {
        // Absolute Footer Copyright Text Override (To combat React Hydration)
        const copyright = document.querySelector('[data-framer-name="Copyright"] p');
        if (copyright && copyright.innerText.indexOf('Khushboo') === -1) {
            copyright.innerText = '© Khushboo Weds Kuldeep 2026';
        } f = document.querySelectorAll('[data-framer-name="Copyright"] p');`;

if (html.includes(targetScript)) {
    // Wait, let's make it simpler and cleaner
    const findStr = `const fix = () => {`;
    const replaceStr = `const fix = () => {
        const copyright = document.querySelector('[data-framer-name="Copyright"] p');
        if (copyright && !copyright.innerText.includes('Khushboo')) {
            copyright.innerText = '© Khushboo Weds Kuldeep 2026';
        }`;
    html = html.replace(findStr, replaceStr);
    console.log('Successfully injected footer lock in ultimate-watermark-killer-js!');
} else {
    console.log('ultimate-watermark-killer-js opening script block not found exact fit.');
}

fs.writeFileSync('index.html', html);
console.log('Footer fix applied.');
