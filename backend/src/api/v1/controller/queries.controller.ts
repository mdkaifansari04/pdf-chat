import { CustomRequest } from 'types/custom-request';
import { Response, NextFunction } from 'express';
import { Query } from '../model/query.model';
import ErrorResponse from 'helper/errorResponse';

export const getAllQueries = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const queries = await Query.find({});
    res
      .status(200)
      .json({ success: true, message: 'All user queries', data: queries });
  } catch (error) {
    next(new ErrorResponse('Internal server error', 500));
  }
};
