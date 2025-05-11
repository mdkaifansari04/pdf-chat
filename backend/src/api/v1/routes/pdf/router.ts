import express from 'express';
const router = express.Router();
import * as pdfController from '../../controller/pdf.controller';
import { uploadPdfValidation } from 'validation/pdf-validation';
import { chatValidation, userValidation } from 'validation/chat-validation';

router.post('/upload', uploadPdfValidation, pdfController.uploadPdf);
router.post('/chat', chatValidation, pdfController.chatWithDocument);
router.post('/session', userValidation, pdfController.startChatSession);

export default router;
