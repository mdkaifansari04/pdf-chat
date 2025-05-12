"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const errorResponse_1 = __importDefault(require("helper/errorResponse"));
const admin_model_1 = require("../model/admin.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("config/env");
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.value;
        const admin = yield admin_model_1.Admin.findOne({ username });
        if (!admin)
            return next(new errorResponse_1.default('Invalid username or password', 401));
        const isMatch = yield bcrypt_1.default.compare(password, admin.password);
        if (!isMatch)
            return next(new errorResponse_1.default('Invalid username or password', 401));
        const token = jsonwebtoken_1.default.sign({ id: admin._id }, env_1.JWT_SECRET, {
            expiresIn: '1h',
        });
        res
            .status(200)
            .json({ success: true, message: 'Admin logged in', data: { token } });
    }
    catch (error) {
        console.log(error);
        next(new errorResponse_1.default('Internal server error', 500));
    }
});
exports.login = login;
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const admin = yield admin_model_1.Admin.create({ username, password });
        res
            .status(201)
            .json({ success: true, message: 'Admin registered', data: admin });
    }
    catch (error) {
        console.log(error);
        next(new errorResponse_1.default('Internal server error', 500));
    }
});
exports.register = register;
