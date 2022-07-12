import express from "express";
import controller from "../controllers/post";
const router = express.Router({ mergeParams: true });

/**
 * @swagger
 * tags:
 *   name: Post
 *   description : create and view posts
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PostRequest:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           description: The post's title
 *         content:
 *           type: string
 *           description: The post's description
 *           properties:
 *       example:
 *         title: My Post
 *         content: My Content
 *     PostResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The post's id
 *         title:
 *           type: string
 *           description: The post's title
 *         content:
 *           type: string
 *           description: The post's description
 *           properties:
 *       example:
 *         id: 6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b
 *         title: My Post
 *         content: My Content
 */

router.use("/:postId?", controller.verify);

/**
 * @swagger
 * /municipality/{municipalityId}/post:
 *   post:
 *     summary: Create a post for municipality with specified id
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: municipalityId
 *         schema:
 *           type: string
 *         required: true
 *         description: The municipality id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostRequest'
 *     responses:
 *       200:
 *         description: Post successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostResponse'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *
 */
router.post("/", controller.post);

/**
 * @swagger
 * /municipality/{municipalityId}/post:
 *   get:
 *     summary: View posts
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: municipalityId
 *         schema:
 *           type: string
 *         required: true
 *         description: The municipality id
 *     responses:
 *       200:
 *         description: List of posts successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               municipalities:
 *                 type: array
 *                 items:
 *                   $ref:'#/components/schemas/PostResponse'
 *               example:
 *                 posts:
 *                   - id: 6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b
 *                     title: I like this place
 *                     content: Just wanted to say it
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
 * /municipality/{municipalityId}/post/{postId}:
 *   get:
 *     summary: Get the post with specified id
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: municipalityId
 *         schema:
 *           type: string
 *         required: true
 *         description: The municipality id
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: The post id
 *     responses:
 *       200:
 *         description: List of municipalities successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostResponse'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *
 */
router.get("/:postId", controller.getSingle);

export = router;
