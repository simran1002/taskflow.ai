import { NextRequest } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
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

    const { title, description, dueDate } = await request.json();

    if (!title || typeof title !== 'string') {
      return Response.json(
        { success: false, error: 'Task title is required' },
        { status: 400 }
      );
    }

    const prompt = `Analyze this task and suggest a priority level (low, medium, or high).
Task Title: ${title}
Description: ${description || 'No description'}
Due Date: ${dueDate || 'No due date'}

Consider factors like urgency, importance, and deadlines. Respond with only one word: low, medium, or high.`;

    const result = await generateText({
      model: openai('gpt-4o-mini'),
      prompt,
      maxTokens: 10 as unknown as number,
    });

    const priority = result.text.trim().toLowerCase();
    const validPriorities = ['low', 'medium', 'high'];
    const suggestedPriority = validPriorities.includes(priority) ? priority : 'medium';

    return Response.json({
      success: true,
      data: {
        priority: suggestedPriority,
      },
    });
  } catch (error: unknown) {
    console.error('AI priority prediction error:', error);
    
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

    return Response.json({
      success: true,
      data: {
        priority: 'medium',
      },
    });
  }
}

