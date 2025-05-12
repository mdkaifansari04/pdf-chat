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
exports.getUserById = exports.getAllUsers = exports.createUser = void 0;
const user_model_1 = require("../model/user.model");
const error_response_1 = __importDefault(require("../../../utils/error-response"));
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { clerkId, name, email } = req.value;
        const user = yield user_model_1.User.create({ clerkId, name, email });
        res
            .status(201)
            .json({ success: true, message: 'User created', data: user });
    }
    catch (error) {
        console.error(error);
        next(new error_response_1.default('Internal server error', 500));
    }
});
exports.createUser = createUser;
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.User.find();
        res
            .status(200)
            .json({ success: true, message: 'Users fetched', data: users });
    }
    catch (error) {
        console.error(error);
        next(new error_response_1.default('Internal server error', 500));
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield user_model_1.User.findById(id);
        res
            .status(200)
            .json({ success: true, message: 'User fetched', data: user });
    }
    catch (error) {
        console.error(error);
        next(new error_response_1.default('Internal server error', 500));
    }
});
exports.getUserById = getUserById;
