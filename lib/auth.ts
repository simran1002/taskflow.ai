import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import User, { IUser } from '@/models/User';
import connectDB from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';

export interface TokenPayload {
  userId: string;
  email: string;
}

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload as object, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
  } as jwt.SignOptions);
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

export async function getCurrentUser(
  request: NextRequest
): Promise<IUser | null> {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return null;
    }

    const payload = verifyToken(token);
    if (!payload) {
      return null;
    }

    await connectDB();
    const user = await User.findById(payload.userId).select('-password');
    return user;
  } catch {
    return null;
  }
}

export function createAuthResponse(
  user: IUser,
  status: number = 200
): NextResponse {
  const token = generateToken({
    userId: user._id.toString(),
    email: user.email,
  });

  const response = NextResponse.json(
    {
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
    },
    { status }
  );

  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });

  return response;
}

