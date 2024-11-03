import { createI18n } from 'vue-i18n'

import { de, en } from 'vuetify/locale'

import messagesEN from './locales/en-US.json' with { type: 'json' }
import messagesDE from './locales/de-DE.json' with { type: 'json' }

const i18n = createI18n({
	locale: 'de',
	fallbackLocale: 'en',
	messages: {
		'en': {
			$msg: {
				...messagesEN,
			},
			$vuetify: {
				...en,
			},
		},
		'de': {
			$msg: {
				...messagesDE,
			},
			$vuetify: {
				...de,
			},
		},
	},
	// Must be set to 'false', to use Composition API
	legacy: false,
})

export { i18n }
