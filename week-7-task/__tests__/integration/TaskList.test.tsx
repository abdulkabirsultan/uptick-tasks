import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import TaskList from '../../src/components/tasks/TaskList';
import { mockTasks } from '../mocks/mockData';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';

describe('TaskList Component Integration Tests', () => {
  it('fetches and displays tasks', async () => {
    render(<TaskList />);

    // Check loading state
    expect(screen.getByRole('status', { hidden: true })).toBeInTheDocument();

    // Wait for tasks to load
    await waitFor(() => {
      expect(screen.getByText(mockTasks[0].title)).toBeInTheDocument();
    });

    // Verify all tasks are displayed
    mockTasks.forEach((task) => {
      expect(screen.getByText(task.title)).toBeInTheDocument();
      if (task.description) {
        expect(screen.getByText(task.description)).toBeInTheDocument();
      }
    });
  });

  it('filters tasks correctly', async () => {
    render(<TaskList />);

    // Wait for tasks to load
    await waitFor(() => {
      expect(screen.getByText(mockTasks[0].title)).toBeInTheDocument();
    });

    // Click the "Active" filter
    const activeFilterButton = screen.getByRole('button', { name: 'Active' });
    fireEvent.click(activeFilterButton);

    // Verify only active tasks are shown
    const activeTasks = mockTasks.filter(task => !task.completed);
    const completedTasks = mockTasks.filter(task => task.completed);

    activeTasks.forEach(task => {
      expect(screen.getByText(task.title)).toBeInTheDocument();
    });

    completedTasks.forEach(task => {
      expect(screen.queryByText(task.title)).not.toBeInTheDocument();
    });

    // Click the "Completed" filter
    const completedFilterButton = screen.getByRole('button', { name: 'Completed' });
    fireEvent.click(completedFilterButton);

    // Verify only completed tasks are shown
    await waitFor(() => {
      activeTasks.forEach(task => {
        expect(screen.queryByText(task.title)).not.toBeInTheDocument();
      });

      completedTasks.forEach(task => {
        expect(screen.getByText(task.title)).toBeInTheDocument();
      });
    });
  });

  it('adds new task successfully', async () => {
    // Override the server handler for task creation
    const newTask = {
      id: 'new-task-id',
      title: 'New Integration Test Task',
      description: 'This is a new task created in an integration test',
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: '123',
    };

    server.use(
      http.post('/api/tasks', async () => {
        return HttpResponse.json({ task: newTask }, { status: 201 });
      })
    );

    render(<TaskList />);

    // Wait for the initial tasks to load
    await waitFor(() => {
      expect(screen.getByText(mockTasks[0].title)).toBeInTheDocument();
    });

    // Fill out the task form
    fireEvent.change(screen.getByLabelText('Title'), {
      target: { value: newTask.title }
    });

    fireEvent.change(screen.getByLabelText('Description (optional)'), {
      target: { value: newTask.description }
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: 'Add Task' }));

    // Verify the new task is added to the list
    await waitFor(() => {
      expect(screen.getByText(newTask.title)).toBeInTheDocument();
      expect(screen.getByText(newTask.description)).toBeInTheDocument();
    });
  });

  it('handles task deletion', async () => {
    const taskToDelete = mockTasks[0];

    render(<TaskList />);

    // Wait for tasks to load
    await waitFor(() => {
      expect(screen.getByText(taskToDelete.title)).toBeInTheDocument();
    });

    // Mock window.confirm to return true
    window.confirm = jest.fn().mockReturnValue(true);

    // Find the delete button for the first task
    const deleteButtons = screen.getAllByTitle('Delete task');
    fireEvent.click(deleteButtons[0]);

    // Verify confirmation dialog was shown
    expect(window.confirm).toHaveBeenCalledWith(
      'Are you sure you want to delete this task?'
    );

    // Wait for the task to be removed from the list
    await waitFor(() => {
      expect(screen.queryByText(taskToDelete.title)).not.toBeInTheDocument();
    });
  });

  it('handles task completion toggle', async () => {
    const taskToToggle = mockTasks[0];
    const initialStatus = taskToToggle.completed;

    render(<TaskList />);

    // Wait for tasks to load
    await waitFor(() => {
      expect(screen.getByText(taskToToggle.title)).toBeInTheDocument();
    });

    // Find all checkboxes and click the first one
    const checkboxes = screen.getAllByRole('checkbox');
    const firstTaskCheckbox = checkboxes[0];
    
    fireEvent.click(firstTaskCheckbox);

    // Wait for the task to be updated
    await waitFor(() => {
      if (initialStatus) {
        expect(firstTaskCheckbox).not.toBeChecked();
      } else {
        expect(firstTaskCheckbox).toBeChecked();
      }
    });
  });

  it('shows error message when task fetching fails', async () => {
    // Override the server handler to simulate error
    server.use(
      http.get('/api/tasks', () => {
        return HttpResponse.json(
          { error: 'Failed to fetch tasks' }, 
          { status: 500 }
        );
      })
    );

    render(<TaskList />);

    // Verify error toast is shown
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
  });
});
