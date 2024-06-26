import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import TokenError from '../error/token-error';

// eslint-disable-next-line consistent-return
export default (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.cookie;
  if (!authorization) {
    throw new TokenError('Необходима авторизация');
  }

  const token = authorization.slice(4);
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return new TokenError('Необходима авторизация');
  }
  res.locals.user = payload; // записываем айди из пейлоуд
  next(); // пропускаем запрос дальше
};
