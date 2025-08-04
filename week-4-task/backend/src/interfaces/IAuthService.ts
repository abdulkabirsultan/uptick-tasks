type authPayload = { username: string; password: string };
export interface IAuthService {
  register(payload: authPayload): Promise<{
    user: {
      id: unknown;
      username: string;
    };
    token: string;
  }>;
  login(payload: authPayload): Promise<{
    user: { id: unknown; username: string };
    token: string;
  }>;
}
