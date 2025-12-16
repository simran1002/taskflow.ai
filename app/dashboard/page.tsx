'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { TaskCard } from '@/components/TaskCard';
import { TaskDialog } from '@/components/TaskDialog';
import { AISuggestions } from '@/components/AISuggestions';
import { useAuthStore } from '@/store/useAuthStore';
import { useTaskStore } from '@/store/useTaskStore';
import { ITask, TaskStatus } from '@/models/Task';
import { Plus, LogOut, Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function DashboardPage() {
  const router = useRouter();
  const { user, setUser, isLoading } = useAuthStore();
  const { tasks, setTasks, addTask, updateTask, removeTask } = useTaskStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<ITask | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const fetchTasks = async () => {
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (priorityFilter !== 'all') params.append('priority', priorityFilter);

      const response = await fetch(`/api/tasks?${params.toString()}`);
      const data = await response.json();
      if (data.success) {
        setTasks(data.data.tasks);
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        const data = await response.json();
        if (data.success) {
          setUser(data.data.user);
        } else {
          router.push('/login');
        }
      } catch {
        router.push('/login');
      }
    };

    checkAuth();
    fetchTasks();
  }, [setUser, router]);

  useEffect(() => {
    fetchTasks();
  }, [statusFilter, priorityFilter]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleCreateTask = () => {
    setEditingTask(null);
    setDialogOpen(true);
  };

  const handleEditTask = (task: ITask) => {
    setEditingTask(task);
    setDialogOpen(true);
  };

  const handleSaveTask = async (taskData: Partial<ITask>) => {
    try {
      if (editingTask) {
        const response = await fetch(`/api/tasks/${editingTask._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(taskData),
        });
        const data = await response.json();
        if (data.success) {
          updateTask(editingTask._id.toString(), data.data.task);
        }
      } else {
        const response = await fetch('/api/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(taskData),
        });
        const data = await response.json();
        if (data.success) {
          addTask(data.data.task);
        }
      }
      await fetchTasks();
    } catch (error) {
      console.error('Failed to save task:', error);
      throw error;
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        removeTask(id);
      }
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleToggleStatus = async (id: string, status: TaskStatus) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const data = await response.json();
      if (data.success) {
        updateTask(id, { status });
      }
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="flex items-center gap-3 rounded-full border border-slate-800 bg-slate-900 px-5 py-3 text-sm text-slate-300 shadow-lg shadow-sky-900/40">
          <span className="h-2 w-2 animate-pulse rounded-full bg-sky-400" />
          Loading your workspace
        </div>
      </div>
    );
  }

  const filteredTasks = tasks.filter((task) => {
    if (statusFilter !== 'all' && task.status !== statusFilter) return false;
    if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;
    return true;
  });

  const stats = {
    total: tasks.length,
    todo: tasks.filter((t) => t.status === 'todo').length,
    inProgress: tasks.filter((t) => t.status === 'in-progress').length,
    completed: tasks.filter((t) => t.status === 'completed').length,
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-sky-400 via-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">
              TaskFlow AI
            </h1>
            <div className="flex items-center gap-4">
              <span className="hidden text-sm text-slate-300 sm:inline">
                Welcome, <span className="font-medium">{user?.name}</span>
              </span>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="border-slate-700 bg-slate-900 hover:bg-slate-800 hover:border-slate-500"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-sky-900/40">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Total Tasks
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <div className="text-3xl font-semibold text-slate-50">{stats.total}</div>
              <span className="text-xs text-slate-400">in this workspace</span>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-blue-900/40">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
              To Do
            </div>
            <div className="mt-3 text-3xl font-semibold text-sky-400">{stats.todo}</div>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-amber-900/40">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
              In Progress
            </div>
            <div className="mt-3 text-3xl font-semibold text-amber-300">{stats.inProgress}</div>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-emerald-900/40">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Completed
            </div>
            <div className="mt-3 text-3xl font-semibold text-emerald-300">{stats.completed}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-slate-50">Your Tasks</h2>
                <p className="text-xs text-slate-400">
                  Prioritize, focus, and ship with AI-powered insights.
                </p>
              </div>
              <Button
                onClick={handleCreateTask}
                className="rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-fuchsia-500 px-5 text-sm font-semibold shadow-lg shadow-sky-900/40 hover:from-sky-400 hover:via-indigo-400 hover:to-fuchsia-400"
              >
                <Plus className="mr-2 h-4 w-4" />
                New Task
              </Button>
            </div>

            <div className="flex gap-4 items-center rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-md shadow-slate-900/40">
              <Filter className="h-5 w-5 text-slate-400" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px] border-slate-700 bg-slate-900 text-slate-100">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="border-slate-700 bg-slate-900 text-slate-100">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[180px] border-slate-700 bg-slate-900 text-slate-100">
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent className="border-slate-700 bg-slate-900 text-slate-100">
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {filteredTasks.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/70 p-10 text-center shadow-inner shadow-slate-950/60">
                <p className="text-slate-300 text-lg mb-2">No tasks found yet</p>
                <p className="text-sm text-slate-500 mb-4">
                  Create your first task to let TaskFlow AI start prioritizing your work.
                </p>
                <Button
                  onClick={handleCreateTask}
                  className="rounded-full bg-sky-500 px-6 text-sm font-semibold text-white hover:bg-sky-400"
                >
                  Create a task
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredTasks.map((task) => (
                  <TaskCard
                    key={task._id.toString()}
                    task={task}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                    onToggleStatus={handleToggleStatus}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <AISuggestions />
          </div>
        </div>
      </main>

      <TaskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        task={editingTask}
        onSave={handleSaveTask}
      />
    </div>
  );
}

