# Hudson AI

Turborepo containing AI R&D projects.

## What's inside?

This monorepo includes the following packages/apps:

### Apps and Packages

- [Basechat](apps/basechat/README.md): a R&D [Next.js](https://nextjs.org/) app to explore the latest AI releases.
- [cv-ai-chat](apps/cv-ai-chat/README.md): A [Next.js](https://nextjs.org/) app UI that interacts with a RAG Node backend.
- [cv-ai-rag-uploader](apps/cv-ai-rag-uploader/README.md): A Node.js [LangChain](https://js.langchain.com/docs/get_started/introduction) RAG uploader to provide content for `cv-ai-chat`.
- [@repo/ui](packages/ui/README.md): Tailwind shared UI components for use in apps.
- [@repo/tailwind-config](packages/tailwind-config/README.md): Shared Tailwind configuration for apps and packages.
- [@repo/eslint-config](packages/config-eslint/README.md): `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- [@repo/typescript-config](packages/config-typescript/README.md): `tsconfig.json`s used throughout the monorepo

## Installation

`npm install`

### Usage

#### Basechat

`npm run dev -w 'apps/basechat'`

#### CV AI Chat

`npm run dev -w 'apps/cv-ai-chat'`

#### CV AI RAG Uploader

`npm run blog -w 'apps/cv-ai-rag-uploader'`
`npm run docs -w 'apps/cv-ai-rag-uploader'`
`npm run github -w 'apps/cv-ai-rag-uploader'`

#### UI

To build:
`npm run build -w 'packages/ui'`

To build & watch for changes:
`npm run dev -w 'packages/ui'`
