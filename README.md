# OCPP Charge Point Simulator with Deno, Vue and Vuetify

## Deno 2.0

Deno is an open-source JavaScript runtime.

[Why Deno 2.0?](https://www.heise.de/blog/JavaScript-Runtime-Deno-2-0-Ist-die-neue-Version-das-bessere-Node-js-9987604.html)

Install Deno:

```pwsh
winget install DenoLand.Deno
```

Open new shell:

```bash
deno --version
deno 2.0.2 (stable, release, x86_64-pc-windows-msvc)
v8 12.9.202.13-rusty
typescript 5.6.2
```

## Project setup

Deno uses `Vite`as build tool.

Setup project (see more:
[Build a Vue.js App](https://docs.deno.com/runtime/tutorials/how_to_with_npm/vue/)):

```bash
deno run -A npm:create-vite
cd ./ocpp-charge-point-simulator-dashboard
deno install
```

## Run development server

Deno has an integrated development server:

```bash
deno task dev
```

## TypeScript

[TypeScript lernen: Eine Einführung in 80 Minuten](https://www.youtube.com/watch?v=_CaGUZNEobk)

## Vue 3

[Vue 3 Tutorial für Einsteiger](https://vuejs.de/artikel/vuejs-tutorial-deutsch-anfaenger/)

## Vuetify

[Setting up vue 3 with vuetify, icons and themes](https://www.the-koi.com/projects/setting-up-vue-3-with-vuetify-icons-and-themes/)

```bash
deno install npm:vuetify npm:vite-plugin-vuetify
deno install npm:@fortawesome/fontawesome-free npm:@mdi/font
```

## I18n

[What is Vue I18n?](https://vue-i18n.intlify.dev/guide/introduction.html)

```bash
deno install npm:vue-i18n@10
```

## Problem

### Basic Auth

Sending HTTP authorization header is not possible for a web socket.

[The protocol requires sending a header with the WebSocket connection](https://stackoverflow.com/questions/78848325/the-protocol-requires-sending-a-header-with-the-websocket-connection)
