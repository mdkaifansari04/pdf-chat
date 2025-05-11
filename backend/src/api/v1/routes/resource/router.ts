import { Router } from 'express';
import { getResources } from '../../controller/resource.controller';
import { userValidation } from 'validation/chat-validation';

const router = Router();

router.get('/:userId', getResources);

export default router;
