# Deno 2.0

```pwsh
winget install DenoLand.Deno
```

Restart shell:

```pwsh
deno --version
deno 2.0.2 (stable, release, x86_64-pc-windows-msvc)
v8 12.9.202.13-rusty
typescript 5.6.2
```

Create Vue.js project:

```pwsh
deno run -A npm:create-vite
cd .\ocpp-dashboard\
deno install
deno task dev
```
