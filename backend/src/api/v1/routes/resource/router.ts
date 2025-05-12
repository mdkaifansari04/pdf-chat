import { Router } from 'express';
import * as Resource from '../../controller/resource.controller';

const router = Router();
router.get('/:userId', Resource.getResources);
router.get('/', Resource.getAllResources);

export default router;
