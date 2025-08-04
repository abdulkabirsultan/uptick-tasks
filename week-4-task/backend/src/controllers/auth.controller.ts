import { Request, Response } from 'express';
import AuthService from '../services/auth.services';
import { StatusCodes } from 'http-status-codes';

export const register = async (req: Request, res: Response) => {
  try {
    const user = await AuthService.register(req.body);
    res.status(StatusCodes.CREATED).json(user);
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const user = await AuthService.login(req.body);
    res.status(StatusCodes.OK).json(user);
  } catch (error: any) {
    res.status(StatusCodes.UNAUTHORIZED).json({ error: error.message });
  }
};
