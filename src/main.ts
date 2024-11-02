import { createApp } from 'vue'

import 'vuetify/lib/styles/main.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { fa } from 'vuetify/iconsets/fa'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import '@fortawesome/fontawesome-free/css/all.css'

import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'
import { useI18n } from 'vue-i18n'
import { i18n } from './i18n.ts'

import './style.css'
import App from './App.vue'

const vuetify = createVuetify({
    locale: {
        adapter: createVueI18nAdapter({ i18n, useI18n }),
    },
    theme: {
        defaultTheme: 'light',
    },
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
            fa,
        },
    },
    components,
    directives,
})

const app = createApp(App)

app.use(vuetify)
app.use(i18n)

app.mount('#app')
