const fs = require('fs');

const path = 'fronted/pages/dsa.html';
let content = fs.readFileSync(path, 'utf8');

const mapping = {
  "Majority Element": "https://youtu.be/_xqIp2rj8bo?t=882",
  "Repeat & missing number": "https://youtu.be/0Fxc_jKj2vo?t=1321",
  "Merge 2 sorted array without extra space": "https://www.youtube.com/watch?v=-1cLK6PaLsQ&list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=27",
  "Single Number": "https://youtu.be/NWg38xWYzEg?t=1393",
  "Stock Buy & Sell": "https://youtu.be/WBzZCm46mFo?t=835",
  "Pow (x^n)": "https://youtu.be/WBzZCm46mFo?t=21",
  "Kadane's Algorithm": "https://youtu.be/9IZYqostl2M?t=760",
  "Container with most water": "https://www.youtube.com/watch?v=EbkMABpP52U",
  "Sort array of 0s, 1s & 2s": "https://www.youtube.com/watch?v=J48aGjfjYTI&list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=26",
  "3Sum": "https://www.youtube.com/watch?v=K-RsltkN63w",
  "4Sum": "https://www.youtube.com/watch?v=X6sL8JTROLY",
  "Search in 2d matrix": "https://youtu.be/LEFFjgt5i6w?t=882",
  "Next permutation": "https://youtu.be/-1cLK6PaLsQ?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&t=967",
  "Merge overlapping intervals": "https://youtu.be/2JzRBPCGqiY?t=184",
  "Longest substring without repeating": "https://youtu.be/V6mHTZCVXss?si=p7-mG0vjS1_QlsK",
  "Set matrix zeroes": "https://youtu.be/zGmLx6HsmH8?si=q86n3B0NlA3I0dD-",
  "Word search": "https://www.youtube.com/watch?v=m9TrCG1k5WE",
  "Product of array except self": "https://www.youtube.com/watch?v=TW2m8m_FNJE",
  "Subarray sum equals k": "https://youtu.be/KDH4mhFVvHw?si=LGsc4jbq5QZ0QnsO",
  "Find Duplicate": "https://youtu.be/0Fxc_jKj2vo?t=2000",
  "Count Inversions": "https://www.youtube.com/watch?v=ynnWDBTdVi0",
  "Spiral Matrix": "https://youtu.be/XMpdvwUObho?si=opqd98A9rm0GiTMG",
  "Search in Sorted matrix II": "https://youtu.be/LEFFjgt5i6w?si=E2QRmGvkNcrrv64t",
  "Trapping Rainwater": "https://www.youtube.com/watch?v=UHHp8USwx4M",
  "Sliding Window Maximum": "https://www.youtube.com/watch?v=XwG5cozqfaM",
  "Largest Rectangle in a Histogram": "https://www.youtube.com/watch?v=ysy1o-QEj3k",
  "Reverse Pairs": "https://www.youtube.com/watch?v=ynnWDBTdVi0",
  "Valid Palindrome": "https://youtu.be/dSRFgEs3a6A?si=WUcnajw8nRAsHlb4",
  "Valid Anagram": "https://youtu.be/dSRFgEs3a6A?si=WUcnajw8nRAsHlb4",
  "Reverse Words in String": "https://youtu.be/RitppzIdMCo?si=bLqHmxS1_C_HlODW",
  "Remove All Occurrences": "https://youtu.be/dSRFgEs3a6A?si=OP8Zzi_5VDRzKwju"
};

const rows = content.split(/(?=<tr>)/);

for (let i = 0; i < rows.length; i++) {
  let row = rows[i];
  
  if (row.includes('<thead>') || row.includes('<th ')) continue;

  const nameMatch = row.match(/<td style="text-align: left; font-weight: 500;">(.*?)<\/td>/);
  if (nameMatch) {
    const probName = nameMatch[1].trim();
    
    // Find precise link or fallback to search query
    let ytUrl = mapping[probName];
    if (!ytUrl) {
      ytUrl = 'https://www.youtube.com/results?search_query=' + encodeURIComponent('Apna College ' + probName);
    }

    // Only update the youtube link, preserve the rest of row
    // The previous script already added URLs, so we must replace whatever URL is inside the youtube anchor.
    // Replace URL in <a href="..." target="_blank" class="icon-link"><i class="fa-brands fa-youtube"></i></a>
    row = row.replace(/<a href="[^"]*" target="_blank" class="icon-link"><i class="fa-brands fa-youtube"><\/i><\/a>/, 
                      `<a href="${ytUrl}" target="_blank" class="icon-link"><i class="fa-brands fa-youtube"></i></a>`);
                      
    rows[i] = row;
  }
}

content = rows.join('');
fs.writeFileSync(path, content, 'utf8');
console.log('Update exact YouTube URLs complete');
