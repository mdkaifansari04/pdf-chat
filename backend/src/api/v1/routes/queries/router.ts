import { Router } from 'express';
import * as Query from '../../controller/queries.controller';

const router = Router();
router.get('/', Query.getAllQueries);

export default router;
