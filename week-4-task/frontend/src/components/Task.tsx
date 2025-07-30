import { useState } from 'react';
import { BiEdit, BiSolidTrashAlt } from 'react-icons/bi';

type TaskProps = {
  id?: string;
  title: string;
  description?: string;
  completed: boolean;
};
const Task = ({ id, title, description, completed }: TaskProps) => {
  const [completedState, setCompletedState] = useState(completed);
  return (
    <div
      key={id}
      className='py-4 flex flex-row justify-between items-center border-b border-gray-300'
    >
      <input
        type='checkbox'
        checked={completedState}
        className='mr-2 w-4 h-4 cursor-pointer'
        onChange={() => setCompletedState(!completedState)}
      />

      <div>
        <h2
          className={`font-bold text-lg ${
            completedState ? 'line-through' : 'text-black'
          }`}
        >
          {title}
        </h2>
        {description && <p className='text-gray-700 text-sm'>{description}</p>}
      </div>
      <button className='ml-auto cursor-pointer flex flex-row gap-2 items-center'>
        <BiEdit className='text-blue-600 hover:text-blue-500 text-xl' />
        <BiSolidTrashAlt className='text-red-600 hover:text-red-500 text-xl' />
      </button>
    </div>
  );
};

export default Task;
