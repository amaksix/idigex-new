// i18n.config.ts
import defineI18nConfig from '@nuxtjs/i18n'

export default defineI18nConfig(() => ({
  legacy: false,
  defaultLocale: 'en',
  locales: [
    { code: 'en', iso: 'en-US', file: 'en.json', name: 'English' },
    { code: 'lv', iso: 'lv-LV', file: 'lv.json', name: 'Latviešu' },
    { code: 'ru', iso: 'ru-RU', file: 'ru.json', name: 'Русский' }
  ],
  lazy: true,
  langDir: 'locales/',
}))