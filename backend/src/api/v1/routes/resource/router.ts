import { Router } from 'express';
import { getResources } from '../../controller/reource.controller';
import { userValidation } from 'validation/chat-validation';

const router = Router();

router.get('/', userValidation, getResources);

export default router;
