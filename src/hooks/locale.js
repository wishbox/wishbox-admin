import create from 'zustand'
import { t, locale } from '../i18n'

export const [useLocale] = create((set, get) => ({
    locale,

    lang: 'en',

    setLang: (lang) => {
      set({ lang })
    },

    t: (str, ...num) => {
      if (!str) return str

      const { lang } = get()

      if (typeof str === 'string') return t(str, lang)

      // TODO: make pluralize
      // TODO: make numeric insertions
      if (str.raw) str = String.raw.call(String, str, ...num)

      return t(str, lang)
    }
  })
)

export default useLocale
