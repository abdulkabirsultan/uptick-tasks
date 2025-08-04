import { Link } from 'react-router-dom';
import { BiLogInCircle, BiLogOutCircle, BiUserCircle } from 'react-icons/bi';
import Logo from './Logo';

type NavBarProps = {
  isAuthenticated: boolean;
  onLogout: () => void;
};

const NavBar = ({ isAuthenticated, onLogout }: NavBarProps) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <nav className='w-full flex justify-between items-center px-6 shadow border-b border-gray-300 py-2'>
      <Link to='/'>
        <Logo />
      </Link>

      {isAuthenticated ? (
        <div className='flex items-center gap-4'>
          <span className='text-sm text-gray-700 hidden md:inline'>
            Hello, {user.username || 'User'}
          </span>
          <button
            className='flex items-center cursor-pointer hover:text-blue-600'
            onClick={onLogout}
          >
            Logout
            <BiLogOutCircle className='ml-1 text-xl' />
          </button>
        </div>
      ) : (
        <div className='flex items-center gap-4'>
          <Link
            to='/register'
            className='flex items-center cursor-pointer hover:text-blue-600'
          >
            Register
            <BiUserCircle className='ml-1 text-xl' />
          </Link>
          <Link
            to='/login'
            className='flex items-center cursor-pointer hover:text-blue-600'
          >
            Login
            <BiLogInCircle className='ml-1 text-xl' />
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
