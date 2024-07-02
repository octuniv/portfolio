## Before Start

1. install dependencies from pnpm (about below)

dependencies:
@heroicons/react 2.1.4
next 14.2.4
pg 8.12.0
react 18.3.1
react-dom 18.3.1
uuid 10.0.0
zod 3.23.8

devDependencies:
@types/node 20.14.9 eslint 8.57.0 prettier-plugin-tailwindcss 0.6.5
@types/react 18.3.3 eslint-config-next 14.2.4 tailwindcss 3.4.4
@types/react-dom 18.3.0 postcss 8.4.38 typescript 5.5.2
dotenv 16.4.5 prettier 3.3.2

2. install postgresql (https://www.postgresql.org/download/)

3. convert name .env.example to .env, and set your DB info

4. execute "pnpm seed" (only once)

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
