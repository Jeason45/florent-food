import * as Sentry from '@sentry/nextjs'

/* La boîte noire de l'atelier (GlitchTip, glitchtip.jlstudio.dev) —
   branchée le 2026-09-09. Gated : sans SENTRY_DSN, rien ne s'active. */
export async function register() {
  if (process.env.SENTRY_DSN &&
      (process.env.NEXT_RUNTIME === 'nodejs' || process.env.NEXT_RUNTIME === 'edge')) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV,
      tracesSampleRate: 0,
    })
  }
}

export const onRequestError = Sentry.captureRequestError
