import { Router } from 'express';
import { login, register } from '../../controller/auth.controller';
import { adminAuthValidation } from 'validation/user-validation';

const router = Router();
router.post('/login', adminAuthValidation, login);
router.post('/', register);

export default router;
