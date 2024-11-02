import { createI18n } from 'vue-i18n'

import en_US from './locales/en-US.json' with { type: 'json' }
import de_DE from './locales/de-DE.json' with { type: 'json' }

const i18n = createI18n({
    locale: 'en-US',
    fallbackLocale: 'en-US',
    messages: {
        'en-US': {
            $vuetify: {
                ...en_US,
                dataFooter: {
                    itemsPerPageText: 'Items per page:',
                    pageText: '{0}-{1} of {2}',
                    itemsPerPageAll: 'All',
                },
            },
        },
        'de-DE': {
            $vuetify: {
                ...de_DE,
                dataFooter: {
                    itemsPerPageText: 'Einträge pro Seite:',
                    pageText: '{0}-{1} of {2}',
                    itemsPerPageAll: 'Alle',
                },
            },
        },
    },
    legacy: false,
})

export { i18n }
