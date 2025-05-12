"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pinecone_1 = require("@pinecone-database/pinecone");
const env_1 = require("config/env");
const pinecone = new pinecone_1.Pinecone({
    apiKey: env_1.PINECONE_API_KEY,
});
exports.default = pinecone;
