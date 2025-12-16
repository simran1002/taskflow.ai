'use client';

import { create } from 'zustand';
import { ITask } from '@/models/Task';

interface TaskState {
  tasks: ITask[];
  setTasks: (tasks: ITask[]) => void;
  addTask: (task: ITask) => void;
  updateTask: (id: string, task: Partial<ITask>) => void;
  removeTask: (id: string) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  addTask: (task) => set((state) => ({ tasks: [task as ITask, ...state.tasks] })),
  updateTask: (id, updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task._id.toString() === id ? { ...task, ...updatedTask } as ITask : task
      ),
    })),
  removeTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task._id.toString() !== id),
    })),
}));

