import "dotenv/config";
import { PuppeteerWebBaseLoader } from "langchain/document_loaders/web/puppeteer";
import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const sbApiKey = process.env.SUPABASE_API_KEY as string;
const sbUrl = process.env.SUPABASE_URL as string;
const openAIApiKey = process.env.OPENAI_API_KEY as string;

const webPages = [
  "https://applification.net/posts/aiengineer",
  "https://applification.net/posts/remix",
  "https://applification.net/posts/remixing-this-blog",
  "https://applification.net/posts/how-to-git-rebase",
  "https://applification.net/posts/xstate",
  "https://applification.net/posts/testing-library",
  "https://applification.net/posts/amplify-typescript",
  "https://applification.net/posts/why-i-hate-redux",
  "https://applification.net/posts/bdd-with-cypress",
  "https://applification.net/posts/service-workers-with-workbox-preact",
  "https://applification.net/posts/how-to-build-a-pwa",
  "https://applification.net/posts/pwa-splash-screens",
  "https://applification.net/posts/designing-pwa",
  "https://applification.net/posts/pwa-with-preact",
  "https://applification.net/posts/aws-appsyc-react-native",
  "https://applification.net/posts/a-week-with-blockchain-react",
  "https://applification.net/posts/fastlane-strider-cd-react-native",
  "https://applification.net/posts/how-i-setup-react-native-projects",
  "https://applification.net/posts/fixing-react-native-android-permissions",
  "https://applification.net/posts/react-native-custom-fonts",
  "https://applification.net/posts/react-native-local-data",
  "https://applification.net/posts/lottie-react-native",
  "https://applification.net/posts/fastlane-react-native-devops",
  "https://applification.net/posts/ui-flows-for-better-products",
];

const client = createClient(sbUrl, sbApiKey);

webPages.forEach(async (webPage) => {
  try {
    let text = await fetchWebPageText({ url: `${webPage}/text` });
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      separators: ["\n\n", "\n", " ", "", "##"], // default setting (## popular in markdown)
      chunkOverlap: 50,
    });

    const output = await splitter.createDocuments([text]);
    console.log("Chunks", output.length);

    // upload chunks to Supabase
    await SupabaseVectorStore.fromDocuments(output, new OpenAIEmbeddings({ openAIApiKey }), {
      client,
      tableName: "documents",
    });
  } catch (err) {
    console.error(err);
  }
});

async function fetchWebPageText({ url }: { url: string }) {
  const loaderWithOptions = new PuppeteerWebBaseLoader(url, {
    launchOptions: {
      headless: "new",
    },
    gotoOptions: {
      waitUntil: "domcontentloaded",
    },
    async evaluate(page, browser) {
      try {
        await page.waitForFunction(
          'document.querySelector("main") && document.querySelector("main").textContent.length > 0'
        );
        const result = await page.evaluate(() => {
          return document.body.querySelector("main")?.textContent;
        });
        return typeof result === "string" ? result : "";
      } catch (err) {
        console.error(err);
        return "";
      } finally {
        await page.close();
        await browser.close();
      }
    },
  });
  const docsFromLoaderWithOptions = await loaderWithOptions.load();
  // console.log(docsFromLoaderWithOptions[0].pageContent);
  return docsFromLoaderWithOptions[0].pageContent;
}
