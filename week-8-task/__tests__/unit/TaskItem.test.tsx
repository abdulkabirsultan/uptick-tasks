import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TaskItem from '../../src/components/tasks/TaskItem';
import { mockTasks } from '../mocks/mockData';

// Create mock functions for the required props
const mockOnUpdate = jest.fn();
const mockOnDelete = jest.fn();

describe('TaskItem Component', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders task correctly', () => {
    const task = mockTasks[0];

    render(
      <TaskItem task={task} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />
    );

    // Verify that the task title and description are rendered
    expect(screen.getByText(task.title)).toBeInTheDocument();
    expect(screen.getByText(task.description as string)).toBeInTheDocument();

    // Verify that the created date is shown
    expect(screen.getByText(/Created:/)).toBeInTheDocument();
  });

  it('toggles task completion status when checkbox is clicked', async () => {
    const task = mockTasks[0];

    render(
      <TaskItem task={task} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    // Click the checkbox to toggle completion status
    fireEvent.click(checkbox);

    // Wait for the API call to complete
    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith({
        ...task,
        completed: !task.completed,
      });
    });
  });

  it('enters edit mode when edit button is clicked', () => {
    const task = mockTasks[0];

    render(
      <TaskItem task={task} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />
    );

    // Find and click the edit button
    const editButton = screen.getByTitle('Edit task');
    fireEvent.click(editButton);

    // Verify that the form fields for editing appear
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Description (optional)')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('updates task when edit form is submitted', async () => {
    const task = mockTasks[0];

    render(
      <TaskItem task={task} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />
    );

    // Enter edit mode
    const editButton = screen.getByTitle('Edit task');
    fireEvent.click(editButton);

    // Change the title and description
    const titleInput = screen.getByLabelText('Title');
    const descriptionInput = screen.getByLabelText('Description (optional)');

    fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
    fireEvent.change(descriptionInput, {
      target: { value: 'Updated description' },
    });

    // Submit the form
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    // Wait for the API call to complete
    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith({
        ...task,
        title: 'Updated Title',
        description: 'Updated description',
      });
    });
  });

  it('cancels editing when cancel button is clicked', () => {
    const task = mockTasks[0];

    render(
      <TaskItem task={task} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />
    );

    // Enter edit mode
    const editButton = screen.getByTitle('Edit task');
    fireEvent.click(editButton);

    // Change the title
    const titleInput = screen.getByLabelText('Title');
    fireEvent.change(titleInput, { target: { value: 'Changed Title' } });

    // Click cancel button
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    // Verify that we're back to display mode with original title
    expect(screen.getByText(task.title)).toBeInTheDocument();
    expect(mockOnUpdate).not.toHaveBeenCalled();
  });

  it('deletes task when delete button is clicked and confirmed', async () => {
    const task = mockTasks[0];

    // Mock window.confirm to return true
    window.confirm = jest.fn().mockReturnValue(true);

    render(
      <TaskItem task={task} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />
    );

    // Find and click the delete button
    const deleteButton = screen.getByTitle('Delete task');
    fireEvent.click(deleteButton);

    // Verify confirm was called
    expect(window.confirm).toHaveBeenCalledWith(
      'Are you sure you want to delete this task?'
    );

    // Wait for the API call to complete
    await waitFor(() => {
      expect(mockOnDelete).toHaveBeenCalledWith(task.id);
    });
  });

  it('does not delete task when delete is canceled', async () => {
    const task = mockTasks[0];

    // Mock window.confirm to return false
    window.confirm = jest.fn().mockReturnValue(false);

    render(
      <TaskItem task={task} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />
    );

    // Find and click the delete button
    const deleteButton = screen.getByTitle('Delete task');
    fireEvent.click(deleteButton);

    // Verify confirm was called but onDelete was not
    expect(window.confirm).toHaveBeenCalled();
    expect(mockOnDelete).not.toHaveBeenCalled();
  });
});
