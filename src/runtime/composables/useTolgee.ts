import {
  TolgeeProvider,
  T,
} from '@tolgee/vue';
import { computed, ref, useNuxtApp } from '#imports';

export function useTolgee() {
  const { $tolgee } = useNuxtApp();
  const tolgeeLanguage = ref($tolgee.getLanguage() ?? 'en');

  $tolgee.on('language', evt => (tolgeeLanguage.value = evt.value));

  const language = computed({
    get: () => tolgeeLanguage.value,
    set: (value) => {
      $tolgee.changeLanguage(value);
    },
  });

  return {
    TolgeeProvider: typeof TolgeeProvider,
    language,
    t: $tolgee.t,
    T,
  };
}
