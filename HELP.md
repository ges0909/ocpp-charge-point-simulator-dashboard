# OCPP Dashboard with Deno and Vue

## Deno 2.0

Install Deno 2.0:

Deno is the open-source JavaScript runtime.

```pwsh
winget install DenoLand.Deno
```

Check installation in a new shell:

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

## Project setup

Scaffold project with Vite ([Build a Vue.js App](https://docs.deno.com/runtime/tutorials/how_to_with_npm/vue/)):

```bash
deno run -A npm:create-vite
cd .\ocpp-dashboard
deno install
deno task dev
```

```bash
deno install npm:bootstrap npm:bootstrap-vue
deno uninstall npm:bootstrap npm:bootstrap-vue

deno install npm:vuetify npm:vite-plugin-vuetify
```

## Vue 3

- [Vue 3 Tutorial für Einsteiger](https://vuejs.de/artikel/vuejs-tutorial-deutsch-anfaenger/)
