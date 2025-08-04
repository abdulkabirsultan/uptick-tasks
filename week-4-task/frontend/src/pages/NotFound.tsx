import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center py-20'>
      <h1 className='text-6xl font-bold text-gray-800'>404</h1>
      <p className='text-xl text-gray-600 mt-4'>Page not found</p>
      <Link
        to='/'
        className='mt-8 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition'
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
