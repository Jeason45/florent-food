import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getIronSession } from 'iron-session';
import { SessionData, sessionOptions } from '@/lib/auth';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret');

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // ========================================
  // Protection des pages RECETTES (abonnés)
  // ========================================
  if (pathname.startsWith('/recettes/')) {
    const authToken = request.cookies.get('auth-token')?.value;
    console.log('🔒 Middleware: Accès recette détecté -', pathname, '- Token:', authToken ? 'présent' : 'absent');

    if (!authToken) {
      // Pas de cookie → rediriger vers l'accueil avec modal d'auth
      console.log('🚫 Middleware: Pas de token, redirection vers accueil');
      return NextResponse.redirect(new URL('/?auth=required', request.url));
    }

    try {
      // Vérifier le JWT
      const { payload } = await jwtVerify(authToken, JWT_SECRET);
      const subscriberId = payload.subscriberId as string;

      // Vérifier que l'abonné est toujours ACTIF en BDD
      const baseUrl = request.nextUrl.origin;
      const verifyResponse = await fetch(`${baseUrl}/api/auth/verify-subscriber`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscriberId })
      });

      const { active } = await verifyResponse.json();

      if (!active) {
        // Abonné désactivé/désinscrit → supprimer cookie et rediriger
        console.log('🚫 Middleware: Abonné non actif, redirection');
        const response = NextResponse.redirect(new URL('/?auth=expired', request.url));
        response.cookies.delete('auth-token');
        return response;
      }

      // Token valide ET abonné actif → laisser passer
      console.log('✅ Middleware: Accès autorisé pour', subscriberId);
      return NextResponse.next();
    } catch (error) {
      // Token invalide ou expiré → rediriger vers l'accueil
      console.log('🚫 Middleware: Token invalide', error);
      const response = NextResponse.redirect(new URL('/?auth=expired', request.url));
      // Supprimer le cookie invalide
      response.cookies.delete('auth-token');
      return response;
    }
  }

  // ========================================
  // Protection des pages ADMIN
  // ========================================
  // Protéger toutes les routes /admin sauf /admin/login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const response = NextResponse.next();
    const session = await getIronSession<SessionData>(
      request,
      response,
      sessionOptions
    );

    // Si pas de session, rediriger vers login
    if (!session.isLoggedIn) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Si connecté et essaie d'accéder à /admin/login, rediriger vers dashboard
  if (pathname === '/admin/login') {
    const response = NextResponse.next();
    const session = await getIronSession<SessionData>(
      request,
      response,
      sessionOptions
    );

    if (session.isLoggedIn) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/recettes/:path*'],
};
