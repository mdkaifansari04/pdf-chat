import { NextFunction, Response } from 'express';
import Joi from 'joi';
import { CustomRequest } from 'types/custom-request';
import validateSchema from 'utils/validation';

export const userRegisterValidation = (
  req: CustomRequest,
  _res: Response,
  next: NextFunction,
) => {
  const userSchema = Joi.object().keys({
    clerkId: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().required(),
  });

  validateSchema({ schema: userSchema, req, next });
};
