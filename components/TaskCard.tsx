'use client';

import { ITask } from '@/models/Task';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import { Edit, Trash2, CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: ITask;
  onEdit: (task: ITask) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, status: ITask['status']) => void;
}

export function TaskCard({ task, onEdit, onDelete, onToggleStatus }: TaskCardProps) {
  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  const statusColors = {
    todo: 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
  };

  const nextStatus: ITask['status'] =
    task.status === 'todo' ? 'in-progress' : task.status === 'in-progress' ? 'completed' : 'todo';

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold line-clamp-2">{task.title}</CardTitle>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onToggleStatus(task._id.toString(), nextStatus)}
              className="h-8 w-8"
            >
              {task.status === 'completed' ? (
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              ) : (
                <Circle className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(task)}
              className="h-8 w-8"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(task._id.toString())}
              className="h-8 w-8 text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {task.description && (
          <p className="text-sm text-gray-600 line-clamp-3">{task.description}</p>
        )}
        <div className="flex flex-wrap gap-2">
          <span
            className={cn(
              'px-2 py-1 rounded-full text-xs font-medium',
              priorityColors[task.priority]
            )}
          >
            {task.priority} priority
          </span>
          <span
            className={cn(
              'px-2 py-1 rounded-full text-xs font-medium',
              statusColors[task.status]
            )}
          >
            {task.status}
          </span>
          {task.dueDate && (
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              Due: {formatDate(task.dueDate)}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

