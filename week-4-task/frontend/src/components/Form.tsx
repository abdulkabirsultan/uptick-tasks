import { useState } from 'react';

type FormProps = {
  onAddTask: (title: string, description?: string) => void;
};

const Form = ({ onAddTask }: FormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim()) return;

    onAddTask(title, description || undefined);
    setTitle('');
    setDescription('');
  };

  return (
    <div>
      <form
        className='flex flex-col w-full mx-auto items-center gap-4 mt-5'
        onSubmit={handleSubmit}
      >
        <input
          type='text'
          placeholder='Enter task title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='p-2 w-full border border-gray-300 rounded outline-none focus:border-blue-500'
          required
        />

        <textarea
          placeholder='Enter task description (optional)'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='p-2 w-full border border-gray-300 rounded outline-none focus:border-blue-500 min-h-24'
        />

        <button
          type='submit'
          className='bg-gradient-to-r from-blue-700 to-blue-500 text-white p-3 rounded w-full cursor-pointer hover:from-blue-600 hover:to-blue-400'
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default Form;
