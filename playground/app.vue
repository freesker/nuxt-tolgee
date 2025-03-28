<template>
  <TolgeeProvider>
    Nuxt module playground! {{ t('Current language') }} {{ language }}

    <button
      v-if="language == 'fr'"
      @click="language = 'en'"
    >
      {{ t('Change to EN') }}
    </button>
    <button
      v-else-if="language == 'en'"
      @click="language = 'fr'"
    >
      {{ t('Change to FR') }}
    </button>

    <ul>
      <li>{{ t('test', { ns: 'namespace1' }) }}</li>
      <li>{{ t('test') }}</li>
      <li>
        <T
          key-name="test"
          ns="namespace1"
        />
      </li>
    </ul>
  </TolgeeProvider>
</template>

<script setup lang="ts">
import { useTolgee } from '../src/runtime/composables/useTolgee';

const { t, language, TolgeeProvider, T } = useTolgee();
</script>
