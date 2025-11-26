import * as Sentry from '@sentry/nextjs';
Sentry.init({
  dsn: 'https://4ec56e4974c869dfa3cd9cab724699b9@o4510431512690688.ingest.us.sentry.io/4510431658639360',
  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
});
// This export will instrument router navigations, and is only relevant if you enable tracing.
// `captureRouterTransitionStart` is available from SDK version 9.12.0 onwards
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
