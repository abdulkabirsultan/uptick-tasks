import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '../../src/components/auth/LoginForm';
import RegisterForm from '../../src/components/auth/RegisterForm';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

// Mock modules
jest.mock('next-auth/react');
jest.mock('next/navigation');
jest.mock('react-hot-toast');

describe('Authentication End-to-End Flow', () => {
  // Setup common test variables
  const mockSignIn = signIn as jest.Mock;
  const mockRouter = {
    push: jest.fn(),
    refresh: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('allows user registration and login flow', async () => {
    // Mock the fetch for registration
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest
        .fn()
        .mockResolvedValue({ message: 'User registered successfully' }),
    });

    // Step 1: Render the registration form
    const { unmount } = render(<RegisterForm />);

    // Fill in the registration form
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'New User' },
    });

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'newuser@example.com' },
    });

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });

    fireEvent.change(screen.getByLabelText('Confirm Password'), {
      target: { value: 'password123' },
    });

    // Submit the registration form
    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));

    // Verify registration API was called
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/auth/register',
        expect.any(Object)
      );
    });

    // Verify user is redirected to login
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/login');
    });

    // Unmount registration form to simulate page navigation
    unmount();

    // Step 2: Mock successful sign in for the next step
    mockSignIn.mockResolvedValueOnce({ ok: true, error: null });

    // Step 3: Render the login form
    render(<LoginForm />);

    // Fill in login form with the same credentials
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'newuser@example.com' },
    });

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });

    // Submit the login form
    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

    // Verify login was called with correct credentials
    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('credentials', {
        redirect: false,
        email: 'newuser@example.com',
        password: 'password123',
      });
    });

    // Verify user is redirected to dashboard
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('handles registration errors properly', async () => {
    // Mock the fetch for failed registration (email already in use)
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      status: 409,
      json: jest.fn().mockResolvedValue({ error: 'Email already in use' }),
    });

    // Mock toast
    const mockToast = {
      success: jest.fn(),
      error: jest.fn(),
    };
    (toast.success as jest.Mock).mockImplementation(mockToast.success);
    (toast.error as jest.Mock).mockImplementation(mockToast.error);

    // Render registration form
    render(<RegisterForm />);

    // Fill in registration form
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Existing User' },
    });

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'existing@example.com' },
    });

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });

    fireEvent.change(screen.getByLabelText('Confirm Password'), {
      target: { value: 'password123' },
    });

    // Submit the registration form
    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));

    // Verify error toast is shown
    await waitFor(() => {
      expect(mockToast.error).toHaveBeenCalledWith('Email already in use');
      expect(mockRouter.push).not.toHaveBeenCalled();
    });
  });

  it('handles password mismatch during registration', async () => {
    // Mock toast
    const mockToast = {
      success: jest.fn(),
      error: jest.fn(),
    };
    (toast.success as jest.Mock).mockImplementation(mockToast.success);
    (toast.error as jest.Mock).mockImplementation(mockToast.error);

    // Render registration form
    render(<RegisterForm />);

    // Fill in registration form with mismatching passwords
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'New User' },
    });

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'newuser@example.com' },
    });

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });

    fireEvent.change(screen.getByLabelText('Confirm Password'), {
      target: { value: 'differentpassword' },
    });

    // Submit the registration form
    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));

    // Verify error message is shown
    await waitFor(() => {
      expect(mockToast.error).toHaveBeenCalledWith('Passwords do not match');
      expect(global.fetch).not.toHaveBeenCalled();
    });
  });

  it('handles login failure', async () => {
    // Mock failed login
    mockSignIn.mockResolvedValueOnce({
      ok: false,
      error: 'Invalid email or password',
    });

    // Mock toast
    const mockToast = {
      success: jest.fn(),
      error: jest.fn(),
    };
    (toast.success as jest.Mock).mockImplementation(mockToast.success);
    (toast.error as jest.Mock).mockImplementation(mockToast.error);

    // Render login form
    render(<LoginForm />);

    // Fill in login form with invalid credentials
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'wrong@example.com' },
    });

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'wrongpassword' },
    });

    // Submit the login form
    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

    // Verify error toast is shown
    await waitFor(() => {
      expect(mockToast.error).toHaveBeenCalledWith('Invalid email or password');
      expect(mockRouter.push).not.toHaveBeenCalled();
    });
  });
});
