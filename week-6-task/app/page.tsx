import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className='flex flex-col items-center'>
      <section className='w-full py-12 md:py-24 lg:py-32'>
        <div className='container px-4 md:px-6'>
          <div className='grid gap-6 lg:grid-cols-2 lg:gap-12 items-center'>
            <div className='flex flex-col justify-center space-y-4'>
              <div className='space-y-2'>
                <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none'>
                  Manage Your Tasks Efficiently
                </h1>
                <p className='max-w-[600px] text-gray-500 md:text-xl'>
                  TaskManager helps you organize your daily tasks, boost
                  productivity, and never miss a deadline again.
                </p>
              </div>
              <div className='flex flex-col sm:flex-row gap-3'>
                <Link
                  href='/register'
                  className='inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-8 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                >
                  Get Started
                </Link>
                <Link
                  href='/login'
                  className='inline-flex h-10 items-center justify-center rounded-md border border-gray-300 bg-white px-8 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                >
                  Log In
                </Link>
              </div>
            </div>
            <div className='mx-auto lg:mx-0 relative w-full max-w-[500px] h-[400px]'>
              <Image
                src='/task-illustration.svg'
                alt='Task Management Illustration'
                fill
                className='object-contain'
              />
            </div>
          </div>
        </div>
      </section>

      <section className='w-full py-12 md:py-24 bg-white'>
        <div className='container px-4 md:px-6'>
          <div className='flex flex-col items-center justify-center space-y-4 text-center'>
            <div className='space-y-2'>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
                Features
              </h2>
              <p className='max-w-[600px] text-gray-500 md:text-xl'>
                Everything you need to stay organized and productive
              </p>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-12'>
            <div className='flex flex-col items-center space-y-2 p-6 bg-gray-50 rounded-lg'>
              <div className='p-3 bg-blue-100 rounded-full'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='h-6 w-6 text-blue-600'
                >
                  <path d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7' />
                  <path d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z' />
                </svg>
              </div>
              <h3 className='text-xl font-bold'>Task Creation</h3>
              <p className='text-gray-500 text-center'>
                Easily create, update, and organize your tasks in one place.
              </p>
            </div>
            <div className='flex flex-col items-center space-y-2 p-6 bg-gray-50 rounded-lg'>
              <div className='p-3 bg-blue-100 rounded-full'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='h-6 w-6 text-blue-600'
                >
                  <rect width='18' height='18' x='3' y='3' rx='2' />
                  <path d='m9 9 6 6' />
                  <path d='m15 9-6 6' />
                </svg>
              </div>
              <h3 className='text-xl font-bold'>Task Tracking</h3>
              <p className='text-gray-500 text-center'>
                Track your progress and mark tasks as complete as you go.
              </p>
            </div>
            <div className='flex flex-col items-center space-y-2 p-6 bg-gray-50 rounded-lg'>
              <div className='p-3 bg-blue-100 rounded-full'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='h-6 w-6 text-blue-600'
                >
                  <path d='M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z' />
                  <path d='m9 12 2 2 4-4' />
                </svg>
              </div>
              <h3 className='text-xl font-bold'>Task Filtering</h3>
              <p className='text-gray-500 text-center'>
                Filter tasks by status to focus on what needs to be done.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
