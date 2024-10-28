// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: !true },
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
      usdt_to_cny: process.env.USDT_TO_CNY,
      activeReceiver: process.env.ACTIVE_RECEIVER,
      resetPasswordReceiver: process.env.RESET_PASSWORD_RECEIVER,
      contactEmail: process.env.CONTACT_EMAIL,
      tgGroup: process.env.TG_GROUP,
      githubUrl: process.env.GITHUB_URL,
      youtubeUrl: process.env.YOUTUBE_URL,
      wallet_addr: process.env.WALLET_ADDR,
      wallet_qrcode: process.env.WALLET_QRCODE,
    },
  },
});
