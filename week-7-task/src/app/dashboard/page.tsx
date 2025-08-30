import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import TaskList from '../../components/tasks/TaskList';

export const metadata: Metadata = {
  title: 'Dashboard - TaskManager',
  description: 'Manage your tasks',
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <div className='max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold mb-8'>Task Dashboard</h1>
      <TaskList />
    </div>
  );
}
