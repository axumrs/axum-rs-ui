// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ["@nuxt/icon"],
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
      hcaptchaSiteKey: process.env.HCAPTCHA_SITE_KEY,
      turnstileSiteKey: process.env.TURNSTILE_SITE_KEY,
      axum_csrf: process.env.AXUM_CSRF,
      fetch_timeout: process.env.FETCH_TIMEOUT,
      usdt_to_trx: process.env.USDT_TO_TRX,
      usdt_to_pointer: process.env.USDT_TO_POINTER,
    },
  },
});
