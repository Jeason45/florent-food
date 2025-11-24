import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'florent-food-secret-key-change-in-production'
);

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
