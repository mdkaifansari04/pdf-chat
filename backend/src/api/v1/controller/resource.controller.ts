import { CustomRequest } from 'types/custom-request';
import Resource from '../model/resource.model';
import { NextFunction, Response } from 'express';
import ErrorResponse from 'helper/errorResponse';

export const getResources = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params;
    const resources = await Resource.find({ userId });
    res.status(200).json({ success: true, data: resources });
  } catch (error) {
    console.log(error);
    next(new ErrorResponse('Internal server error', 500));
  }
};

export const getAllResources = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const resources = await Resource.find({});
    res.status(200).json({ success: true, data: resources });
  } catch (error) {
    console.log(error);
    next(new ErrorResponse('Internal server error', 500));
  }
};
