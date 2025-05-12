import { Response, NextFunction } from 'express';
import ErrorResponse from 'helper/errorResponse';
import { CustomRequest } from 'types/custom-request';
import { Admin } from '../model/admin.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from 'config/env';

export const login = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username, password } = req.value;
    const admin = await Admin.findOne({ username });
    if (!admin)
      return next(new ErrorResponse('Invalid username or password', 401));

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return next(new ErrorResponse('Invalid username or password', 401));

    const token = jwt.sign({ id: admin._id }, JWT_SECRET!, {
      expiresIn: '1h',
    });

    res
      .status(200)
      .json({ success: true, message: 'Admin logged in', data: { token } });
  } catch (error) {
    console.log(error);
    next(new ErrorResponse('Internal server error', 500));
  }
};

export const register = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.create({ username, password });
    res
      .status(201)
      .json({ success: true, message: 'Admin registered', data: admin });
  } catch (error) {
    console.log(error);
    next(new ErrorResponse('Internal server error', 500));
  }
};
