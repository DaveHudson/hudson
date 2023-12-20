# Hudson AI

Turborepo containing AI R&D projects.

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- [Basechat](apps/basechat/README.md): a R&D [Next.js](https://nextjs.org/) app to explore the latest AI releases.
- [cv-ai-chat](apps/cv-ai-chat/README.md): A [Next.js](https://nextjs.org/) app UI that interacts with a RAG Node backend.
- [cv-ai-rag-uploader](apps/cv-ai-rag-uploader/README.md): A Node.js [LangChain](https://js.langchain.com/docs/get_started/introduction) RAG uploader to provide content for `cv-ai-chat`.
- `@repo/ui`: Tailwind shared UI components for use in apps.
- `@repo/tailwind-config`: Shared Tailwind configuration for apps and packages.
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo
