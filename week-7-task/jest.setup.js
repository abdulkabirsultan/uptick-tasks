import '@testing-library/jest-dom';
import { server } from './__tests__/mocks/server';

// Setup MSW
beforeAll(() => {
  // Start the MSW server before all tests
  server.listen({ onUnhandledRequest: 'warn' });
});

afterEach(() => {
  // Reset any request handlers that we may add during tests
  server.resetHandlers();
});

afterAll(() => {
  // Clean up after all tests are done
  server.close();
});

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
  usePathname: jest.fn().mockReturnValue('/'),
}));

// Mock next-auth/react
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({ 
    data: { user: { name: 'Test User', email: 'test@example.com' } }, 
    status: 'authenticated' 
  })),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Suppress console errors during tests
global.console.error = jest.fn();

// Reset mocks after each test
afterEach(() => {
  jest.clearAllMocks();
});
