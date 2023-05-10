const puppeteer = require('puppeteer');
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');

// Load environment variables
const dotenv = require('dotenv');
dotenv.config();

let fps = 30;
let width = 1024;
let height = 768;
let drawModulo = 3;

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

let page, browser
async function init() {
  browser = await puppeteer.connect({
    browserWSEndpoint: `wss://chrome.browserless.io?token=${process.env.BROWSERLESS_TOKEN}`,
  });
  page = (await browser.pages())[0];
}

async function record(nick, url) {
  console.log("Rendering video for: ", nick)
  await page.setViewport({ width, height });
  const recorder = new PuppeteerScreenRecorder(page, {
    fps,
    videoFrame: {
      width,
      height,
    }
  });
  await page.goto(`${url}&drawModulo=${drawModulo}`);
  await page.click('#loading-string');
  await page.click('#run-button');

  const fileDetails = `fps_${fps}_width_${width}_height_${height}_modulo_${drawModulo}`;
  const ts = new Date().getTime()
  await recorder.start(`./output/video_${nick}_${fileDetails}.mp4`);
  await Promise.any([
    sleep(30000),
    page.waitForFunction('document.getElementById("completion-time").innerText.length > 0')
  ])
  await recorder.stop();
}

;(async () => {
  await init()
  let settings = [
    { fps: 30, width: 1024, height: 768, drawModulo: 3 },
    { fps: 30, width: 1024, height: 768, drawModulo: 2 },
    { fps: 30, width: 1024, height: 768, drawModulo: 1 },
    { fps: 60, width: 1024, height: 768, drawModulo: 3 },
    { fps: 60, width: 1024, height: 768, drawModulo: 2 },
    { fps: 60, width: 1024, height: 768, drawModulo: 1 },
  ]
  for (let i = 0; i < settings.length; i++) {
    let currentSettings = settings[i]
    fps = currentSettings.fps
    width = currentSettings.width
    height = currentSettings.height
    drawModulo = currentSettings.drawModulo
    console.log("Testing settings: ", currentSettings)
    await record('chaos', "https://sinerider.com/?N4IgdghgtgpiBcIDKBLMMBOKAmmAEAIhCgDYCeeACgK4BetJMeAxAIwgA04KAxgNYIQABzoMYAfXZdsGCAHcA8hlwYErAAyb1XAB4IAtBq5kE2kLgBmEaiQAuAUR1CMMAM6uUAezCD1nEADmnhAkrggA2qB68ABMxgZGILZkQnCIFig6MNggAL4cUQkAbPHw+gCcXMmpgthkkFC8eQUg0foALKUVVSlpIBlZOfmF8ADsXaxxSb2CA9nNI6ysXQCsPTXpmfO5ALpcrozYKmHwka1qayAQ7jC2gihQEAFuAHQQ2BDiB9stbZNc11ct3uj2erheACsIPwvoc8nsQAAjLywQQeMDUVyeHAhAhuTB3LgoVw0eiMBC2DDUGBcGBOFzuLxgBQAN0wWFwgherB0AD0YvoAMzqADUAB0xeiJYwLLYABTC2wSrABAAWtgAlHkgA===")
    await record('threes', "https://sinerider.com/?N4IgdghgtgpiBcACEBlAlmGAnNATbiAIhGgDYCeiACgK4BedpMiAxAEwAMIANMmGgGMA1gmQAHeoxgB9Tj2S4sEAO4B5LPiyiAjBz0deIAB6iAtLsPlRBhTABmEGqQAuAUSNisMAM7e0AezBREC5DAHN/CFJvUQBtUBMkbW1LM202Q2dyMTgkEDs0IxhcEABfXgTrVKQAVkzs3OQCopLyxEqkc2rEUwA2epzg5uKygF1DbyZcTRikeOM0gBZDCF8YZ2C0KAgwnwA6CFwIaUmR0vHkACMA2GC/MBpvfzwowh9sDcM0b1oGJlFnFgaDBDDAPF5fAEwKoAG7YHD4YIAZj2bAAOmj7himHZnAAKDF2JQCYDaUrARalIwYnBhAAWzgAlOY9tojCztM4ANS9LmE4mk8naXpUgB6bDKQA==")
    // await record('clocks', "https://sinerider.com/?N4IgdghgtgpiBcACEBlAlmGAnNATbiAIhGgDYCeiACgK4BedpMiAxAEwCMIANMmGgGMA1gmQAHeoxgB9Tj2S4sEAO4B5LPiyiOABj07eIAB6iAtLsPlRBhTABmEGqQAuAUSNisMAM7e0AezBREB15EABzfwhSb1EAbVATJA4AZktRADZDZ3IxOCQQXHJIKEEw/w1sYIAhEABfXkTtGxArJBacvOC7NCMYXHLKrQKAQXqAXUNvJlxNWKQE4zMAdkMIXxhnYLQoCHCfADoIXAhpaf6JwwAjANhgzexIUgBhCDByQLC0b1oGJlFnFgaDBDDAPF5fAEwKoAG7YHD4YIAHSRdiUAmAHDqmIArHVnCiBLh/ASkUw7M4ABRGcw6FE4cIAC2cAEoAHpsepAA")
    // await record('beach', "https://sinerider.com/?N4IgdghgtgpiBcACEBlAlmGAnNATbiAIhGgDYCeiACgK4BedpMiAxAEwDMIANMmGgGMA1gmQAHeoxgB9Tj2S4sEAO4B5LPiyiAjAAZ9u3iAAeogLR6j5UYYUwAZhBqkALgFFjYrDADOPtAD2YKIguvIgAOYBEKQ+ogDaoKZIZgBsVqIAHEYu5GJwSCD2aMYwuCAAvrxJ5tnI1ikArDl5BcjFpeUVALpGPky4mnFIiSai6cgQfjAuIWhQEBG+AHQAVhDC0v1llb3IAEaBsCGkARFoPi6ChDSYcUYXtAxMoi5YNDBGMJ7efoFgqgAbtgcPgQgAdcH2JQCYDGAB6bAqwG0qIqZlmFSAA===")
    // await record('never', "https://sinerider.com/?N4IgdghgtgpiBcACEBlAlmGAnNATbiAIhGgDYCeiACgK4BedpMiAxAEwCMIANMmGgGMA1gmQAHeoxgB9Tj2S4sEAO4B5LPiyiOABj07eIAB6iAtLsPlRBhTABmEGqQAuAUSNisMAM7e0AezBREB15EABzfwhSb1EAbVATJA4AZktRADZDZ3IxOCQQXHJIKEEw/w1sYIAhEABfXkTtGxArJBacvOC7NCMYXHLKrQKAQXqAXUNvJlxNWKQE4zMAdkMIXxhnYLQoCHCfADoIXAhpaf6JwwAjANhgzexIUgBhCDByQLC0b1oGJlFnFgaDBDDAPF5fAEwKoAG7YHD4YKmA4cEx1IA")
  }

  await browser.close();
})()