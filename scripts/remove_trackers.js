const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const sizeBefore = html.length;

// Remove Slrgkgulru pixelflow pfm script
html = html.replace('<script src="https://slrgkgulru.pixelflow.so/pfm.js" async=""></script>', '');

// Remove Contentsquare Tracker
html = html.replace('<script src="https://t.contentsquare.net/uxa/ce8a8d35ab051.js"></script>', '');

// Remove Pixelflow inline setup block
// Match block starting from `!(function (p, i, x, f, l, o, w)` to `</script>`
const regexPixelflow = /<script>!\(function \(p, i, x, f, l, o, w\)[\s\S]*?<\/script>/;
html = html.replace(regexPixelflow, '');

const sizeAfter = html.length;

if (sizeBefore !== sizeAfter) {
    fs.writeFileSync('index.html', html);
    console.log('Successfully removed tracker scripts from index.html!');
} else {
    console.log('Tracker script content not found with exact match strings.');
    // Let's try matching via loose regex just to be safe
    html = html.replace(/<script src="https:\/\/slrgkgulru.pixelflow.so\/pfm.js".*?<\/script>/g, '');
    html = html.replace(/<script src="https:\/\/t.contentsquare.net\/uxa\/ce8a8d35ab051.js".*?<\/script>/g, '');
    html = html.replace(/<script>!\(function\s*\(p,\s*i,\s*x,\s*f.*?\bPixelFlowObject\b.*?<\/script>/g, '');
    
    if (html.length !== sizeBefore) {
        fs.writeFileSync('index.html', html);
        console.log('Successfully removed tracker scripts via regex!');
    } else {
        console.log('Regex also failed to match trackers!');
    }
}
