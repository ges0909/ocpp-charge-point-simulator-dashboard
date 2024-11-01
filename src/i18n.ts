import {createI18n} from "vue-i18n";

import {deDE} from "./locale/de-DE.ts";
import {enUS} from "./locale/en-US.ts";

type MessageSchema = typeof enUS;

export const i18n = createI18n<[MessageSchema], "en-US" | "de-DE">({
    locale: "de-DE",
    fallbackLocale: "en-US",
    messages: {
        "en-US": enUS,
        "de-DE": deDE,
    },
});
