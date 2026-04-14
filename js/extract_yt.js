const fs = require('fs');

async function scrape() {
  try {
    const response = await fetch('https://dsa.apnacollege.in/');
    const content = await response.text();
    const regex = /https?:\/\/(www\.)?(youtube\.com|youtu\.be)[^\s\"\'\\\]]*/g;
    const matches = content.match(regex);
    if (matches) {
       console.log('Unique Youtube links found:');
       const unique = [...new Set(matches)];
       console.log(unique);
    } else {
       console.log('No links found in raw payload.');
    }
  } catch (e) {
    console.error(e);
  }
}
scrape();
