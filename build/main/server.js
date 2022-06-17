"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const server = http_1.default.createServer(app_1.default);
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8000;
server.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
exports.default = server;