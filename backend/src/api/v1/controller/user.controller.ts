import { NextFunction, Response } from 'express';
import { CustomRequest } from '../../../types/custom-request';
import { User } from '../model/user.model';
import ErrorResponse from '../../../utils/error-response';

export const createUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { clerkId, name, email } = req.value;
    const user = await User.create({ clerkId, name, email });
    res
      .status(201)
      .json({ success: true, message: 'User created', data: user });
  } catch (error) {
    console.error(error);
    next(new ErrorResponse('Internal server error', 500));
  }
};

export const getAllUsers = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await User.find();
    res
      .status(200)
      .json({ success: true, message: 'Users fetched', data: users });
  } catch (error) {
    console.error(error);
    next(new ErrorResponse('Internal server error', 500));
  }
};

export const getUserById = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res
      .status(200)
      .json({ success: true, message: 'User fetched', data: user });
  } catch (error) {
    console.error(error);
    next(new ErrorResponse('Internal server error', 500));
  }
};
