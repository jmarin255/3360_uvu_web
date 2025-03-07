import express from 'express';
import puppeteer from 'puppeteer';

const app = express();
const port = 3001;

app.get('/projections', async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const url = 'https://app.prizepicks.com/';

  await page.setExtraHTTPHeaders({
    'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
    'sec-ch-ua-mobile': '?0',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Referer': 'https://app.prizepicks.com/',
    'X-Device-ID': '1a9d6304-65f3-4304-8523-ccf458d3c0c4',
    'sec-ch-ua-platform': '"macOS"'
  });

  await page.goto(url);
  const content = await page.evaluate(() => document.body.innerText);
  await browser.close();

  res.setHeader('Content-Type', 'application/json');
  res.send(content);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
