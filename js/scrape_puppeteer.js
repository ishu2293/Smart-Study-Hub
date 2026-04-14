const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrape() {
  console.log("Launching browser...");
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto('https://dsa.apnacollege.in/', { waitUntil: 'networkidle0' });

  // Click all accordion headers
  await page.evaluate(async () => {
     // Find headers
     const elements = Array.from(document.querySelectorAll('*'));
     const buttons = elements.filter(el => {
         return (el.tagName === 'DIV' || el.tagName === 'BUTTON') && el.innerText && el.innerText.match(/(Array|String|Linked List)/i) && el.children.length < 5;
     });
     
     buttons.forEach(b => {
         try { b.click(); } catch(e){}
     });
  });

  // wait a bit for rendering
  await new Promise(r => setTimeout(r, 2000));

  console.log("Extracting links...");
  const data = await page.evaluate(() => {
     const links = {};
     const ytAnchors = Array.from(document.querySelectorAll('a[href*="youtu.be"], a[href*="youtube.com/watch"]'));
     
     ytAnchors.forEach(a => {
        const row = a.closest('tr') || a.parentElement.parentElement;
        if (row && row.innerText) {
           let txt = row.innerText.replace(/\n|\t/g, ' ').replace(/\s+/g, ' ').trim();
           // some text cleanup
           txt = txt.split(' Easy')[0].split(' Medium')[0].split(' Hard')[0].trim();
           links[txt] = a.href;
        }
     });
     return links;
  });

  fs.writeFileSync('yt_links.json', JSON.stringify(data, null, 2));
  console.log(`Saved ${Object.keys(data).length} links to yt_links.json`);
  await browser.close();
}

scrape().catch(console.error);
