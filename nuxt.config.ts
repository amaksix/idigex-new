import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  ssr: true,

  nitro: {
   preset: 'vercel'
  },

  typescript: {
    shim: false
  },

  alias: {
    "@": fileURLToPath(new URL('./', import.meta.url)),
  },

  app: {
    head: {
      link: [
        { rel: 'shortcut icon', href: '/imgs/favicon.ico' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900&display=swap' },
        { rel: 'stylesheet', href: '/fonts/mona-sans/style.css' },
        { rel: 'stylesheet', href: '/css/plugins.css' },
        { rel: 'stylesheet', href: '/css/style.css' },
      ],
      script: [
        { src: '/js/charming.min.js' },
        { src: '/js/bootstrap.bundle.min.js' },
        { src: '/js/plugins.js' },
        { src: '/js/isotope.pkgd.min.js' },
        { src: '/js/wow.min.js' },
        { src: '/js/gsap.min.js' },
        { src: '/js/ScrollTrigger.min.js' },
        { src: '/js/ScrollSmoother.min.js' },
        { src: 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js' },
        { src: '/js/scripts.js', defer: true }
      ]
    }
  },

  css: [
    'swiper/css/bundle',
    '@/styles/globals.css'
  ],

  modules: [
    '@nuxtjs/i18n'
  ],

  build: {
    transpile: [
      '@nuxtjs/i18n'
    ]
  },

  i18n: {
  strategy: 'prefix_except_default',
   vueI18n: './i18n.config.ts',
  langDir: 'locales',   
  defaultLocale: 'en',
  detectBrowserLanguage: {
    useCookie: true,
    fallbackLocale: 'en'
  },
  locales: [
    { code: 'en', file: 'en.json', iso: 'en-US' },
    { code: 'lv', file: 'lv.json', iso: 'lv-LV' },
    { code: 'ru', file: 'ru.json', iso: 'ru-RU' }
  ],
   
},

  runtimeConfig: {
    public: {}

  }
})
