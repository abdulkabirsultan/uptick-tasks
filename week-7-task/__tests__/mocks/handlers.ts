import { http, HttpResponse } from 'msw';
import { mockTasks, mockUser, mockAuthResponse } from './mockData';

// Define the types for the task-related requests
interface TaskCreateRequest {
  title: string;
  description: string;
}

interface TaskUpdateRequest {
  title?: string;
  description?: string;
  completed?: boolean;
}

export const handlers = [
  // Auth endpoints
  http.post('/api/auth/register', () => {
    return HttpResponse.json(mockAuthResponse, { status: 201 });
  }),

  http.post('/api/auth/[...nextauth]/route', () => {
    return HttpResponse.json({ user: mockUser }, { status: 200 });
  }),

  // Tasks endpoints
  http.get('/api/tasks', () => {
    return HttpResponse.json({ tasks: mockTasks, count: mockTasks.length }, { status: 200 });
  }),

  http.post('/api/tasks', async ({ request }) => {
    const data = await request.json() as TaskCreateRequest;
    const { title, description } = data;
    
    const newTask = {
      id: 'new-task-id',
      title,
      description,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: mockUser.id,
    };
    
    return HttpResponse.json({ task: newTask }, { status: 201 });
  }),

  http.get('/api/tasks/:id', ({ params }) => {
    const { id } = params;
    const task = mockTasks.find(task => task.id === String(id));
    
    if (!task) {
      return HttpResponse.json({ error: 'Task not found' }, { status: 404 });
    }
    
    return HttpResponse.json({ task }, { status: 200 });
  }),

  http.patch('/api/tasks/:id', async ({ params, request }) => {
    const { id } = params;
    const updates = await request.json() as TaskUpdateRequest;
    const taskIndex = mockTasks.findIndex(task => task.id === String(id));
    
    if (taskIndex === -1) {
      return HttpResponse.json({ error: 'Task not found' }, { status: 404 });
    }
    
    const updatedTask = {
      ...mockTasks[taskIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    
    return HttpResponse.json({ task: updatedTask }, { status: 200 });
  }),

  http.delete('/api/tasks/:id', ({ params }) => {
    const { id } = params;
    const taskIndex = mockTasks.findIndex(task => task.id === String(id));
    
    if (taskIndex === -1) {
      return HttpResponse.json({ error: 'Task not found' }, { status: 404 });
    }
    
    return HttpResponse.json({ message: 'Task deleted' }, { status: 200 });
  }),
];
