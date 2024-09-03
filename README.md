## Description

This project is a form for creating a portfolio. All you have to do is operate the [server](https://github.com/octuniv/pf-server) and connect it to this project and make it work.

## Before Start

1. install dependencies from pnpm (about below)

```bash
dependencies:
@heroicons/react 2.1.5
clsx 2.1.1
lodash 4.17.21
next 15.0.0-rc.0
react 19.0.0-rc-6230622a1a-20240610
react-dom 19.0.0-rc-6230622a1a-20240610
zod 3.23.8

devDependencies:
@types/lodash 4.17.7               @types/react 18.3.3                dotenv 16.4.5                      eslint-config-next 15.0.0-rc.0     prettier 3.3.3                     tailwindcss 3.4.4
@types/node 20.14.8                @types/react-dom 18.3.0            eslint 9.9.1                       postcss 8.4.44                     prettier-plugin-tailwindcss 0.6.6  typescript 5.5.2
```

2. open httpserver from [this server](https://github.com/octuniv/pf-server)

3. convert name .env.example to .env, and set your httpServer address

## Installation

```bash
$ pnpm install
```

## Getting Start

First, run the development server:

```bash
$ pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
