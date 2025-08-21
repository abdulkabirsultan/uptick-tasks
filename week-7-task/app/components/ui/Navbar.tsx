'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      toast.success('Logged out successfully');
      window.location.href = '/login';
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  return (
    <nav className='bg-white shadow-sm'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          <div className='flex items-center'>
            <Link href='/' className='text-xl font-bold text-blue-600'>
              TaskManager
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className='hidden md:flex items-center space-x-4'>
            {status === 'authenticated' ? (
              <>
                <Link
                  href='/dashboard'
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/dashboard')
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className='px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50'
                >
                  Logout
                </button>

                <div className='ml-3 relative'>
                  <div className='flex items-center'>
                    <span className='inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-600'>
                      <span className='text-sm font-medium text-white'>
                        {session?.user?.name?.charAt(0) || 'U'}
                      </span>
                    </span>
                    <span className='ml-2 text-sm text-gray-700'>
                      {session?.user?.name || 'User'}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  href='/login'
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/login')
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Login
                </Link>

                <Link
                  href='/register'
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/register')
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className='flex items-center md:hidden'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500'
            >
              <span className='sr-only'>Open main menu</span>
              {isOpen ? (
                <XMarkIcon className='block h-6 w-6' />
              ) : (
                <Bars3Icon className='block h-6 w-6' />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className='md:hidden'>
          <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
            {status === 'authenticated' ? (
              <>
                <Link
                  href='/dashboard'
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/dashboard')
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Dashboard
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className='block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50'
                >
                  Logout
                </button>

                <div className='px-3 py-2 flex items-center'>
                  <span className='inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-600'>
                    <span className='text-sm font-medium text-white'>
                      {session?.user?.name?.charAt(0) || 'U'}
                    </span>
                  </span>
                  <span className='ml-2 text-sm text-gray-700'>
                    {session?.user?.name || 'User'}
                  </span>
                </div>
              </>
            ) : (
              <>
                <Link
                  href='/login'
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/login')
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Login
                </Link>

                <Link
                  href='/register'
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/register')
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
