const puppeteer = require('puppeteer');

// Load environment variables
const dotenv = require('dotenv');
dotenv.config();

let levels = ["https://sinerider.com/?N4IgdghgtgpiBcIDKBLMMBOKAmmAEAIhCgDYCeeACgK4BetJMeAxAIwgA04KAxgNYIQABzoMYAfXZdsGCAHcA8hlwYErAAyb1XAB4IAtBq5kE2kLgBmEaiQAuAUR1CMMAM6uUAezCD1nEADmnhAkrggA2qB68ABMxgZGILZkQnCIFig6MNggAL4cUQkAbPHw+gCcXMmpgthkkFC8eQUg0foALKUVVSlpIBlZOfmF8ADsXaxxSb2CA9nNI6ysXQCsPTXpmfO5ALpcrozYKmHwka1qayAQ7jC2gihQEAFuAHQQ2BDiB9stbZNc11ct3uj2erheACsIPwvoc8nsQAAjLywQQeMDUVyeHAhAhuTB3LgoVw0eiMBC2DDUGBcGBOFzuLxgBQAN0wWFwgherB0AD0YvoAMzqADUAB0xeiJYwLLYABTC2wSrABAAWtgAlHkgA==="]

let ticksPerSecond = 60;
let drawModulo = 3;
let timeout = 60 * 1000; // emergency timeout– if we're still computing after 60 seconds, something is probably wrong so throw an error

let page, browser
async function init() {
  browser = await puppeteer.connect({
    browserWSEndpoint: `wss://chrome.browserless.io?token=${process.env.BROWSERLESS_TOKEN}`,
  });
  page = (await browser.pages())[0];
}

async function getScore(url) {
  console.log("Getting score...")
  // await page.goto(`${url}&drawModulo=${drawModulo}`);
  await page.goto(`${url}&drawModulo=${drawModulo}&ticksPerSecond=${ticksPerSecond}`);
  await page.click('#loading-string');
  await page.click('#run-button');
  await Promise.any([
    // the game runs for 30 seconds
    page.waitForFunction(`Number.parseFloat(document.getElementById('run-button').innerText.replace("t=", "")) > 30`, {timeout}),
    // or the game is complete
    page.waitForFunction('document.getElementById("completion-time").innerText.length > 0', {timeout})
  ])

  const scoreTime = await page.evaluate('document.getElementById("time-taken").innerText')
  const scoreLength = await page.evaluate('document.getElementById("character-count").innerText')

  console.log({scoreTime, scoreLength})
}

;(async () => {
  await init()
  let settings = [
    // {ticksPerSecond: 2000, drawModulo: 5},
    {ticksPerSecond: 1000, drawModulo: 5},
    {ticksPerSecond: 90, drawModulo: 5},
    {ticksPerSecond: 120, drawModulo: 5},
    {ticksPerSecond: 240, drawModulo: 5},
    {ticksPerSecond: 60, drawModulo: 3},
    {ticksPerSecond: 90, drawModulo: 3},
    {ticksPerSecond: 120, drawModulo: 3},
    {ticksPerSecond: 240, drawModulo: 3},
    {ticksPerSecond: 60, drawModulo: 1},
    {ticksPerSecond: 90, drawModulo: 1},
    {ticksPerSecond: 120, drawModulo: 1},
    {ticksPerSecond: 240, drawModulo: 1},
  ]
  for (let setting of settings) {
    ticksPerSecond = setting.ticksPerSecond
    drawModulo = setting.drawModulo
    let startTs = Date.now()
    await Promise.all(levels.map(getScore))
    let endTs = Date.now()
    console.log("Total time:", (endTs - startTs) / 1000, "seconds at", ticksPerSecond, "ticks per second and", drawModulo, "draw modulo")
  }
  await browser.close()
})()