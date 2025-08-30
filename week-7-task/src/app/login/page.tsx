import { Metadata } from 'next';
import LoginForm from '../../components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Login - TaskManager',
  description: 'Sign in to your TaskManager account',
};

export default function LoginPage() {
  return (
    <div className='flex flex-col items-center justify-center py-12'>
      <h1 className='text-3xl font-bold text-center mb-8'>Welcome Back!</h1>
      <LoginForm />
    </div>
  );
}
