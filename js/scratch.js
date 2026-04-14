const fs = require('fs');

const path = 'fronted/pages/dsa.html';
let content = fs.readFileSync(path, 'utf8');

const slugMap = {
  'Majority Element': 'majority-element',
  'Repeat & missing number': 'set-mismatch',
  'Merge 2 sorted array without extra space': 'merge-sorted-array',
  'Single Number': 'single-number',
  'Stock Buy & Sell': 'best-time-to-buy-and-sell-stock',
  'Pow (x^n)': 'powx-n',
  'Kadane\'s Algorithm': 'maximum-subarray',
  'Container with most water': 'container-with-most-water',
  'Sort array of 0s, 1s & 2s': 'sort-colors',
  '3Sum': '3sum',
  '4Sum': '4sum',
  'Search in 2d matrix': 'search-a-2d-matrix',
  'Next permutation': 'next-permutation',
  'Merge overlapping intervals': 'merge-intervals',
  'Longest substring without repeating': 'longest-substring-without-repeating-characters',
  'Set matrix zeroes': 'set-matrix-zeroes',
  'Word search': 'word-search',
  'Product of array except self': 'product-of-array-except-self',
  'Subarray sum equals k': 'subarray-sum-equals-k',
  'Find Duplicate': 'find-the-duplicate-number',
  'Count Inversions': 'global-and-local-inversions',
  'Spiral Matrix': 'spiral-matrix',
  'Search in Sorted matrix II': 'search-a-2d-matrix-ii',
  'Trapping Rainwater': 'trapping-rain-water',
  'Sliding Window Maximum': 'sliding-window-maximum',
  'Largest Rectangle in a Histogram': 'largest-rectangle-in-histogram',
  'Reverse Pairs': 'reverse-pairs',
  'Valid Palindrome': 'valid-palindrome',
  'Valid Anagram': 'valid-anagram',
  'Reverse Words in String': 'reverse-words-in-a-string',
  'Remove All Occurrences': 'remove-all-occurrences-of-a-substring'
};

const playlistURL = 'https://www.youtube.com/playlist?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt';

const rows = content.split(/(?=<tr>)/);

for (let i = 0; i < rows.length; i++) {
  let row = rows[i];
  
  // Exclude table headers
  if (row.includes('<thead>') || row.includes('<th ')) continue;

  // Find problem name in the row
  const nameMatch = row.match(/<td style="text-align: left; font-weight: 500;">(.*?)<\/td>/);
  if (nameMatch) {
    const probName = nameMatch[1].trim();
    
    // Fallback URL
    let leetcodeUrl = 'https://leetcode.com/problemset/all/?search=' + encodeURIComponent(probName);
    if (slugMap[probName]) {
      leetcodeUrl = 'https://leetcode.com/problems/' + slugMap[probName] + '/';
    }

    // Youtube URL - can link directly to a search query for the specific topic in Apna College channel
    const ytUrl = 'https://www.youtube.com/results?search_query=' + encodeURIComponent('Apna College ' + probName);

    // Now replace the generic href="#" for the icons
    // The youtube icon contains fa-youtube
    // The practice icon contains fa-code
    
    // Replace youtube link
    row = row.replace(/<a href="#" class="icon-link"><i class="fa-brands fa-youtube"><\/i><\/a>/, 
                      `<a href="${ytUrl}" target="_blank" class="icon-link"><i class="fa-brands fa-youtube"></i></a>`);
                      
    // Replace practice link
    row = row.replace(/<a href="#" class="icon-link"><i class="fa-solid fa-code"><\/i><\/a>/, 
                      `<a href="${leetcodeUrl}" target="_blank" class="icon-link"><i class="fa-solid fa-code"></i></a>`);
    
    rows[i] = row;
  }
}

content = rows.join('');
fs.writeFileSync(path, content, 'utf8');
console.log('Update HTML complete');
