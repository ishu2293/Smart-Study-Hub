const fs = require('fs');

const path = 'e:/Smart-Study-Hub/fronted/pages/dsa.html';
let content = fs.readFileSync(path, 'utf8');

const companies = [
  { name: 'Amazon', domain: 'amazon.com' },
  { name: 'Microsoft', domain: 'microsoft.com' },
  { name: 'Apple', domain: 'apple.com' },
  { name: 'Meta', domain: 'meta.com' },
  { name: 'Adobe', domain: 'adobe.com' },
  { name: 'Google', domain: 'google.com' },
  { name: 'Uber', domain: 'uber.com' },
  { name: 'Netflix', domain: 'netflix.com' }
];

let currentIndex = 0;
// We look for any c-logo div. The exact string in html is:
// <div class="c-logo" title="Google" style="background:#fff;"><img src="https://www.google.com/s2/favicons?domain=google.com&sz=128" alt="logo"></div>
const regex = /<div class="c-logo"[^>]*><img src="[^"]*favicons\?domain=[^&]*&sz=128" alt="logo"><\/div>/g;

content = content.replace(regex, (match) => {
  // Pick randomly
  const company = companies[Math.floor(Math.random() * companies.length)];
  return `<div class="c-logo" title="${company.name}" style="background:#fff;"><img src="https://www.google.com/s2/favicons?domain=${company.domain}&sz=128" alt="logo"></div>`;
});

fs.writeFileSync(path, content, 'utf8');
console.log('Replaced all occurrences.');
