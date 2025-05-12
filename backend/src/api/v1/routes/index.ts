import express from 'express';
import userRouter from './user/router';
import pdfRouter from './pdf/router';
import resourceRouter from './resource/router';
import queryRouter from './queries/router';
import analyticsRouter from './analytics/router';
import authRouter from './auth/router';
const router = express.Router();

router.use('/users', userRouter);
router.use('/pdf', pdfRouter);
router.use('/resources', resourceRouter);
router.use('/queries', queryRouter);
router.use('/analytics', analyticsRouter);
router.use('/admin', authRouter);
export default router;
