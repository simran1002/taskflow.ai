import { NextRequest } from 'next/server';
import connectDB from '@/lib/db';
import Task from '@/models/Task';
import { getCurrentUser } from '@/lib/auth';
import { z } from 'zod';

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().max(1000).optional().default(''),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  status: z.enum(['todo', 'in-progress', 'completed']).default('todo'),
  dueDate: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return Response.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');

    const query: { userId: typeof user._id; status?: string; priority?: string } = { userId: user._id };
    if (status) query.status = status;
    if (priority) query.priority = priority;

    const tasks = await Task.find(query).sort({ createdAt: -1 });

    return Response.json({
      success: true,
      data: { tasks },
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    return Response.json(
      { success: false, error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return Response.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = taskSchema.parse(body);

    await connectDB();

    const task = await Task.create({
      ...validatedData,
      dueDate: validatedData.dueDate ? new Date(validatedData.dueDate) : undefined,
      userId: user._id,
    });

    return Response.json(
      {
        success: true,
        data: { task },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { success: false, error: error.issues[0]?.message || 'Validation error' },
        { status: 400 }
      );
    }

    console.error('Create task error:', error);
    return Response.json(
      { success: false, error: 'Failed to create task' },
      { status: 500 }
    );
  }
}

