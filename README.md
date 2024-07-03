## Before Start

1. install dependencies from pnpm (about below)

dependencies:
@heroicons/react 2.1.4
clsx 2.1.1
lodash 4.17.21
next 15.0.0-rc.0
pg 8.12.0
react 19.0.0-rc-6230622a1a-20240610
react-dom 19.0.0-rc-6230622a1a-20240610
uuid 10.0.0
zod 3.23.8

devDependencies:
@types/lodash 4.17.6 dotenv 16.4.5 prettier 3.3.2
@types/node 20.14.8 eslint 9.6.0 prettier-plugin-tailwindcss 0.6.5
@types/react 18.3.3 eslint-config-next 15.0.0-rc.0 tailwindcss 3.4.4
@types/react-dom 18.3.0 postcss 8.4.39 typescript 5.5.2

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
