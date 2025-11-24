import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getIronSession } from 'iron-session';
import { SessionData, sessionOptions } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

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
  matcher: '/admin/:path*',
};
