import express from "express";
import controller from "../controllers/municipality";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Municipality
 *   description : create and view municipalities
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     MunicipalityRequest:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: The municipality's name
 *         coordinates:
 *           type: object
 *           description: The municipality's coordinates
 *           properties:
 *             lat:
 *               type: number
 *               description: latitude of the municipality
 *             long:
 *               type: number
 *               description: longitude of the municipality
 *         website:
 *           type: string
 *           description: The municipality's website
 *       example:
 *         name: Québec
 *         coordinates:
 *           lat: 46.8565177
 *           long: -71.4817748
 *         website: https://www.ville.quebec.qc.ca/
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     MunicipalityResponse:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the municipality
 *         name:
 *           type: string
 *           description: The municipality's name
 *         coordinates:
 *           type: object
 *           description: The municipality's coordinates
 *           properties:
 *             lat:
 *               type: number
 *               description: latitude of the municipality
 *             long:
 *               type: number
 *               description: longitude of the municipality
 *         website:
 *           type: string
 *           description: The municipality's website
 *       example:
 *         id: 6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b
 *         name: Québec
 *         coordinates:
 *           lat: 46.8565177
 *           long: -71.4817748
 *         website: https://www.ville.quebec.qc.ca/
 */

/**
 * @swagger
 * /municipality:
 *  post:
 *    summary: Create a municipality
 *    tags: [Municipality]
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MunicipalityRequest'
 *         
 *    responses:
 *      201:
 *        description: Municipality successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MunicipalityResponse'
 *      400:
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 */
router.post("/", controller.post);
router.get("/", controller.get);

export = router;