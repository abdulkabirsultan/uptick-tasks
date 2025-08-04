import { useEffect, useState } from 'react';
import Form from '../components/Form';
import Task from '../components/Task';
import { fetchTasks, createTask, updateTask, deleteTask } from '../api/taskApi';
import type { Task as TaskApi } from '../api/taskApi';

const Dashboard = () => {
  const [tasks, setTasks] = useState<TaskApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data.tasks);
      } catch (err) {
        setError('Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    };

    getTasks();
  }, []);

  const handleAddTask = async (title: string, description?: string) => {
    try {
      const response = await createTask({ title, description });
      setTasks((prev) => [...prev, response.task]);
    } catch (err) {
      setError('Failed to add task');
    }
  };

  const handleToggleComplete = async (id: string, completed: boolean) => {
    try {
      await updateTask(id, { completed });
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? { ...task, completed } : task))
      );
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  if (loading) {
    return <div className='text-center py-10'>Loading tasks...</div>;
  }

  return (
    <div>
      <h1 className='text-3xl font-bold text-center mb-8'>My Tasks</h1>

      <Form onAddTask={handleAddTask} />

      {error && (
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-4 rounded'>
          {error}
        </div>
      )}

      <div className='mt-8'>
        {tasks.length === 0 ? (
          <div className='text-center text-gray-500'>
            No tasks found. Add a new task to get started!
          </div>
        ) : (
          <div>
            {tasks.map((task) => (
              <Task
                key={task._id}
                id={task._id}
                title={task.title}
                description={task.description}
                completed={task.completed}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
