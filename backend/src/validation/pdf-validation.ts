import { NextFunction, Response } from 'express';
import { CustomRequest } from 'types/custom-request';
import Joi from 'joi';
import validateSchema from 'utils/validation';
export const uploadPdfValidation = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const schema = Joi.object().keys({
    documentName: Joi.string().required(),
    userId: Joi.string().required(),
    documentUrl: Joi.string().required(),
  });
  validateSchema({ req, schema, next });
};
