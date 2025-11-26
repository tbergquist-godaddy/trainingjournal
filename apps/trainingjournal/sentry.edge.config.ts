import * as Sentry from '@sentry/nextjs';
Sentry.init({
  dsn: 'https://59f8f41241656edc572e84963169b2d3@o4510431512690688.ingest.us.sentry.io/4510431515246592',
  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
  // that it will also get attached to your source maps
});
