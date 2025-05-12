"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadPdfValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const validation_1 = __importDefault(require("utils/validation"));
const uploadPdfValidation = (req, res, next) => {
    const schema = joi_1.default.object().keys({
        documentName: joi_1.default.string().required(),
        userId: joi_1.default.string().required(),
        documentUrl: joi_1.default.string().required(),
    });
    (0, validation_1.default)({ req, schema, next });
};
exports.uploadPdfValidation = uploadPdfValidation;
