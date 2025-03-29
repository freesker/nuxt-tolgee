# Nuxt Tolgee

⚠ To use this module, SSR must be disabled (`ssr: false` in `nuxt.config.ts`)

## Quick Setup

1. Add `@freesker/nuxt-tolgee` dependency to your project

```bash
pnpm add @freesker/nuxt-tolgee
```

2. Add `@freesker/nuxt-tolgee` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: ["@freesker/nuxt-tolgee"],
});
```

3. Configure module inside `nuxt.config.ts`

```js
export default defineNuxtConfig({
  tolgee: {
    // options
  },
});
```

4. Wrap content in `app.vue` with Provider

```js
<template>
  <TolgeeProvider>
    <template #fallback>
      <div>Loading...</div>
    </template>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </TolgeeProvider>
</template>

<script setup lang="ts">
import { TolgeeProvider } from '@tolgee/vue';
</script>
```

That's it! You can now use @freesker/nuxt-tolgee in your Nuxt app ✨

## Configuration

| Name                  | Type       | Default | Description                                            |
|-----------------------|------------|---------|--------------------------------------------------------|
| url                   | `string`   | /       | Your Tolgee instance url                               |
| key                   | `string`   | /       | Your Tolgee apiKey                                     |
| projectID             | `string`   | /       | Your Tolgee project ID                                  |
| contentDeliveryURL    | `string`   | /       | Content Delivery URL                                   |
| defaultLanguage       | `string`   | en      | Default language                                       |
| languages             | `string[]` | []      | List of all available languages                        |
| hook                  | `boolean`  | true    | Auto-retrieve translations from your instance on build |
| defaultNamespace      | `boolean`  | ''      | Default namespace used by useTolgee                 |
| namespaces            | `boolean`  | []      | Namespaces to download from platform                   |
## Usage

```html
<template>
  <p>{{ t('hello') }}</p>
  <!-- OR -->
  <p><T key-name="hello" /></p>

  <p>Current language: {{ language }}</p></template
>

<script setup lang="ts">
  const { t, language, T } = useTolgee()

  console.log(t("world"));
</script>
```

## Development

```bash

# Flox is used here to create a virtual dev environment with everything installed automatically using nix
# see https://flox.dev/docs/install-flox/ to install it

# Enable virtual environment
flox activate

# Install dependencies (automatically done with `flox activate`)
pnpm install

# Generate type stubs
pnpm dev:prepare

# Develop with the playground
pnpm dev

# Build the playground
pnpm dev:build

# Run ESLint
pnpm lint

# Run Vitest
pnpm test
pnpm test:watch

# Release new version
pnpm release

# Use tolgee-cli
pnpm run tolgee-cli
```