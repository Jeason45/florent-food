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
      beforeSend(event) {
        // Bug connu de Next.js : des bots envoient des POST avec un en-tête
        // next-action forgé (ex. "cachefn") vers des routes inexistantes.
        // Next.js échoue alors à rendre sa page 404 en RSC et lève cette
        // InvariantError — ce n'est pas un bug de l'application, on l'ignore
        // pour ne pas polluer la boîte noire avec du bruit de scan.
        const isNextRscInvariant = event.exception?.values?.some(
          (value) =>
            value.type === 'InvariantError' &&
            value.value?.includes('Expected RSC response')
        )
        return isNextRscInvariant ? null : event
      },
    })
  }
}

export const onRequestError = Sentry.captureRequestError
