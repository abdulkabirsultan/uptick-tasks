export const mockUser = {
  id: 'user-123',
  name: 'Test User',
  email: 'test@example.com',
};

export const mockTasks = [
  {
    id: 'task-1',
    title: 'Complete project',
    description: 'Finish the coding project by end of week',
    completed: false,
    createdAt: '2025-08-25T10:00:00Z',
    updatedAt: '2025-08-25T10:00:00Z',
    userId: 'user-123',
  },
  {
    id: 'task-2',
    title: 'Review code',
    description: 'Review pull requests',
    completed: true,
    createdAt: '2025-08-24T09:00:00Z',
    updatedAt: '2025-08-24T15:30:00Z',
    userId: 'user-123',
  },
  {
    id: 'task-3',
    title: 'Write tests',
    description: 'Implement unit and integration tests',
    completed: false,
    createdAt: '2025-08-26T11:00:00Z',
    updatedAt: '2025-08-26T11:00:00Z',
    userId: 'user-123',
  },
];

export const mockAuthResponse = {
  user: mockUser,
  token: 'mock-jwt-token',
};
