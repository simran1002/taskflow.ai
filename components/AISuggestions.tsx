'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2 } from 'lucide-react';

export function AISuggestions() {
  const [prompt, setPrompt] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGetSuggestion = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError('');
    setSuggestion('');

    try {
      const response = await fetch('/api/ai/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (data.success) {
        setSuggestion(data.data.suggestion);
      } else {
        setError(data.error || 'Failed to get suggestions');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          AI Task Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask for task management advice..."
            className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onKeyDown={(e) => e.key === 'Enter' && handleGetSuggestion()}
          />
          <Button onClick={handleGetSuggestion} disabled={loading || !prompt.trim()}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Thinking...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Get Suggestions
              </>
            )}
          </Button>
        </div>
        {error && (
          <div className="rounded-md bg-yellow-50 p-3 text-sm text-yellow-800">
            {error}
          </div>
        )}
        {suggestion && (
          <div className="rounded-md bg-blue-50 p-4 text-sm text-gray-800 whitespace-pre-wrap">
            {suggestion}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

