import { defineNuxtPlugin, useRuntimeConfig } from 'nuxt/app';

import {
  BackendFetch,
  DevTools,
  LanguageDetector,
  LanguageStorage,
  Tolgee,
  VueTolgee,
} from '@tolgee/vue';
import { FormatIcu } from '@tolgee/format-icu';

export default defineNuxtPlugin({
  name: 'tolgee',
  async setup(nuxt) {
    const {
      public: { tolgee: config },
    } = useRuntimeConfig();

    const tolgeeOpts = Tolgee()
      .use(DevTools())
      .use(FormatIcu())
      .use(LanguageDetector())
      .use(LanguageStorage());

    if (config.contentDeliveryURL) {
      tolgeeOpts.use(BackendFetch({ prefix: config.contentDeliveryURL })); // Use CDN files
    }
    else {
      tolgeeOpts.use(BackendFetch()); // Use local files
    }

    const tolgee = tolgeeOpts.init({
      apiKey: config.key,
      apiUrl: config.url,
      availableLanguages: config.languages,
      defaultLanguage: config.defaultLanguage,
      defaultNs: config.defaultNamespace,
      ns: config.namespaces,
      projectId: config.projectID,
    });

    nuxt.vueApp.use(VueTolgee, { tolgee });

    return {
      provide: {
        tolgee,
      },
    };
  },
});
