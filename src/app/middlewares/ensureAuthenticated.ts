import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../../config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ message: 'JWT Token is missing!' })
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.secret);

    const { sub } = decoded as ITokenPayload;

    request.user = { id: sub,  };

    return next();
  } catch {
    return response.status(401).json({ message: 'JWT Token is missing!' })
  }
}