"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./config/db");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const error_1 = __importDefault(require("./middleware/error"));
const routes_1 = __importDefault(require("./api/v1/routes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
(0, db_1.connectToDB)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send('Server is running');
});
app.use('/api/v1', routes_1.default);
app.use(error_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
