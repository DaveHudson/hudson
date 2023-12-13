# `ragup`

Looks for Markdown documents in `/docs` directory. Chunks the files and uploads do Supabase Vector Store.

## RAG

This project uses Supabase with the vector extension to store RAG data, paired with LangChain to chunk & upload the documents to the vector databse.

For more details, see the docs:

- [https://js.langchain.com/docs/integrations/vectorstores/supabase](https://js.langchain.com/docs/integrations/vectorstores/supabase)
- [https://scrimba.com/learn/langchain/supabase-setup-cocb84fce96a85fb50de02772](https://scrimba.com/learn/langchain/supabase-setup-cocb84fce96a85fb50de02772)

### Adding Markdown documents

`node --loader ts-node/esm ./index.ts`

### Adding blog posts

`node --loader ts-node/esm ./blog.ts`
