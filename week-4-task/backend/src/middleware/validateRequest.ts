import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

export const validate =
  (schema: z.ZodType<any, any, any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Format Zod errors for better readability
        const errors = error.issues.map((err) => ({
          path: err.path.join('.'),
          message: err.message,
        }));

        return res.status(400).json({
          success: false,
          errors,
        });
      }

      next(error);
    }
  };
