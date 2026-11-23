#Home page<img width="606" height="719" alt="Screenshot 2026-08-23 152325" src="https://github.com/user-attachments/assets/7b6f739d-6c20-49ac-8f0f-e707efcd4a17" />

#login/signup page<img width="1920" height="1080" alt="Screenshot 2026-09-03 135841" src="https://github.com/user-attachments/assets/7ae13e89-8631-4f21-abe1-cf57146a62dd" />

#player page<img width="1920" height="1080" alt="Screenshot 2026-09-04 181834" src="https://github.com/user-attachments/assets/a836756f-56ab-44b8-b8bb-5dfbbf10d8bb" />



# frontofbet


This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

The live football page uses the Sportmonks Football API through a local server-side
proxy. Create an account at [Sportmonks](https://my.sportmonks.com/register), then
open **API → Tokens** in its dashboard and create a token. In the project folder,
copy `.env.example` to `.env`, set `SPORTMONKS_API_TOKEN` to that token, and restart
the development server. Never add the token to frontend code or share it in chat.
Available leagues depend on your Sportmonks plan. Production deployments must
route `/api/football` to `server/football.js` through an HTTPS reverse proxy.

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Player photo credits

- Bukayo Saka and Mohamed Salah: Bryan Berlin / WikiPortraits, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). [Saka](https://commons.wikimedia.org/wiki/File:Bukayo_Saka_England_v_Ghana_23_June_2026-057.jpg), [Salah](https://commons.wikimedia.org/wiki/File:Mohamed_Salah_Argentina_v_Egypt_7_July_2026-159.jpg).
- Harry Kane: Oleg Bkhambri (Voltmetro), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). [Source](https://commons.wikimedia.org/wiki/File:Harry_Kane_2018-07-03_1.jpg).
- Phil Foden: Hossein Zohrevand / Tasnim News Agency, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). [Source](https://commons.wikimedia.org/wiki/File:Phil_Foden_2022-11-21_1.jpg).
