"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_response_1 = __importDefault(require("./error-response"));
const validateSchema = ({ schema, req, next, }) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
        return next(new error_response_1.default(error, 400));
    }
    req.value = value;
    next();
};
exports.default = validateSchema;
