// Load environment variables
const dotenv = require('dotenv');
dotenv.config();

const fs = require('fs');

const fetch = require('node-fetch');

const fileOutput = 'output/screencast.webm';

async function screencast() {
  const apiUrl = `https://chrome.browserless.io/screencast?token=${process.env.BROWSERLESS_TOKEN}`
  const script = fs.readFileSync('screencast-browser.js', 'utf8');
  return await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/javascript'
    },
    body: script
}).then(response => {
  if (response.ok) {
      return response.buffer(); // Read response as binary data
  } else {
      throw new Error('Failed to retrieve the webm file');
  }
})
.then(buffer => {
  fs.writeFileSync(fileOutput, buffer); // Save the buffer to a file
  console.log('Webm file saved successfully');
})
.catch(error => {
  console.error(error);
});
};

;(async () => {
  await screencast().catch(e => console.error(e))
})()