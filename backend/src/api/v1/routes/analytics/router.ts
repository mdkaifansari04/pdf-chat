import { Router } from 'express';
import * as Analytics from '../../controller/analytics.controller';
const router = Router();

router.get('/:startDate/:endDate', Analytics.getAnalytics);

export default router;
