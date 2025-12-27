import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

export interface SessionData {
  email: string;
  isLoggedIn: boolean;
}

export const sessionOptions = {
  password: process.env.SESSION_SECRET || 'complex_password_at_least_32_characters_long_for_security',
  cookieName: 'florent_admin_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
};

export async function getSession() {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}

// Admin users (en production, utilise une base de données)
export const ADMIN_USERS = [
  {
    email: 'jeason.lemoine@gmail.com',
    passwordHash: '$2b$10$pDLdHewSpqxX0F1YK0a/Xu1H.OBSVCqiN1tBNXIX5x7Q1thtGmkZW',
  },
  {
    email: 'florentcmtpro@gmail.com',
    passwordHash: '$2b$10$1Sk5ZbIjG.QFQmepy6S8ee5oqwb3mpizmw2ifEqrbuPAlCio//ZQy',
  },
];
