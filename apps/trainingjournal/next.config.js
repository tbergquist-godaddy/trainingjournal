//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');
const { withSentryConfig } = require('@sentry/nextjs');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {},
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
  /** @type {(config: import('next').NextConfig) => import('next').NextConfig} */
  config =>
    withSentryConfig(config, {
      org: 'private-f60',
      project: 'javascript-nextjs',
      // Only print logs for uploading source maps in CI
      // Set to `true` to suppress logs
      silent: !process.env.CI,
    }),
];

module.exports = composePlugins(...plugins)(nextConfig);
