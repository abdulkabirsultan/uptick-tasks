import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verifyJwt } from '../utils/jwtUtils';

declare global {
  namespace Express {
    interface Request {
      user?: { userId: string; name: string };
    }
  }
}

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check for token in headers
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: 'Authentication invalid' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = verifyJwt(token) as { userId: string; name: string };
    req.user = payload;
    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: 'Authentication invalid' });
  }
};
