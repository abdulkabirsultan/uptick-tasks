import { useState } from 'react';
import { BiEdit, BiSolidTrashAlt } from 'react-icons/bi';

export type Task = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  onToggleComplete: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
};

const Task = ({
  id,
  title,
  description,
  completed,
  onToggleComplete,
  onDelete,
}: Task) => {
  const [isCompleted, setIsCompleted] = useState(completed);

  const handleToggle = () => {
    const newState = !isCompleted;
    setIsCompleted(newState);
    onToggleComplete(id, newState);
  };

  return (
    <div className='py-4 flex items-center border-b border-gray-300'>
      <input
        type='checkbox'
        checked={isCompleted}
        onChange={handleToggle}
        className='mr-3 w-5 h-5 cursor-pointer accent-blue-500'
      />

      <div className='flex-grow'>
        <h2
          className={`font-bold text-lg ${
            isCompleted ? 'line-through text-gray-500' : 'text-black'
          }`}
        >
          {title}
        </h2>
        {description && (
          <p
            className={`text-sm ${
              isCompleted ? 'text-gray-400' : 'text-gray-700'
            }`}
          >
            {description}
          </p>
        )}
      </div>

      <div className='flex gap-3'>
        <button
          onClick={() => alert('Edit functionality not implemented yet')}
          className='text-blue-600 hover:text-blue-500'
          aria-label='Edit task'
        >
          <BiEdit className='text-xl' />
        </button>

        <button
          onClick={() => onDelete(id)}
          className='text-red-600 hover:text-red-500'
          aria-label='Delete task'
        >
          <BiSolidTrashAlt className='text-xl' />
        </button>
      </div>
    </div>
  );
};

export default Task;
