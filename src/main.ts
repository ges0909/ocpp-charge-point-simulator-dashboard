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
        title: "Ladestationen",
        title_add: "Ladestation hinzufügen",
        title_edit: "Ladestation ändern",
        actions: "Aktionen",
        connected: "Verbunden",
        disconnected: "Getrennt",
        header_name: "Bezeichnung",
        header_connectors: "Anschlüsse",
        header_connection_state: "Verbindungsstatus",
        header_charging_state: "Ladestatus",
        header_meter_value: "Verbrauch",
        header_backend_url: "Backend URL",
      },
    },
    en: {
      message: {
        ok: "OK",
        cancel: "Cancel",
        add: "Add",
        remove: "Remove charging station?",
        title: "Overview o charging stations",
        title_add: "Add charging station",
        title_edit: "Edit charging station",
        actions: "Actions",
        connected: "Connected",
        disconnected: "Disconnected",
        header_name: "Name",
        header_connectors: "Connectors",
        header_connection_state: "Connection state",
        header_charging_state: "Charging state",
        header_meter_value: "Consumption",
        header_backend_url: "Backend URL",
      },
    },
  },
});

app.use(vuetify).use(i18n).mount("#app");
