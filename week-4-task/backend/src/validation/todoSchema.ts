import { z } from 'zod';

// Schema for creating a new todo
export const createTodoSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, 'Title cannot be empty')
      .max(100, 'Title cannot be more than 100 characters'),

    description: z
      .string()
      .max(500, 'Description cannot be more than 500 characters')
      .optional(),

    completed: z.boolean().optional().default(false),
    createdBy: z.string().optional(),
  }),
});

// Schema for updating an existing todo
export const updateTodoSchema = z
  .object({
    body: z.object({
      title: z
        .string()
        .min(1, 'Title cannot be empty')
        .max(100, 'Title cannot be more than 100 characters')
        .optional(),

      description: z
        .string()
        .max(500, 'Description cannot be more than 500 characters')
        .optional(),

      completed: z.boolean().optional(),
    }),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update',
  });

// Schema for todo ID parameter
export const todoIdSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Todo ID is required'),
  }),
});

// Types inferred from schemas
export type CreateTodoInput = z.infer<typeof createTodoSchema>['body'];
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>['body'];
export type TodoIdParam = z.infer<typeof todoIdSchema>['params'];
