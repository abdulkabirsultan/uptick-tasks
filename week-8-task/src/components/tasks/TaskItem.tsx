'use client';

import { useState, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { Task } from '../../types';
import Image from 'next/image';
import {
  PencilIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline';

interface TaskItemProps {
  task: Task;
  onUpdate: (updatedTask: Task) => void;
  onDelete: (taskId: string) => void;
}

export default function TaskItem({ task, onUpdate, onDelete }: TaskItemProps) {
  const [isCompleted, setIsCompleted] = useState(task.completed);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(task.imageUrl || '');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size exceeds 5MB limit');
      return;
    }

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      toast.error(
        'File type not supported. Please upload a JPEG, PNG, WebP or GIF'
      );
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/uploads', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload image');
      }

      setUploadedImage(data.data.imageUrl);
      setImageUrl(data.data.imageUrl); // Update the current image URL
      toast.success('Image uploaded successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to upload image');
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    setImageUrl('');
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleToggleComplete = async () => {
    setLoading(true);

    try {
      const newStatus = !isCompleted;

      const response = await fetch(`/api/tasks/${task.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: newStatus }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update task status');
      }

      setIsCompleted(newStatus);
      onUpdate({ ...task, completed: newStatus });
    } catch (error: any) {
      toast.error(error.message || 'Failed to update task status');
      // Revert back if there's an error
      setIsCompleted(task.completed);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!title.trim()) {
      toast.error('Task title is required');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() || undefined,
          imageUrl: imageUrl || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update task');
      }

      toast.success('Task updated successfully!');
      setIsEditing(false);
      onUpdate({
        ...task,
        title: title.trim(),
        description: description.trim() || undefined,
        imageUrl: imageUrl || undefined,
      });
    } catch (error: any) {
      toast.error(error.message || 'Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setLoading(true);

      try {
        const response = await fetch(`/api/tasks/${task.id}`, {
          method: 'DELETE',
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to delete task');
        }

        toast.success('Task deleted successfully!');
        onDelete(task.id);
      } catch (error: any) {
        toast.error(error.message || 'Failed to delete task');
      } finally {
        setLoading(false);
      }
    }
  };

  if (isEditing) {
    return (
      <div className='bg-white p-4 rounded-lg shadow-sm mb-3 border border-gray-200'>
        <div className='space-y-3'>
          <div>
            <label
              htmlFor='edit-title'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Title
            </label>
            <input
              id='edit-title'
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
              placeholder='Enter task title'
              maxLength={100}
              disabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor='edit-description'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Description (optional)
            </label>
            <textarea
              id='edit-description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 min-h-[80px]'
              placeholder='Enter task description'
              maxLength={500}
              disabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor='edit-image'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Image (optional)
            </label>
            <div className='mt-1 flex items-center'>
              <input
                type='file'
                id='edit-image'
                accept='image/jpeg,image/png,image/webp,image/gif'
                ref={fileInputRef}
                onChange={handleImageUpload}
                disabled={isUploading || loading}
                className='sr-only'
              />
              <label
                htmlFor='edit-image'
                className={`px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isUploading || loading
                    ? 'opacity-75 cursor-not-allowed'
                    : 'cursor-pointer'
                }`}
              >
                {isUploading
                  ? 'Uploading...'
                  : imageUrl
                  ? 'Change Image'
                  : 'Add Image'}
              </label>
              {imageUrl && (
                <button
                  type='button'
                  onClick={removeImage}
                  disabled={loading}
                  className='ml-2 text-red-600 hover:text-red-800'
                >
                  Remove
                </button>
              )}
            </div>

            {imageUrl && (
              <div className='mt-3 relative'>
                <div className='w-full h-40 relative rounded-md overflow-hidden border border-gray-200'>
                  <Image
                    src={imageUrl}
                    alt='Task image'
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className='flex justify-end gap-2'>
            <button
              onClick={() => {
                setTitle(task.title);
                setDescription(task.description || '');
                setIsEditing(false);
              }}
              disabled={loading}
              className='inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            >
              <XMarkIcon className='h-4 w-4 mr-1' />
              Cancel
            </button>

            <button
              onClick={handleUpdate}
              disabled={loading}
              className='inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            >
              <CheckIcon className='h-4 w-4 mr-1' />
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-white p-4 rounded-lg shadow-sm mb-3 border border-gray-200'>
      <div className='flex items-start'>
        <input
          type='checkbox'
          checked={isCompleted}
          onChange={handleToggleComplete}
          disabled={loading}
          className='mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer'
        />

        <div className='ml-3 flex-grow'>
          <h3
            className={`text-sm font-medium ${
              isCompleted ? 'line-through text-gray-500' : 'text-gray-900'
            }`}
          >
            {task.title}
          </h3>

          {task.description && (
            <p
              className={`mt-1 text-sm ${
                isCompleted ? 'line-through text-gray-400' : 'text-gray-600'
              }`}
            >
              {task.description}
            </p>
          )}

          {task.imageUrl && (
            <div className='mt-3 mb-2'>
              <div className='w-full h-40 relative rounded-md overflow-hidden border border-gray-200'>
                <Image
                  src={task.imageUrl}
                  alt='Task image'
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          )}

          <p className='mt-1 text-xs text-gray-400'>
            Created: {new Date(task.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className='flex space-x-2'>
          <button
            onClick={() => setIsEditing(true)}
            disabled={loading}
            className='text-blue-600 hover:text-blue-800 focus:outline-none'
            title='Edit task'
          >
            <PencilIcon className='h-4 w-4' />
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className='text-red-600 hover:text-red-800 focus:outline-none'
            title='Delete task'
          >
            <TrashIcon className='h-4 w-4' />
          </button>
        </div>
      </div>
    </div>
  );
}
