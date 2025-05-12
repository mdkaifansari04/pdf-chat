"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorResponse_1 = __importDefault(require("../helper/errorResponse"));
const errorHandler = (err, req, res, next) => {
    try {
        let error = Object.assign({}, err);
        error.message = err.message;
        console.log('Error log from middleware -> ', error);
        // Bad Object Id
        if (err.name === 'CastError') {
            const message = 'Resource not found';
            error = new errorResponse_1.default(message, 404);
        }
        // Validation
        if (err.name === 'ValidationError') {
            const message = Object.values(error.errors).map((val) => { var _a; return (_a = val === null || val === void 0 ? void 0 : val.message) !== null && _a !== void 0 ? _a : 'Validation Error'; });
            error = new errorResponse_1.default(message, 400);
        }
        // Duplicate entries
        if (err.code === 11000) {
            if (err.message.includes('email_1 dup key:')) {
                const message = `User already Exist`;
                error = new errorResponse_1.default(message, 400);
            }
            else {
                const message = `Duplicate Field values.`;
                error = new errorResponse_1.default(message, 400);
            }
        }
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Internal server error',
        });
    }
    catch (error) {
        console.error(`Internal Server Error; ${error}`);
        next(error);
    }
};
exports.default = errorHandler;
