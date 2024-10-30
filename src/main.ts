import { createApp } from "vue";

import "vuetify/lib/styles/main.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { fa } from "vuetify/iconsets/fa";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import "@mdi/font/css/materialdesignicons.css";
import "@fortawesome/fontawesome-free/css/all.css";

import { createI18n } from "vue-i18n";
import { deDE } from "./locales/de-DE.ts";
import { enUS } from "./locales/en-US.ts";

import "./style.css";
import App from "./App.vue";

const app = createApp(App);

const vuetify = createVuetify({
  theme: {
    defaultTheme: "light",
  },
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
      fa,
    },
  },
  components,
  directives,
});

type MessageSchema = typeof enUS;

const i18n = createI18n<[MessageSchema], "en-US" | "de-DE">({
  locale: "de-DE",
  fallbackLocale: "en-US",
  messages: {
    "de-DE": deDE,
    "en-US": enUS,
  },
});

app.use(vuetify).use(i18n).mount("#app");
