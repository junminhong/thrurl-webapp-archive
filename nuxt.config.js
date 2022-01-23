export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'thrurl-webapp',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  // element-ui/lib/theme-chalk/index.css
  css: ['element-ui/lib/theme-chalk/index.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '@/plugins/element-ui',
    ssr: true}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', '@nuxtjs/proxy'],
  axios: {
     proxy: true,
     headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  },
  proxy: {
    'heroku': {
      target: 'https://thrurl.herokuapp.com', 
      changeOrigin: true, 
    },
    '/api/v1/member/login': 'http://127.0.0.1:9010',
    '/api/v1/short-url': 'http://127.0.0.1:9020',
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
    vendor: ["axios"]
  },
}
