import { fileURLToPath } from 'node:url';
import { addImportsDir, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit';
import { defu } from 'defu';

import { exportTranslations } from './export';

// Module options TypeScript interface definition
export interface ModuleOptions {
  /**
   * Default language
   * @default 'en'
   * @description Set default language
   */
  defaultLanguage: string;

  /**
   * Default namespace
   * @default ''
   * @description Set default namespace
   */
  defaultNamespace?: string;

  /**
   * Hook
   * @default true
   * @description Auto retrieve translations on build
   */
  hook?: boolean;

  /**
   * Content Delivery
   * @default ''
   * @description Content Delivery URL
   */
  contentDeliveryURL?: string;

  /**
   * Tolgee apiKey
   * @default ''
   * @description Set your Tolgee apiKey
   */
  key: string;

  /**
   * Languages
   * @default []
   * @description Set available languages
   */
  languages: string[];

  /**
   * Namespaces
   * @default []
   * @description Namespaces to load
   */
  namespaces?: string[];

  /**
   * Tolgee URL
   * @default ''
   * @description Set your Tolgee instance url
   */
  url: string;

  /**
   * Project ID
   * @default ''
   * @description Set your Tolgee project ID
   */
  projectID: string;
}

export default defineNuxtModule<ModuleOptions>({
  // Default configuration options of the Nuxt module
  defaults: {
    defaultLanguage: 'en',
    defaultNamespace: '',
    hook: false,
    contentDeliveryURL: '',
    key: '',
    languages: [],
    namespaces: [],
    url: '',
    projectID: '',
  },

  meta: {
    configKey: 'tolgee',
    name: 'nuxt-tolgee',
  },
  async setup(options, nuxt) {
    nuxt.options.runtimeConfig.public.tolgee = defu(nuxt.options.runtimeConfig.public.tolgee, {
      defaultLanguage: options.defaultLanguage,
      defaultNamespace: options.defaultNamespace,
      key: nuxt.options.dev ? options.key : undefined,
      languages: options.languages,
      namespaces: options.namespaces,
      contentDeliveryURL: options.contentDeliveryURL,
      url: options.url,
      projectID: options.projectID,
    });

    const { resolve } = createResolver(import.meta.url);
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url));

    addPlugin(resolve('./runtime/plugin'));
    addImportsDir(resolve('./runtime/composables'));

    nuxt.options.build.transpile.push(runtimeDir);

    if (!nuxt.options.dev && !nuxt.options._prepare && options.hook)
      nuxt.hook('build:before', async () => await exportTranslations(options));
  },
});
