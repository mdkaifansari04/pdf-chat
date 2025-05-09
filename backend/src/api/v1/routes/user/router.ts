import { userController } from 'api/v1/controller';
import express from 'express';
import { userRegisterValidation } from 'validation/user-validation';
const router = express.Router();

router.post('/', userRegisterValidation, userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);

export default router;
