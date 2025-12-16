import mongoose, { Schema, Document, Model } from 'mongoose';

export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'todo' | 'in-progress' | 'completed';

export interface ITask extends Document {
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate?: Date;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a task title'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot be more than 1000 characters'],
      default: '',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    status: {
      type: String,
      enum: ['todo', 'in-progress', 'completed'],
      default: 'todo',
    },
    dueDate: {
      type: Date,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

TaskSchema.index({ userId: 1, status: 1 });
TaskSchema.index({ userId: 1, priority: 1 });
TaskSchema.index({ userId: 1, dueDate: 1 });

const Task: Model<ITask> = mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema);

export default Task;

