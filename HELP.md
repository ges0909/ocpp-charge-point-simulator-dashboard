# OCPP Dashboard with Deno and Vue

## Deno 2.0

Deno is an open-source JavaScript runtime. [Why Deno 2.0?](https://www.heise.de/blog/JavaScript-Runtime-Deno-2-0-Ist-die-neue-Version-das-bessere-Node-js-9987604.html)

Install Deno:

```pwsh
winget install DenoLand.Deno
```

Check installation in new shell, because `PATH` variable was changed:

```bash
deno --version
deno 2.0.2 (stable, release, x86_64-pc-windows-msvc)
v8 12.9.202.13-rusty
typescript 5.6.2
```

Upgrade deno:

```bash
deno upgrade
deno --version
deno 2.0.3 (stable, release, x86_64-pc-windows-msvc)
v8 12.9.202.13-rusty
typescript 5.6.2
```

## Project Scaffolding

Setup project with Vite (see: [Build a Vue.js App](https://docs.deno.com/runtime/tutorials/how_to_with_npm/vue/)):

```bash
deno run -A npm:create-vite
cd .\ocpp-dashboard
deno install
```

## Development

```bash
deno task dev
```

## Vue 3

- [Vue 3 Tutorial für Einsteiger](https://vuejs.de/artikel/vuejs-tutorial-deutsch-anfaenger/)

## Vuetify

- [Setting up vue 3 with vuetify, icons and themes](https://www.the-koi.com/projects/setting-up-vue-3-with-vuetify-icons-and-themes/)

```bash
deno install npm:vuetify npm:vite-plugin-vuetify
deno install npm:@fortawesome/fontawesome-free npm:@mdi/font
```

## I18N

```bash
deno install npm:vue-i18n@10
```
