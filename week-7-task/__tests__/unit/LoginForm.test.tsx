import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '../../src/components/auth/LoginForm';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

// Mock the modules
jest.mock('next-auth/react');
jest.mock('next/navigation');
jest.mock('react-hot-toast');

describe('LoginForm Component', () => {
  // Setup common test variables
  const mockSignIn = signIn as jest.Mock;
  const mockRouter = {
    push: jest.fn(),
    refresh: jest.fn(),
  };
  const mockToast = {
    success: jest.fn(),
    error: jest.fn(),
  };

  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (toast.success as jest.Mock).mockImplementation(mockToast.success);
    (toast.error as jest.Mock).mockImplementation(mockToast.error);
  });

  it('renders the login form correctly', () => {
    render(<LoginForm />);
    
    // Check if the form elements are rendered
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
    expect(screen.getByText(/Don't have an account/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Sign up' })).toBeInTheDocument();
  });

  it('handles input changes', () => {
    render(<LoginForm />);
    
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  it('handles successful login submission', async () => {
    // Mock successful sign in
    mockSignIn.mockResolvedValueOnce({ ok: true, error: null });
    
    render(<LoginForm />);
    
    // Fill in the form
    fireEvent.change(screen.getByLabelText('Email'), { 
      target: { value: 'test@example.com' } 
    });
    fireEvent.change(screen.getByLabelText('Password'), { 
      target: { value: 'password123' } 
    });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));
    
    // Verify that signIn was called with correct params
    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('credentials', {
        redirect: false,
        email: 'test@example.com',
        password: 'password123',
      });
    });
    
    // Verify navigation and toast
    await waitFor(() => {
      expect(mockToast.success).toHaveBeenCalledWith('Login successful!');
      expect(mockRouter.push).toHaveBeenCalledWith('/dashboard');
      expect(mockRouter.refresh).toHaveBeenCalled();
    });
  });

  it('handles login error', async () => {
    // Mock failed sign in
    mockSignIn.mockResolvedValueOnce({ 
      ok: false, 
      error: 'Invalid credentials' 
    });
    
    render(<LoginForm />);
    
    // Fill in the form
    fireEvent.change(screen.getByLabelText('Email'), { 
      target: { value: 'test@example.com' } 
    });
    fireEvent.change(screen.getByLabelText('Password'), { 
      target: { value: 'wrongpassword' } 
    });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));
    
    // Verify that signIn was called
    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalled();
    });
    
    // Verify error toast and no navigation
    await waitFor(() => {
      expect(mockToast.error).toHaveBeenCalledWith('Invalid credentials');
      expect(mockRouter.push).not.toHaveBeenCalled();
    });
  });

  it('shows loading state during submission', async () => {
    // Mock a slow response to observe loading state
    mockSignIn.mockImplementation(() => new Promise(resolve => {
      setTimeout(() => {
        resolve({ ok: true, error: null });
      }, 100);
    }));
    
    render(<LoginForm />);
    
    // Fill and submit form
    fireEvent.change(screen.getByLabelText('Email'), { 
      target: { value: 'test@example.com' } 
    });
    fireEvent.change(screen.getByLabelText('Password'), { 
      target: { value: 'password123' } 
    });
    
    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));
    
    // Check that the button shows loading state
    expect(screen.getByRole('button', { name: 'Signing in...' })).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
    
    // Wait for the operation to complete
    await waitFor(() => {
      expect(mockToast.success).toHaveBeenCalled();
    });
  });
});
