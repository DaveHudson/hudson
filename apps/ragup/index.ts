import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";

/* Insert documents from Obsidian, manually dropped into this repos docs folder */
const loader = new DirectoryLoader("./docs", {
  ".md": (path) => new TextLoader(path),
});

const docs = await loader.load();
console.log("num docs", docs.length);
console.log({ docs });

/* Crawl Applification Blog for content and insert */
