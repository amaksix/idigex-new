import { fileURLToPath } from 'node:url';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  

ssr:true,



  typescript: {
    shim: false
  },
  alias: {
    "@": fileURLToPath(new URL('./', import.meta.url)),
  },
  app: {
    head: {
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
        {src: 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js'},
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
    // Add all three locales here
     strategy: 'prefix_except_default',
    defaultLocale: 'en',
    langDir: 'locales/',
    locales: [
      { code: 'en', file: 'en.json' },
      { code: 'lv', file: 'lv.json' },
      { code: 'ru', file: 'ru.json' }
    ],
  }
  


})
