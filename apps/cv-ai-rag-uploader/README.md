# CV AI Chat RAG Uploader

> Various scripts for chunking & uploading content to the RAG database.

## RAG

This project uses Supabase with the vector extension to store RAG data, paired with LangChain to chunk & upload the documents to the vector databse.

For more details, see the docs:

- [https://js.langchain.com/docs/integrations/vectorstores/supabase](https://js.langchain.com/docs/integrations/vectorstores/supabase)

### Supabase Vector

#### Adding Markdown documents Supabase

`npm run sb-md`

#### Adding blog posts Supabase

`npm run sb-blog`

#### Adding Github Repository code Supabase

`npm run sb-github`

#### Delete all RAG data Supabase

`npm run sb-delete`

### Pinecone Vector

#### Adding Markdown documents Pinecone

`npm run pc-md`

#### Adding blog posts Pinecone

`npm run pc-blog`

#### Adding Github Repository code Pinecone

`npm run pc-github`

#### Delete all RAG data Pinecone

`npm run pc-delete`
