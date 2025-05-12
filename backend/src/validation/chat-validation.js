"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatValidation = exports.userValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const validation_1 = __importDefault(require("utils/validation"));
const userValidation = (req, res, next) => {
    const schema = joi_1.default.object().keys({
        userId: joi_1.default.string().required(),
    });
    (0, validation_1.default)({ req, schema, next });
};
exports.userValidation = userValidation;
const chatValidation = (req, res, next) => {
    const schema = joi_1.default.object().keys({
        userPrompt: joi_1.default.string().required(),
        sessionId: joi_1.default.string().required(),
        namespace: joi_1.default.string().required(),
        userId: joi_1.default.string().required(),
    });
    (0, validation_1.default)({ req, schema, next });
};
exports.chatValidation = chatValidation;
