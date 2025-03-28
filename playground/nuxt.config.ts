export default defineNuxtConfig({
  modules: ['../src/module'],
  ssr: false,

  compatibilityDate: '2024-10-22',

  tolgee: {
    defaultLanguage: 'en',
    key: process.env.TOLGEE_KEY,
    languages: ['en', 'fr'],
    namespaces: ['namespace1'],
    url: process.env.TOLGEE_URL,
    projectID: process.env.TOLGEE_PROJECT_ID,
    contentDeliveryURL: process.env.TOLGEE_CONTENT_DELIVERY_URL,
  },
});
