import { NextFunction } from 'express';
import { Schema } from 'joi';
import ErrorResponse from './error-response';
import { CustomRequest } from '../types/custom-request';

const validateSchema = ({
  schema,
  req,
  next,
}: {
  schema: Schema;
  req: CustomRequest;
  next: NextFunction;
}) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    return next(new ErrorResponse(error, 400));
  }
  req.value = value;
  next();
};

export default validateSchema;
