import express from 'express';
import userRouter from './user/router';
import pdfRouter from './pdf/router';
const router = express.Router();

router.use('/users', userRouter);
router.use('/pdf', pdfRouter);

export default router;
