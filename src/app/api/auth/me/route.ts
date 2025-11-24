import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// 🔒 SÉCURITÉ: JWT_SECRET est obligatoire
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required for authentication');
}

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    // Vérifier le token
    const { payload } = await jwtVerify(token, JWT_SECRET);

    return NextResponse.json({
      authenticated: true,
      subscriber: {
        id: payload.subscriberId,
        email: payload.email,
        subscriptionType: payload.subscriptionType
      }
    });

  } catch (error) {
    console.error('❌ Error verifying token:', error);
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    );
  }
}
