const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const args = process.argv.slice(2);
  const htmlPath = args[0];
  const pdfPath = args[1];

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const html = fs.readFileSync(htmlPath, 'utf8');
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.pdf({ path: pdfPath, format: 'A4' });
  await browser.close();
})();
