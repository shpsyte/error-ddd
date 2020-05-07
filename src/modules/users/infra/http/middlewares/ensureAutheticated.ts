import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import configAuth from '@config/auth';
import AppError from '@shared/errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const autheader = req.headers.authorization;

  if (!autheader) {
    throw new AppError('Token is missing', 401);
  }

  const [, token] = autheader.split(' ');

  const { secret } = configAuth.jwt;

  try {
    const decoded = verify(token, secret);
    const { sub } = decoded as ITokenPayload;

    req.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid jwt token', 401);
  }
}
