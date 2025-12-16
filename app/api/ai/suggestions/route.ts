import { NextRequest } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import connectDB from '@/lib/db';
import Task from '@/models/Task';
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return Response.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== 'string') {
      return Response.json(
        { success: false, error: 'Prompt is required' },
        { status: 400 }
      );
    }

    await connectDB();
    const recentTasks = await Task.find({ userId: user._id })
      .sort({ createdAt: -1 })
      .limit(10)
      .select('title description priority status');

    const context = recentTasks.length > 0
      ? `User's recent tasks:\n${recentTasks.map(t => `- ${t.title} (${t.priority} priority, ${t.status})`).join('\n')}`
      : 'User has no recent tasks.';

    const systemPrompt = `You are an AI assistant helping users manage their tasks. Based on the user's request and their task history, provide helpful suggestions for task management. Be concise and practical.`;

    const result = await generateText({
      model: openai('gpt-4o-mini'),
      system: systemPrompt,
      prompt: `Context: ${context}\n\nUser request: ${prompt}\n\nProvide helpful task management suggestions:`,
      maxTokens: 500 as unknown as number,
    });

    return Response.json({
      success: true,
      data: {
        suggestion: result.text,
      },
    });
  } catch (error: unknown) {
    console.error('AI suggestion error:', error);
    
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes('API key') || errorMessage.includes('OPENAI')) {
      return Response.json(
        {
          success: false,
          error: 'AI features require OpenAI API key. Please configure OPENAI_API_KEY in environment variables.',
        },
        { status: 503 }
      );
    }

    return Response.json(
      { success: false, error: 'Failed to generate AI suggestions' },
      { status: 500 }
    );
  }
}

