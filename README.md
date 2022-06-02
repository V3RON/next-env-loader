# next-env-loader

Load custom .env files depending on your environment in Next.js

## Description

Usually our apps run in at least three different configurations. With vanilla Next.js it's only possible to 
load `.env.development`, `.env.production` and `.env.test`, which is insufficient for good amount of use-cases.

This library create an abstraction layer responsible for loading your Dotenv files required for given environment.
It uses `envs` directory by default, but that can be easily changed through configuration object.

## Usage

1. Install this package using your favourite package manager

```shell
# NPM
npm install next-env-loader

# Yarn
yarn add next-env-loader

# PNPM
pnpm add next-env-loader
```

2. Update your `.next.config.js` and pass current environment name using `environment` property of config object

```javascript
const nextConfig = {}; // Your Next.js config
const nextEnvLoaderConfig = {
  environment: process.env.ENVIRONMENT, // Inform next-env-loader which environment is active
},

module.exports = withNextEnvLoader(nextConfig, nextEnvLoaderConfig);
```

3. Run your app and notice similar log entry

```shell
info  - Using environment variables from /your-app-dir/envs/.env.dev
```
