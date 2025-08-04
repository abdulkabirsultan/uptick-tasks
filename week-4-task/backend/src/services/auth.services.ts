import { StatusCodes } from 'http-status-codes';
import UserModel from '../models/User.model';
import { createJwt } from '../utils/jwtUtils';
import { IAuthService } from '../interfaces/IAuthService';

type authPayload = { username: string; password: string };

class AuthService implements IAuthService {
  async register(payload: authPayload) {
    const user = await UserModel.create(payload);
    const token = createJwt({ userId: user._id, username: user.username });
    return {
      user: {
        id: user._id,
        username: user.username,
      },
      token,
    };
  }

  async login({ username, password }: authPayload) {
    try {
      // Find user
      const user = await UserModel.findOne({ username });
      if (!user) throw new Error('Invalid Credentials');

      // Check Password
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) throw new Error('Invalid Credentials');

      //Create token
      const token = createJwt({ userId: user._id, username: user.username });
      return {
        user: {
          id: user._id,
          username: user.username,
        },
        token,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
export default new AuthService();
