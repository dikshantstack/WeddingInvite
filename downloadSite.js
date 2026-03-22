const { chromium } = require('playwright');
const fs = require('fs');
const https = require('https');
const path = require('path');
const url = require('url');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const downloadedAssets = {};

  // Intercept ALL network requests and save them
  await page.route('**/*', async (route) => {
    const response = await route.fetch();
    const reqUrl = route.request().url();

    try {
      const body = await response.body();
      const parsedUrl = new URL(reqUrl);
      const filePath = './downloaded' + parsedUrl.pathname;
      const dir = path.dirname(filePath);

      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(filePath, body);
      downloadedAssets[reqUrl] = filePath;
    } catch (e) {}

    await route.fulfill({ response });
  });

  await page.goto('https://www.missingpieceinvites.com/demos/beach', {
    waitUntil: 'networkidle',
    timeout: 60000
  });

  // Scroll to load all lazy assets
  await page.evaluate(async () => {
    for (let i = 0; i < document.body.scrollHeight; i += 100) {
      window.scrollTo(0, i);
      await new Promise(r => setTimeout(r, 30));
    }
  });

  await page.waitForTimeout(5000);

  const html = await page.content();
  fs.writeFileSync('/Users/dikshantjangra/Documents/ProjectS/WeddingInvite/index.html', html);

  console.log(`✅ Downloaded ${Object.keys(downloadedAssets).length} assets!`);
  await browser.close();
})();