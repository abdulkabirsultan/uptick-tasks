import express from 'express';
import {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} from '../controllers/todoController';
import { validate } from '../middleware/validateRequest';
import {
  createTodoSchema,
  updateTodoSchema,
  todoIdSchema,
} from '../validation/todoSchema';

const router = express.Router();

router.route('/').get(getTodos).post(validate(createTodoSchema), createTodo);

router
  .route('/:id')
  .get(validate(todoIdSchema), getTodo)
  .put(validate(todoIdSchema), validate(updateTodoSchema), updateTodo)
  .delete(validate(todoIdSchema), deleteTodo);

export default router;
