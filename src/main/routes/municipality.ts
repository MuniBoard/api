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
/**
 * @swagger
 * /municipality:
 *   get:
 *     summary: Views municipalities
 *     tags: [Municipality]
 *     responses:
 *       200:
 *         description: List of municipalities successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               municipalities:
 *                 type: array
 *                 items: 
 *                   $ref:'#/components/schemas/MunicipalityResponse' 
 *               example: 
 *                 municipalities:
 *                   - id: 6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b
 *                     name: Québec
 *                     coordinates:
 *                       lat: 46.8565177
 *                       long: -71.4817748
 *                     website: https://www.ville.quebec.qc.ca/
 *                   
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               
 */
router.get("/", controller.get);

/**
 * @swagger
 * /municipality/{id}:
 *   get:
 *     summary: Get the municipality with specified id
 *     tags: [Municipality]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The municipality id
 *     responses:
 *       200:
 *         description: List of municipalities successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MunicipalityResponse' 
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               
 */
router.get("/:id", controller.getSingle);

export = router;