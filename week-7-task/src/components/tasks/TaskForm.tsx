'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Task } from '../../types';

interface TaskFormProps {
  onAddTask: (task: Task) => void;
}

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error('Task title is required');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create task');
      }

      toast.success('Task created successfully!');
      onAddTask(data.task);

      // Clear the form
      setTitle('');
      setDescription('');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h2 className='text-lg font-semibold mb-4'>Add New Task</h2>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label
            htmlFor='title'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Title
          </label>
          <input
            id='title'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
            placeholder='Enter task title'
            maxLength={100}
          />
        </div>

        <div>
          <label
            htmlFor='description'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Description (optional)
          </label>
          <textarea
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 min-h-[80px]'
            placeholder='Enter task description'
            maxLength={500}
          />
        </div>

        <button
          type='submit'
          disabled={loading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            loading ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Creating...' : 'Add Task'}
        </button>
      </form>
    </div>
  );
}
