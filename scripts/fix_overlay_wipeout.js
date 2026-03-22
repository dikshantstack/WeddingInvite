const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Match and remove the static overlay from where it is currently placed
const overlayRegex = /<div id="overlay" style="position: fixed;[\s\S]*?<\/div><!--\/\$-->/;
const match = html.match(overlayRegex);

if (match) {
    console.log('Static overlay found. Removing...');
    html = html.replace(match[0], '<!--/$-->'); // Retain closing framer tag if we consumed it
} else {
    console.log('Static overlay with exact position: fixed template NOT found by regex. checking variations...');
    const startIdx = html.indexOf('<div id="overlay"');
    const endIdx = html.indexOf('</div><!--/$-->', startIdx);
    if (startIdx !== -1 && endIdx !== -1) {
         console.log('Safe match by index found for overlay. Removing...');
         const chunk = html.substring(startIdx, endIdx + 15); // Include </div><!--/$-->
         html = html.substring(0, startIdx) + '<!--/$-->' + html.substring(endIdx + 15);
    } else {
         console.log('No overlay markup found matching target chunk.');
    }
}

// 2. Prepend item creation logic to the Overlay Functionality script at bottom
const overlayScriptStart = '// Overlay Functionality';
const injection = `// Overlay Functionality
      // DYNAMIC OVERLAY INJECTION (To prevent React Hydration wipeout)
      if (!document.getElementById("overlay")) {
          const div = document.createElement('div');
          div.id = 'overlay';
          div.style = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(135deg, rgba(82, 10, 24, 0.98), rgba(28, 3, 8, 1)); display: flex; flex-direction: column; justify-content: center; align-items: center; z-index: 999999999 !important; color: white; opacity: 1; transition: opacity 0.8s ease-in-out;';
          div.innerHTML = \`
            <div style="text-align: center; max-width: 500px; padding: 40px 30px; border-radius: 12px; border: 1px solid rgba(249, 225, 179, 0.25); background: rgba(54, 7, 16, 0.5); backdrop-filter: blur(10px); box-shadow: 0 10px 30px rgba(0,0,0,0.6);">
              <h1 style="font-family: 'Cormorant Upright', serif; font-size: 44px; margin-bottom: 15px; color: #f9e1b3; letter-spacing: 3px; font-weight: 400;">Welcome to Our Wedding</h1>
              <p style="font-family: 'Cormorant Upright', serif; font-size: 19px; margin-bottom: 35px; color: #e1d2c1; letter-spacing: 1px; font-style: italic;">We are delighted to have you celebrate with us.</p>
              <button id="accept-btn" style="padding: 15px 50px; font-size: 18px; font-weight: 600; background: #c69f68; color: #2d0b14; border: none; border-radius: 30px; cursor: pointer; font-family: 'Cormorant Upright', serif; letter-spacing: 2px; text-transform: uppercase; box-shadow: 0 4px 15px rgba(0,0,0,0.4); transition: all 0.3s ease; animation: pulseOverlay 2s infinite;">Accept Invite</button>
            </div>
            <style>
              @keyframes pulseOverlay {
                0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(198, 159, 104, 0.7); }
                70% { transform: scale(1.03); box-shadow: 0 0 0 15px rgba(198, 159, 104, 0); }
                100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(198, 159, 104, 0); }
              }
              #accept-btn:hover { background: #d9b889; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.5); }
            </style>
          \`;
          document.body.appendChild(div);
      }`;

if (html.includes(overlayScriptStart)) {
    html = html.replace(overlayScriptStart, injection);
    console.log('Script injection updated!');
} else {
    console.log('Overlay functionality script marker not found!');
}

fs.writeFileSync('index.html', html);
console.log('Completed fix_overlay_wipeout!');
