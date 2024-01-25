import "dotenv/config";
import { PuppeteerWebBaseLoader } from "langchain/document_loaders/web/puppeteer";
import { OpenAIEmbeddings } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/community/vectorstores/pinecone";
import { v4 as uuidv4 } from "uuid";

const pineconeIndexName = process.env.PINECONE_INDEX_NAME as string;
const openAIApiKey = process.env.OPENAI_API_KEY as string;

if (!pineconeIndexName || !openAIApiKey) {
  console.error("Environment variables not set");
  process.exit(1);
}

const pinecone = new Pinecone();
const pineconeIndex = pinecone.Index(pineconeIndexName);

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

webPages.forEach(async (webPage) => {
  try {
    let text = await fetchWebPageText({ url: `${webPage}/text` });
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      separators: ["\n\n", "\n", " ", "", "##"], // default setting (## popular in markdown)
      chunkOverlap: 50,
    });

    const docs = await splitter.createDocuments([text]);

    for (const doc of docs) {
      doc.metadata = { ...doc.metadata, source: webPage, id: uuidv4(), sourcetype: "blog" };
    }

    // upload chunks to Pinecone
    await PineconeStore.fromDocuments(docs, new OpenAIEmbeddings(), {
      // @ts-expect-error
      pineconeIndex,
      maxConcurrency: 5,
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
