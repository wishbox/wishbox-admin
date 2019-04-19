import fr from './fr.json'
import en from './en.json'

// l10n, i18n
export const locale = {
  fr, en
}

// possible percentage values
// %1, %2, ... - positional argument
// %s - string
// %d, %i - for number
// %x, %X - hexademal
// \% - escaped percent sign
// reference http://www.cplusplus.com/reference/cstdio/printf/

// take in message/error code, return translated text
export function t(key, lang = 'en') {
  if (!locale[lang] || !locale[lang][key]) return key;
  return locale[lang][key];
}
