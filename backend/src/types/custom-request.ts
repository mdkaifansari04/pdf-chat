import { Request } from 'express';

export interface CustomRequest extends Request {
  file?: any;
  userId?: string;
  value?: any;
}
