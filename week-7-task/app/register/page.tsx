import { Metadata } from 'next';
import RegisterForm from '../components/auth/RegisterForm';

export const metadata: Metadata = {
  title: 'Register - TaskManager',
  description: 'Create a new TaskManager account',
};

export default function RegisterPage() {
  return (
    <div className='flex flex-col items-center justify-center py-12'>
      <h1 className='text-3xl font-bold text-center mb-8'>Join TaskManager</h1>
      <RegisterForm />
    </div>
  );
}
