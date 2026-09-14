'use client'

/**
 * OpenReplay — l'enregistreur de sessions de l'atelier (14/09/2026).
 *
 * DORMANT par défaut : sans NEXT_PUBLIC_OPENREPLAY_KEY, rien n'est chargé
 * (l'import dynamique ne part qu'avec une clé). L'installateur de l'usine
 * (ou Coolify) pose la clé du projet client — seule action pour activer.
 *
 * Les sessions partent sur replay.jlstudio.dev (auto-hébergé, Europe).
 * RGPD : saisies masquées par défaut, emails obscurcis ; la mention
 * d'information vit sur l'écran de connexion.
 */

import { useEffect } from 'react'

const CLE = process.env.NEXT_PUBLIC_OPENREPLAY_KEY
const INGEST = process.env.NEXT_PUBLIC_OPENREPLAY_INGEST || 'https://replay.jlstudio.dev/ingest'

export default function OpenReplay() {
  useEffect(() => {
    if (!CLE) return
    const w = window as Record<string, any>
    if (w.__openreplayTracker) return
    import('@openreplay/tracker')
      .then(({ default: Tracker }) => {
        const tracker = new Tracker({
          projectKey: CLE,
          ingestPoint: INGEST,
          obscureTextEmails: true,
          obscureInputEmails: true,
          defaultInputMode: 1, // saisies masquées par défaut
        })
        tracker.start()
        w.__openreplayTracker = tracker
      })
      .catch(() => { /* jamais bloquant */ })
  }, [])

  return null
}
