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

const i18n = createI18n({
  locale: "de",
  fallbackLocale: "en",
  messages: {
    de: {
      message: {
        ok: "OK",
        cancel: "Abbrechen",
        add: "Hinzufügen",
        remove: "Ladestation entfernen?",
        title: "Übersicht Ladestationen",
        title_add: "Ladestation hinzufügen",
        title_edit: "Ladestation ändern",
        actions: "Aktionen",
      },
    },
    en: {
      message: {
        ok: "OK",
        cancel: "Cancel",
        add: "Add",
        remove: "Remove the charging station?",
        title: "Overview o charging stations",
        title_add: "Add charging station",
        title_edit: "Change charging station",
        actions: "Actions",
      },
    },
  },
});

app.use(vuetify).use(i18n).mount("#app");
