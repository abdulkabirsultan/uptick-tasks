import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key'!;
const JWT_LIFETIME = (process.env.JWT_LIFETIME as unknown) || '1d'!;
export const createJwt = (payload: {
  userId: string | unknown;
  username: string;
}) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_LIFETIME as number });
};

export const verifyJwt = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
