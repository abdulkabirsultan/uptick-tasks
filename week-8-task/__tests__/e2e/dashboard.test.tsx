import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Dashboard from '../../src/app/dashboard/page';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// Mock modules
jest.mock('next-auth/react');
jest.mock('next/navigation');

// Create a complete end-to-end test scenario
describe('Dashboard End-to-End Flow', () => {
  // Setup mock session and router
  beforeEach(() => {
    // Mock authenticated session
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: { name: 'Test User', email: 'test@example.com' },
        expires: '2023-01-01',
      },
      status: 'authenticated',
    });

    // Mock router
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      refresh: jest.fn(),
    });
  });

  it('renders the complete dashboard with tasks and allows full task management', async () => {
    // Render the dashboard page
    render(<Dashboard />);

    // Verify the user is authenticated and welcome message is displayed
    await waitFor(() => {
      expect(screen.getByText(/welcome/i)).toBeInTheDocument();
      expect(screen.getByText('Test User')).toBeInTheDocument();
    });

    // Verify task list is loaded
    await waitFor(() => {
      expect(screen.getByText('Your Tasks')).toBeInTheDocument();
    });

    // Create a new task
    const taskTitle = 'E2E Test Task';
    const taskDescription = 'This is a task created in an E2E test';

    fireEvent.change(screen.getByLabelText('Title'), {
      target: { value: taskTitle },
    });

    fireEvent.change(screen.getByLabelText('Description (optional)'), {
      target: { value: taskDescription },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Add Task' }));

    // Verify the task was added
    await waitFor(() => {
      expect(screen.getByText(taskTitle)).toBeInTheDocument();
      expect(screen.getByText(taskDescription)).toBeInTheDocument();
    });

    // Edit the newly created task
    const editButtons = screen.getAllByTitle('Edit task');
    fireEvent.click(editButtons[0]);

    const updatedTitle = 'Updated E2E Task';
    const updatedDescription = 'This task was updated in an E2E test';

    fireEvent.change(screen.getByLabelText('Title'), {
      target: { value: updatedTitle },
    });

    fireEvent.change(screen.getByLabelText('Description (optional)'), {
      target: { value: updatedDescription },
    });

    fireEvent.click(screen.getByText('Save'));

    // Verify the task was updated
    await waitFor(() => {
      expect(screen.getByText(updatedTitle)).toBeInTheDocument();
      expect(screen.getByText(updatedDescription)).toBeInTheDocument();
    });

    // Mark the task as complete
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);

    // Filter to see only completed tasks
    fireEvent.click(screen.getByRole('button', { name: 'Completed' }));

    // Verify the task appears in completed tasks
    await waitFor(() => {
      expect(screen.getByText(updatedTitle)).toBeInTheDocument();
    });

    // Filter to see only active tasks
    fireEvent.click(screen.getByRole('button', { name: 'Active' }));

    // Verify the task doesn't appear in active tasks
    await waitFor(() => {
      expect(screen.queryByText(updatedTitle)).not.toBeInTheDocument();
    });

    // Go back to all tasks
    fireEvent.click(screen.getByRole('button', { name: 'All' }));

    // Delete the task
    window.confirm = jest.fn().mockReturnValue(true);

    const deleteButtons = screen.getAllByTitle('Delete task');
    fireEvent.click(deleteButtons[0]);

    // Verify the task was deleted
    await waitFor(() => {
      expect(screen.queryByText(updatedTitle)).not.toBeInTheDocument();
    });
  });

  it('redirects unauthenticated users to login', async () => {
    // Mock unauthenticated session
    (useSession as jest.Mock).mockReturnValueOnce({
      data: null,
      status: 'unauthenticated',
    });

    const mockRouter = {
      push: jest.fn(),
      refresh: jest.fn(),
    };

    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    // Render the dashboard page
    render(<Dashboard />);

    // Verify redirect to login
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/login');
    });
  });
});
