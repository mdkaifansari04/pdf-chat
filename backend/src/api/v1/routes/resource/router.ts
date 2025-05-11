import { Router } from 'express';
import { getResources } from '../../controller/resource.controller';

const router = Router();
router.get('/:userId', getResources);

export default router;
