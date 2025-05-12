"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.OPENAI_API_KEY = exports.PINECONE_API_KEY = exports.MONGO_URI = exports.PORT = void 0;
if (process.env.NODE_ENV !== 'production') {
    // Only load dotenv in development
    const path = require('path');
    const { config } = require('dotenv');
    config({ path: path.resolve(process.cwd(), '.env') });
}
_a = process.env, exports.PORT = _a.PORT, exports.MONGO_URI = _a.MONGO_URI, exports.PINECONE_API_KEY = _a.PINECONE_API_KEY, exports.OPENAI_API_KEY = _a.OPENAI_API_KEY, exports.JWT_SECRET = _a.JWT_SECRET;
