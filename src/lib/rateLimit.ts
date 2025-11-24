// Rate limiting simple en mémoire (pour petites applications)
// Pour production à grande échelle, utiliser Redis

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap: Map<string, RateLimitEntry> = new Map();

// Nettoyer les anciennes entrées toutes les 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap.entries()) {
    if (entry.resetTime < now) {
      rateLimitMap.delete(key);
    }
  }
}, 5 * 60 * 1000);

export interface RateLimitConfig {
  windowMs: number; // Fenêtre de temps en ms
  maxRequests: number; // Nombre max de requêtes
}

export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig = { windowMs: 60 * 1000, maxRequests: 5 } // 5 req/min par défaut
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  // Si pas d'entrée ou fenêtre expirée, créer nouvelle entrée
  if (!entry || entry.resetTime < now) {
    const resetTime = now + config.windowMs;
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime
    });

    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetTime
    };
  }

  // Vérifier si limite dépassée
  if (entry.count >= config.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime
    };
  }

  // Incrémenter compteur
  entry.count++;

  return {
    allowed: true,
    remaining: config.maxRequests - entry.count,
    resetTime: entry.resetTime
  };
}

export function getRateLimitHeaders(result: ReturnType<typeof checkRateLimit>) {
  return {
    'X-RateLimit-Limit': '5',
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': new Date(result.resetTime).toISOString(),
    ...(result.allowed ? {} : { 'Retry-After': Math.ceil((result.resetTime - Date.now()) / 1000).toString() })
  };
}
