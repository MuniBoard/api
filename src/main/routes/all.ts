import express from "express";
import baseRouter from "./base";
import municipalityRouter from './municipality';

const exportedRouter = express.Router();
exportedRouter.use('/', baseRouter);
exportedRouter.use('/municipality', municipalityRouter);

export default exportedRouter;