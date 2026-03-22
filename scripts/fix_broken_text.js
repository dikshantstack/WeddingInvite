const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Broken chunk exactly as printed in step output
const brokenSearch = `                  <div class="framer-2mBa6 framer-92bqda framer-v-92bqda" data-framer-name="Desktop                     <div class="framer-1xeng68" data-framer-name="Aaditya"
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
                    </div>     class="framer-text">Khushboo</p>
                    </div>
                  </div><!--/$-->`;

const fixedReplacement = `                  <div class="framer-2mBa6 framer-92bqda framer-v-92bqda" data-framer-name="Desktop + tablet"
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

if (html.includes(brokenSearch)) {
    html = html.replace(brokenSearch, fixedReplacement);
    fs.writeFileSync('index.html', html);
    console.log('Successfully fixed broken chunk!');
} else {
    console.log('Broken chunk not found with exact match, testing single-line trims...');
    // Fallback regex to match across broken structures safely
    const regex = /data-framer-name="Desktop\s+<div class="framer-1xeng68"[\s\S]*?class="framer-text">Kuldeep<\/p>\s+<\/div>\s+class="framer-text">Khushboo<\/p>\s+<\/div>\s+<\/div><!--\/\$-->/;
    if (regex.test(html)) {
        console.log('Regex matched! Fixing...');
        // Easier to just use index bounds or exact string from view if exact match fails
    } else {
        // Just recreate index.html or use targeted replace without relying on exact multiline fit
        // Let's print out lines to be sure what we have
    }
}
