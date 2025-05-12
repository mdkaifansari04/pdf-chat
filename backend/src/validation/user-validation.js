"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuthValidation = exports.userRegisterValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const validation_1 = __importDefault(require("utils/validation"));
const userRegisterValidation = (req, _res, next) => {
    const userSchema = joi_1.default.object().keys({
        clerkId: joi_1.default.string().required(),
        name: joi_1.default.string().required(),
        email: joi_1.default.string().required(),
    });
    (0, validation_1.default)({ schema: userSchema, req, next });
};
exports.userRegisterValidation = userRegisterValidation;
const adminAuthValidation = (req, _res, next) => {
    const adminSchema = joi_1.default.object().keys({
        username: joi_1.default.string().required(),
        password: joi_1.default.string().required(),
    });
    (0, validation_1.default)({ schema: adminSchema, req, next });
};
exports.adminAuthValidation = adminAuthValidation;
