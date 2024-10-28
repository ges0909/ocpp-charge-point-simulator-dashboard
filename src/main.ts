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

// import "./style.css";
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
        edit: "Ändern",
        remove: "Ladestation entfernen?",
        title: "Übersicht Ladestationen",
        form_title_add: "Neue Ladestation",
        form_title_edit: "Ladestation ändern",
      },
    },
    en: {
      message: {
        ok: "OK",
        cancel: "Cancel",
        add: "Add",
        edit: "Change",
        remove: "Remove the charging station?",
        title: "Overview o charging stations",
        form_title_add: "New charging station",
        form_title_edit: "Change charging station",
      },
    },
  },
});

app.use(vuetify).use(i18n).mount("#app");
