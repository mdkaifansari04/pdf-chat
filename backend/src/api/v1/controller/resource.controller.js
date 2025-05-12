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
exports.getAllResources = exports.getResources = void 0;
const resource_model_1 = __importDefault(require("../model/resource.model"));
const errorResponse_1 = __importDefault(require("helper/errorResponse"));
const getResources = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const resources = yield resource_model_1.default.find({ userId });
        res.status(200).json({ success: true, data: resources });
    }
    catch (error) {
        console.log(error);
        next(new errorResponse_1.default('Internal server error', 500));
    }
});
exports.getResources = getResources;
const getAllResources = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resources = yield resource_model_1.default.find({});
        res.status(200).json({ success: true, data: resources });
    }
    catch (error) {
        console.log(error);
        next(new errorResponse_1.default('Internal server error', 500));
    }
});
exports.getAllResources = getAllResources;
