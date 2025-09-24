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
        { rel: 'shortcut icon', href: '/assets/imgs/favicon.ico' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900&display=swap' },
        { rel: 'stylesheet', href: '/assets/fonts/mona-sans/style.css' },
        { rel: 'stylesheet', href: '/assets/css/plugins.css' },
        { rel: 'stylesheet', href: '/assets/css/style.css' },
      ],
      script: [
        { src: '/assets/js/charming.min.js' },
        { src: '/assets/js/bootstrap.bundle.min.js' },
        { src: '/assets/js/plugins.js' },
        { src: '/assets/js/isotope.pkgd.min.js' },
        { src: '/assets/js/wow.min.js' },
        { src: '/assets/js/gsap.min.js' },
        { src: '/assets/js/ScrollTrigger.min.js' },
        { src: '/assets/js/ScrollSmoother.min.js' },
        { src: 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js' },
        { src: '/assets/js/scripts.js', defer: true }
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
    detectBrowserLanguage: {
      useCookie: true,
      fallbackLocale: 'en'
    },
    defaultLocale: 'en',
    langDir: 'locales/',
    locales: [
      { code: 'en', file: 'en.json' },
      { code: 'lv', file: 'lv.json' },
      { code: 'ru', file: 'ru.json' }
    ],
  },

  runtimeConfig: {
    public: {}
  }
})
