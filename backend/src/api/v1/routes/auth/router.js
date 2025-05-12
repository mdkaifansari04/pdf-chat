"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../../controller/auth.controller");
const user_validation_1 = require("validation/user-validation");
const router = (0, express_1.Router)();
router.post('/login', user_validation_1.adminAuthValidation, auth_controller_1.login);
router.post('/', auth_controller_1.register);
exports.default = router;
