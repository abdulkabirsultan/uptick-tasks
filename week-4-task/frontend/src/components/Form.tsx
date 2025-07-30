import { useState } from 'react';

const Form = () => {
  const [task, setTask] = useState<string>('');
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    window.alert(`Task added: ${task}`);
    setTask('');
    // Handle form submission logic here
  };
  return (
    <div>
      <form
        className='flex flex-row w-4/5 mx-auto items-center gap-2 mt-5'
        onSubmit={handleSubmit}
      >
        <input
          type='text'
          id='task'
          placeholder='Enter your task'
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className='p-2 flex-grow border border-gray-700 rounded outline-none focus:border-blue-500'
        />

        <button
          type='submit'
          className='bg-gradient-to-r cursor-pointer from-blue-700 to-blue-400 text-black p-2 whitespace-nowrap rounded w-1/5'
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default Form;
