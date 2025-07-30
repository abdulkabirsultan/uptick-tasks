# Todo List API

A simple RESTful API for managing todo items built with Express.js, TypeScript, and MongoDB.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB

## Installation

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables by creating a `.env` file in the root directory:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/todo-app
   ```

## Usage

### Development Mode

```
npm run dev
```

### Production Mode

```
npm run build
npm start
```

## API Endpoints

### Todos

- **GET /api/todos** - Get all todos
- **GET /api/todos/:id** - Get a specific todo
- **POST /api/todos** - Create a new todo
- **PUT /api/todos/:id** - Update a todo
- **DELETE /api/todos/:id** - Delete a todo

### Request & Response Examples

#### Create a Todo

**Request:**

```http
POST /api/todos
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the Todo API project",
  "completed": false
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "60f7b0b9e6c7a234b8c0f0a1",
    "title": "Complete project",
    "description": "Finish the Todo API project",
    "completed": false,
    "createdAt": "2023-07-21T10:30:33.987Z",
    "updatedAt": "2023-07-21T10:30:33.987Z"
  }
}
```

## License

ISC
