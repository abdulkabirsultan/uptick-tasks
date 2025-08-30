# Task Manager App

A full-stack task management application built with Next.js, TypeScript, and Tailwind CSS.

## Features

- User authentication (login, register, logout)
- Task CRUD operations (create, read, update, delete)
- Task filtering and sorting
- Responsive design for all device sizes
- Comprehensive test coverage

## Tech Stack

- **Frontend**:

  - Next.js 14 with App Router
  - TypeScript
  - Tailwind CSS
  - NextAuth.js for authentication
  - React Hot Toast for notifications
  - Heroicons for icons

- **Backend**:

  - Node.js API (connects to an external backend)
  - JWT authentication

- **Testing**:
  - Jest for test runner and assertions
  - React Testing Library for component testing
  - MSW (Mock Service Worker) for API mocking

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Backend API server running (see week-4-task backend)

### Installation

1. Clone the repository
2. Navigate to the project directory

```bash
cd week-6-task
```

3. Install dependencies

```bash
npm install
```

4. Create a `.env.local` file in the root directory and add the following variables:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key_replace_this_in_production
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

5. Run the development server

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
app/
├── api/                # API routes for server-side operations
│   ├── auth/           # Authentication API routes
│   └── tasks/          # Task management API routes
├── components/         # React components
│   ├── auth/           # Authentication components
│   ├── tasks/          # Task-related components
│   └── ui/             # UI components
├── lib/                # Utility functions and providers
├── types/              # TypeScript type definitions
└── ...                 # Page routes
```

## Usage

1. Register a new account or log in
2. Create tasks by filling out the form
3. View your tasks on the dashboard
4. Filter tasks by status (all, active, completed)
5. Mark tasks as complete by checking the checkbox
6. Edit or delete tasks using the buttons

## Testing

The project includes comprehensive test coverage with unit tests, integration tests, and end-to-end tests.

### Test Structure

```
__tests__/
├── unit/              # Unit tests for individual components
├── integration/       # Integration tests for component interactions
├── e2e/               # End-to-end tests for full user flows
└── mocks/             # Mock data and MSW handlers for API mocking
```

### Running Tests

Run all tests:

```bash
npm test
```

Run unit tests only:

```bash
npm run test:unit
```

Run integration tests only:

```bash
npm run test:integration
```

Run end-to-end tests only:

```bash
npm run test:e2e
```

Generate test coverage report:

```bash
npm run test:coverage
```

## Docker Deployment

The application can be containerized using Docker:

1. Build the Docker image:

```bash
sudo docker build -t task-manager .
```

2. Run the container:

```bash
sudo docker run -p 3000:3000 task-manager
```

3. Alternatively, use docker-compose:

```bash
sudo docker-compose up
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
