import { NextRequest } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { createAuthResponse } from '@/lib/auth';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Please provide a valid email'),
  password: z.string().min(1, 'Password is required'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = loginSchema.parse(body);

    await connectDB();

    // Find user and include password for comparison
    const user = await User.findOne({ email: validatedData.email }).select('+password');
    
    if (!user) {
      return Response.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check password
    const isPasswordValid = await user.comparePassword(validatedData.password);
    if (!isPasswordValid) {
      return Response.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    return createAuthResponse(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { success: false, error: error.issues[0]?.message || 'Validation error' },
        { status: 400 }
      );
    }

    console.error('Login error:', error);
    return Response.json(
      { success: false, error: 'Failed to login' },
      { status: 500 }
    );
  }
}

