import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { useLogger } from '@nuxt/kit';
import type { ModuleOptions } from '@nuxt/schema';
import { unzip } from 'unzipit';

const logger = useLogger('nuxt:tolgee');
const publicFolder = 'public/i18n';

interface TolgeeExport {
  filterNamespace?: string[];
  format: 'JSON' | 'XLIFF';
  zip: boolean;
}

export const exportTranslations = async (options: ModuleOptions) => {
  if (!options.url || !options.key) {
    logger.warn('Skipping Tolgee hook, missing URL or API Key');
    return;
  }

  logger.info('Retrieving translations');

  try {
    const body: TolgeeExport = {
      format: 'JSON',
      zip: true,
    };

    if (options.namespaces) {
      body.filterNamespace = options.namespaces;
    }

    const response = await fetch(`${options.url}/v2/projects/export`, {
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': options.key,
      },
      method: 'POST',
    });

    const blob = await response.blob();

    mkdirSync(publicFolder, { recursive: true });

    if (options.namespaces && options.namespaces.length > 0)
      for (const ns of options.namespaces)
        mkdirSync(join(publicFolder, ns), { recursive: true });

    const { entries } = await unzip(blob);

    for (const entry in entries) {
      const file = entries[entry];

      const buffer = await file.arrayBuffer();
      writeFileSync(join(publicFolder, file.name), new DataView(buffer));

      logger.info(`Found ${file.name}`);
    }
  }
  catch (error) {
    throw new Error(`Error during Tolgee fetch: ${error}`);
  }
};
