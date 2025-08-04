import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import NavBar from '../components/NavBar';
interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <div className='min-h-screen flex flex-col bg-gray-50'>
      <NavBar isAuthenticated={isAuthenticated} onLogout={logout} />
      <main className='flex-grow container mx-auto px-4 py-8'>{children}</main>
    </div>
  );
};

export default MainLayout;
