"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const base_1 = __importDefault(require("../controllers/base"));
const router = express_1.default.Router();
router.get("/", base_1.default.get);
module.exports = router;
