import express from "express";
import controller from "../controllers/base";
const router = express.Router();

router.get("/", controller.get);

export = router;
