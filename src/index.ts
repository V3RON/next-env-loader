import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import nextLogger from 'next/dist/build/output/log';

import type { ExportedNextConfig, NextConfigObject, NextEnvLoaderOptions } from './types';

const DEFAULT_OPTIONS: Required<Omit<NextEnvLoaderOptions, 'environment'>> = {
  directory: './envs',
};

export default (nextConfig: ExportedNextConfig = {}, config: NextEnvLoaderOptions) => {
  const mergedConfig: Required<NextEnvLoaderOptions> = {
    ...DEFAULT_OPTIONS,
    ...config,
  };

  const envPath = path.resolve(path.join(mergedConfig.directory, `.env.${mergedConfig.environment.toLowerCase()}`));

  if (!fs.existsSync(envPath)) {
    throw new Error(`File ${envPath} not found`);
  }

  const envContent = dotenv.parse(fs.readFileSync(envPath));
  nextLogger.info(`Using environment variables from ${envPath}`);

  if (typeof nextConfig === 'function') {
    return function (phase: string, defaults: { defaultConfig: NextConfigObject }): Partial<NextConfigObject> {
      const configForPhase = nextConfig(phase, defaults);
      return {
        ...configForPhase,
        env: {
          ...envContent,
          ...configForPhase.env,
        },
      };
    };
  }

  return {
    ...nextConfig,
    env: {
      ...envContent,
      ...nextConfig.env,
    },
  };
};
