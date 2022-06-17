import express from "express";
import controller from "../controllers/base";
const router = express.Router();

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
router.get("/", controller.get);

export = router;
