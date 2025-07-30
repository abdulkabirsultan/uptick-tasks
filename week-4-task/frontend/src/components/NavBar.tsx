import { BiLogInCircle } from 'react-icons/bi';
import Logo from './Logo';

const NavBar = () => {
  return (
    <nav className='w-full flex justify-between items-center px-6 shadow border-b border-gray-300 py-2'>
      <Logo />
      <button className='flex items-center cursor-pointer'>
        Login
        <BiLogInCircle className='ml-1 text-xl' />
      </button>
    </nav>
  );
};

export default NavBar;
