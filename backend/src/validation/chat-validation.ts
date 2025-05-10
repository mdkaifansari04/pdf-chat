import { NextFunction, Response } from 'express';
import { CustomRequest } from 'types/custom-request';
import Joi from 'joi';
import validateSchema from 'utils/validation';

export const sessionValidation = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const schema = Joi.object().keys({
    userId: Joi.string().required(),
  });
  validateSchema({ req, schema, next });
};

export const chatValidation = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const schema = Joi.object().keys({
    userPrompt: Joi.string().required(),
    sessionId: Joi.string().required(),
    namespace: Joi.string().required(),
    userId: Joi.string().required(),
  });
  validateSchema({ req, schema, next });
};
