const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const startBroken = html.indexOf('framer-2mBa6 framer-92bqda framer-v-92bqda');
const endBroken = html.indexOf('<!--/$-->', startBroken);

if (startBroken !== -1 && endBroken !== -1) {
    const replacement = `framer-2mBa6 framer-92bqda framer-v-92bqda" data-framer-name="Desktop + tablet"
                    style="width: 100%; opacity: 1;">
                    <div class="framer-1xeng68" data-framer-name="Aaditya"
                      style="--extracted-r6o4lv: rgb(230, 210, 255); --framer-paragraph-spacing: 0px; transform: none; opacity: 1;"
                      data-framer-component-type="RichTextContainer">
                      <p style="--font-selector:R0Y7Q29ybW9yYW50 IFVwcmlnaHQtcmVndWxhcg==;--framer-font-family:&quot;Cormorant Upright&quot;, &quot;Cormorant Upright Placeholder&quot;, serif;--framer-font-size:150px;--framer-line-height:190.1%;--framer-text-alignment:center;--framer-text-color:var(--extracted-r6o4lv, rgb(230, 210, 255))"
                        class="framer-text">Khushboo</p>
                    </div>
                    <div class="framer-3lgz0f" data-framer-name="&amp;"
                      style="--extracted-r6o4lv: rgb(230, 210, 255); --framer-paragraph-spacing: 0px; transform: none; opacity: 1;"
                      data-framer-component-type="RichTextContainer">
                      <p style="--font-selector:R0Y7Q29ybW9yYW50 IFVwcmlnaHQtcmVndWxhcg==;--framer-font-family:&quot;Cormorant Upright&quot;, &quot;Cormorant Upright Placeholder&quot;, serif;--framer-font-size:156px;--framer-line-height:110%;--framer-text-color:var(--extracted-r6o4lv, rgb(230, 210, 255))"
                        class="framer-text">&amp;</p>
                    </div>
                    <div class="framer-2fhrb9" data-framer-name="Veera"
                      style="--extracted-r6o4lv: rgb(230, 210, 255); --framer-paragraph-spacing: 0px; transform: none; opacity: 1;"
                      data-framer-component-type="RichTextContainer">
                      <p style="--font-selector:R0Y7Q29ybW9yYW50LXJlZ3VsYXI=;--framer-font-family:&quot;Cormorant&quot;, &quot;Cormorant Placeholder&quot;, serif;--framer-font-size:150px;--framer-line-height:60.1%;--framer-text-alignment:center;--framer-text-color:var(--extracted-r6o4lv, rgb(230, 210, 255))"
                        class="framer-text">Kuldeep</p>
                    </div>
                  </div><!--/$-->`;

    html = html.substring(0, startBroken) + replacement + html.substring(endBroken + 9);
    fs.writeFileSync('index.html', html);
    console.log('Successfully fixed broken chunk with index replacement!');
} else {
    console.log('Broken segment NOT found by class name!');
}
