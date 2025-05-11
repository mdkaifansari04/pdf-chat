import express from 'express';
import userRouter from './user/router';
import pdfRouter from './pdf/router';
import resourceRouter from './resource/router';
import queryRouter from './queries/router';

const router = express.Router();

router.use('/users', userRouter);
router.use('/pdf', pdfRouter);
router.use('/resources', resourceRouter);
router.use('/queries', queryRouter);
export default router;
