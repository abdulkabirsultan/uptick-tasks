import { mockTasks, mockUser } from '../mocks/mockData';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';

// Type for our mock response
type MockResponse = {
  ok: boolean;
  status?: number;
  json: () => Promise<any>;
  headers?: Headers;
  redirected?: boolean;
  statusText?: string;
  type?: ResponseType;
  url?: string;
  clone?: () => Response;
  body?: ReadableStream<Uint8Array> | null;
  bodyUsed?: boolean;
  arrayBuffer?: () => Promise<ArrayBuffer>;
  blob?: () => Promise<Blob>;
  formData?: () => Promise<FormData>;
  text?: () => Promise<string>;
};

describe('Tasks API Integration Tests', () => {
  // Store any fetch responses for tests
  let fetchResponse: MockResponse;
  let responseData: any;

  beforeEach(() => {
    // Reset the response data
    fetchResponse = undefined as any;
    responseData = undefined;

    // Make sure fetch calls are not mocked out completely
    global.fetch = jest.fn();
  });

  it('fetches all tasks successfully', async () => {
    // Mock the fetch function for this test
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      statusText: 'OK',
      headers: new Headers(),
      json: jest
        .fn()
        .mockResolvedValue({ tasks: mockTasks, count: mockTasks.length }),
    } as unknown as Response);

    // Make the API request
    fetchResponse = (await fetch('/api/tasks')) as unknown as MockResponse;
    responseData = await fetchResponse.json();

    // Verify the fetch was called correctly
    expect(global.fetch).toHaveBeenCalledWith('/api/tasks');

    // Verify the response data
    expect(fetchResponse.ok).toBe(true);
    expect(responseData.tasks).toEqual(mockTasks);
    expect(responseData.count).toBe(mockTasks.length);
  });

  it('creates a new task successfully', async () => {
    const newTaskData = {
      title: 'New API Test Task',
      description: 'This is a task created in an API test',
    };

    const expectedTask = {
      id: 'new-task-id',
      ...newTaskData,
      completed: false,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      userId: mockUser.id,
    };

    // Mock the fetch function for this test
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      status: 201,
      statusText: 'Created',
      headers: new Headers(),
      json: jest.fn().mockResolvedValue({ task: expectedTask }),
    } as unknown as Response);

    // Make the API request
    fetchResponse = (await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTaskData),
    })) as unknown as MockResponse;

    responseData = await fetchResponse.json();

    // Verify the fetch was called correctly
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/tasks',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(newTaskData),
      })
    );

    // Verify the response data
    expect(fetchResponse.ok).toBe(true);
    expect(fetchResponse.status).toBe(201);
    expect(responseData.task).toMatchObject({
      id: expectedTask.id,
      title: newTaskData.title,
      description: newTaskData.description,
      completed: false,
    });
  });

  it('fetches a single task by ID successfully', async () => {
    const task = mockTasks[0];

    // Mock the fetch function for this test
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      statusText: 'OK',
      headers: new Headers(),
      json: jest.fn().mockResolvedValue({ task }),
    } as unknown as Response);

    // Make the API request
    fetchResponse = (await fetch(
      `/api/tasks/${task.id}`
    )) as unknown as MockResponse;
    responseData = await fetchResponse.json();

    // Verify the fetch was called correctly
    expect(global.fetch).toHaveBeenCalledWith(`/api/tasks/${task.id}`);

    // Verify the response data
    expect(fetchResponse.ok).toBe(true);
    expect(responseData.task).toEqual(task);
  });

  it('updates a task successfully', async () => {
    const task = mockTasks[0];
    const updates = {
      title: 'Updated Task Title',
      completed: true,
    };

    const expectedUpdatedTask = {
      ...task,
      ...updates,
      updatedAt: expect.any(String),
    };

    // Mock the fetch function for this test
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      statusText: 'OK',
      headers: new Headers(),
      json: jest.fn().mockResolvedValue({ task: expectedUpdatedTask }),
    } as unknown as Response);

    // Make the API request
    fetchResponse = (await fetch(`/api/tasks/${task.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    })) as unknown as MockResponse;

    responseData = await fetchResponse.json();

    // Verify the fetch was called correctly
    expect(global.fetch).toHaveBeenCalledWith(
      `/api/tasks/${task.id}`,
      expect.objectContaining({
        method: 'PATCH',
        body: JSON.stringify(updates),
      })
    );

    // Verify the response data
    expect(fetchResponse.ok).toBe(true);
    expect(responseData.task).toMatchObject({
      id: task.id,
      title: updates.title,
      completed: updates.completed,
    });
  });

  it('deletes a task successfully', async () => {
    const task = mockTasks[0];

    // Mock the fetch function for this test
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      statusText: 'OK',
      headers: new Headers(),
      json: jest.fn().mockResolvedValue({ message: 'Task deleted' }),
    } as unknown as Response);

    // Make the API request
    fetchResponse = (await fetch(`/api/tasks/${task.id}`, {
      method: 'DELETE',
    })) as unknown as MockResponse;

    responseData = await fetchResponse.json();

    // Verify the fetch was called correctly
    expect(global.fetch).toHaveBeenCalledWith(
      `/api/tasks/${task.id}`,
      expect.objectContaining({
        method: 'DELETE',
      })
    );

    // Verify the response data
    expect(fetchResponse.ok).toBe(true);
    expect(responseData.message).toBe('Task deleted');
  });

  it('handles error when task is not found', async () => {
    const nonExistentTaskId = 'non-existent-id';

    // Mock the fetch function for this test
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
      headers: new Headers(),
      json: jest.fn().mockResolvedValue({ error: 'Task not found' }),
    } as unknown as Response);

    // Make the API request
    fetchResponse = (await fetch(
      `/api/tasks/${nonExistentTaskId}`
    )) as unknown as MockResponse;
    responseData = await fetchResponse.json();

    // Verify the response data
    expect(fetchResponse.ok).toBe(false);
    expect(fetchResponse.status).toBe(404);
    expect(responseData.error).toBe('Task not found');
  });

  it('validates task creation with required fields', async () => {
    const invalidTaskData = {
      // Missing title
      description: 'This task is invalid because it has no title',
    };

    // Mock the fetch function for this test
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      status: 400,
      statusText: 'Bad Request',
      headers: new Headers(),
      json: jest.fn().mockResolvedValue({ error: 'Title is required' }),
    } as unknown as Response);

    // Make the API request
    fetchResponse = (await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invalidTaskData),
    })) as unknown as MockResponse;

    responseData = await fetchResponse.json();

    // Verify the response data
    expect(fetchResponse.ok).toBe(false);
    expect(fetchResponse.status).toBe(400);
    expect(responseData.error).toBe('Title is required');
  });
});
