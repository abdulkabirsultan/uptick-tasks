const API_URL = import.meta.env.VITE_API_URL;

export interface Task {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TasksResponse {
  tasks: Task[];
  count: number;
  success: boolean;
}

interface TaskResponse {
  task: Task;
}

// Helper to get auth headers
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

export async function fetchTasks(): Promise<TasksResponse> {
  const response = await fetch(`${API_URL}/tasks`, {
    headers: getAuthHeader(),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Unauthorized');
    }
    throw new Error('Failed to fetch tasks');
  }

  return response.json();
}

export async function createTask(taskData: {
  title: string;
  description?: string;
  completed?: boolean;
}): Promise<TaskResponse> {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: getAuthHeader(),
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    throw new Error('Failed to create task');
  }

  return response.json();
}

export async function updateTask(
  id: string,
  taskData: Partial<{ title: string; description: string; completed: boolean }>
): Promise<TaskResponse> {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PATCH',
    headers: getAuthHeader(),
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    throw new Error('Failed to update task');
  }

  return response.json();
}

export async function deleteTask(id: string): Promise<{ msg: string }> {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: getAuthHeader(),
  });

  if (!response.ok) {
    throw new Error('Failed to delete task');
  }

  return response.json();
}
