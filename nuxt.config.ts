import { fileURLToPath } from 'node:url';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  

ssr: true,


  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/en',
        '/lv',
        '/ru'
      ]
    }
  },

  typescript: {
    shim: false
  },
  alias: {
    "@": fileURLToPath(new URL('./', import.meta.url)),
  },
  app: {
    head: {
      title: "Bayone",
      htmlAttrs: {
        lang: 'en'
      },
      "meta": [
        {
          "name": "viewport",
          "content": "width=device-width, initial-scale=1"
        },
        {
          "charset": "utf-8"
        },
        {
          "http-equiv": 'X-UA-Compatible', content: "IE=edge"
        },
        {
          name: 'keywords',
          content: 'Vue Nuxtjs Template Bayone Multi-Purpose themeforest'
        },
        {
          name: 'description',
          content: 'Bayone - Multi-Purpose Vue Nuxtjs Template'
        },
        {
          name: 'author',
          content: 'UiCamp'
        }
      ],
      "link": [
        { rel: 'shortcut icon', href: '/assets/imgs/favicon.ico' },
        // Google Fonts
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900&display=swap' },
        // CSS
        { rel: 'stylesheet', href: '/assets/fonts/mona-sans/style.css' },
        { rel: 'stylesheet', href: '/assets/css/plugins.css' },
        { rel: 'stylesheet', href: '/assets/css/style.css' },
      ],
      "script": [
        { src: '/assets/js/bootstrap.bundle.min.js' },
        { src: '/assets/js/plugins.js' },
        { src: '/assets/js/isotope.pkgd.min.js' },
        { src: '/assets/js/wow.min.js' },
        { src: '/assets/js/gsap.min.js' },
        { src: '/assets/js/ScrollTrigger.min.js' },
        { src: '/assets/js/ScrollSmoother.min.js' },
        // { src: '/assets/js/smoother-script.js', defer: true },
        { src: '/assets/js/scripts.js', defer: true },
      ]
    }
  },
  css: [
    'swiper/css/bundle',
    '@/styles/globals.css'
  ],
  webpack: {
    extractCSS: true,
    optimization: {
      splitChunks: {
        layouts: true
      }
    }
  },
   modules: [
    '@nuxtjs/i18n'
  ],
 build: {
    transpile: [
      // Add the i18n module to the transpile list
      '@nuxtjs/i18n'
    ]
  },
  i18n: {
    // Defines your supported locales and their properties.
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en.json'
      },
      {
        code: 'fr',
        iso: 'fr-FR',
        name: 'Français',
        file: 'fr.json'
      }
    ],

    // The directory where your translation files will be stored.
    langDir: 'locales/',

    // The default locale your app will use.
    defaultLocale: 'en',

    // Strategy for handling routes. 'prefix_except_default' is best for SEO in SPA mode.
    // It adds a language prefix to all URLs except for the default language.
    // e.g., /about for English, /es/about for Spanish.
    strategy: 'prefix_except_default',

  }
})
