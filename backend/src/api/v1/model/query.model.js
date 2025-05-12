"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
const mongoose_1 = require("mongoose");
const querySchema = new mongoose_1.Schema({
    userClerkId: {
        type: String,
        required: true,
    },
    messages: [
        {
            sender: {
                type: String,
                enum: ['user', 'model'],
                required: true,
            },
            text: {
                type: String,
                required: true,
            },
            timestamps: {
                type: Date,
                default: Date.now(),
            },
        },
    ],
    sessionId: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.Query = (0, mongoose_1.model)('query', querySchema);
