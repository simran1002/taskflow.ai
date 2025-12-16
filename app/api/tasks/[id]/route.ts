import { NextRequest } from 'next/server';
import connectDB from '@/lib/db';
import Task from '@/models/Task';
import { getCurrentUser } from '@/lib/auth';
import { z } from 'zod';
import mongoose from 'mongoose';

const updateTaskSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  status: z.enum(['todo', 'in-progress', 'completed']).optional(),
  dueDate: z.string().optional(),
});

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const user = await getCurrentUser(request);
    if (!user) {
      return Response.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return Response.json(
        { success: false, error: 'Invalid task ID' },
        { status: 400 }
      );
    }

    const task = await Task.findOne({
      _id: params.id,
      userId: user._id,
    });

    if (!task) {
      return Response.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      data: { task },
    });
  } catch (error) {
    console.error('Get task error:', error);
    return Response.json(
      { success: false, error: 'Failed to fetch task' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const user = await getCurrentUser(request);
    if (!user) {
      return Response.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = updateTaskSchema.parse(body);

    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return Response.json(
        { success: false, error: 'Invalid task ID' },
        { status: 400 }
      );
    }

    const updateData: Record<string, unknown> = {};
    if (validatedData.title) updateData.title = validatedData.title;
    if (validatedData.description !== undefined) updateData.description = validatedData.description;
    if (validatedData.priority) updateData.priority = validatedData.priority;
    if (validatedData.status) updateData.status = validatedData.status;
    if (validatedData.dueDate) {
      updateData.dueDate = new Date(validatedData.dueDate);
    }

    const task = await Task.findOneAndUpdate(
      { _id: params.id, userId: user._id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!task) {
      return Response.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      data: { task },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { success: false, error: error.issues[0]?.message || 'Validation error' },
        { status: 400 }
      );
    }

    console.error('Update task error:', error);
    return Response.json(
      { success: false, error: 'Failed to update task' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const user = await getCurrentUser(request);
    if (!user) {
      return Response.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return Response.json(
        { success: false, error: 'Invalid task ID' },
        { status: 400 }
      );
    }

    const task = await Task.findOneAndDelete({
      _id: params.id,
      userId: user._id,
    });

    if (!task) {
      return Response.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    console.error('Delete task error:', error);
    return Response.json(
      { success: false, error: 'Failed to delete task' },
      { status: 500 }
    );
  }
}

