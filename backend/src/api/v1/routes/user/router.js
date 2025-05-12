"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("api/v1/controller");
const express_1 = __importDefault(require("express"));
const user_validation_1 = require("validation/user-validation");
const router = express_1.default.Router();
router.post('/', user_validation_1.userRegisterValidation, controller_1.userController.createUser);
router.get('/', controller_1.userController.getAllUsers);
router.get('/:id', controller_1.userController.getUserById);
exports.default = router;
