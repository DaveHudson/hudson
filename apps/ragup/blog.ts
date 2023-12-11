import { PuppeteerWebBaseLoader } from "langchain/document_loaders/web/puppeteer";

const loaderWithOptions = new PuppeteerWebBaseLoader("https://applification.net/posts/aiengineer/text", {
  launchOptions: {
    headless: "new",
  },
  gotoOptions: {
    waitUntil: "domcontentloaded",
  },
  async evaluate(page, browser) {
    await page.waitForFunction(
      'document.querySelector("main") && document.querySelector("main").textContent.length > 0'
    );
    const result = await page.evaluate(() => {
      return document.body.querySelector("main")?.textContent;
    });
    await browser.close();
    return result as string;
  },
});
const docsFromLoaderWithOptions = await loaderWithOptions.load();
console.log(docsFromLoaderWithOptions[0].pageContent);
