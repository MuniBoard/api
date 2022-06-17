"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const base_1 = __importDefault(require("../controllers/base"));
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: Health
 *   description : View API Health
 */
/**
 * @swagger
 * /:
 *  get:
 *    summary: Check API Works
 *    tags: [Health]
 *    responses:
 *      200:
 *        description: API is working
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 */
router.get("/", base_1.default.get);
module.exports = router;
