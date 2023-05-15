module.exports = async ({ page, startScreencast, stopScreencast }) => {
  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  const width = 1024;
  const height = 768;

  /* this is weird– try swapping url and timerUrl and see what happens */
  /* timer works, but the regular url doesn't respect the await sleep */
  const url = "https://sinerider.com/?N4IgdghgtgpiBcIDKBLMMBOKAmmAEAIhCgDYCeeACgK4BetJMeAxAIwgA04KAxgNYIQABzoMYAfXZdsGCAHcA8hlwYErAAyb1XAB4IAtBq5kE2kLgBmEaiQAuAUR1CMMAM6uUAezCD1nEADmnhAkrggA2qB68ABMxgZGILZkQnCIFig6MNggAL4cUQkAbPHw+gCcXMmpgthkkFC8eQUg0foALKUVVSlpIBlZOfmF8ADsXaxxSb2CA9nNI6ysXQCsPTXpmfO5ALpcrozYKmHwka1qayAQ7jC2gihQEAFuAHQQ2BDiB9stbZNc11ct3uj2erheACsIPwvoc8nsQAAjLywQQeMDUVyeHAhAhuTB3LgoVw0eiMBC2DDUGBcGBOFzuLxgBQAN0wWFwgherB0AD0YvoAMzqADUAB0xeiJYwLLYABTC2wSrABAAWtgAlHkgA===?drawModulo=2";
  const timerUrl = "https://vclock.com/stopwatch"

  await page.setViewport({ width, height });

  await page.goto(url);
  startScreencast();
  await sleep(5 * 1000);
  stopScreencast();;
}