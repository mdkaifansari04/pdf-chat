"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const resourceSchema = new mongoose_1.Schema({
    documentName: {
        type: String,
        required: true,
    },
    documentUrl: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    namespace: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const Resource = (0, mongoose_1.model)('Resource', resourceSchema);
exports.default = Resource;
