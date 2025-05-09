import express from 'express';
import userRouter from './user/router';
import pdfRouter from './pdf/router';
const router = express.Router();

router.use('/user', userRouter);
router.use('/pdf', pdfRouter);

export default router;
