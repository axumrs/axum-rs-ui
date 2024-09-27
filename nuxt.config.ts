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
    },
  },
});
