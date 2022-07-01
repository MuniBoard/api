import express from "express";
import baseRouter from "./base";
import municipalityRouter from './municipality';
import postRouter from './post';

const exportedRouter = express.Router({mergeParams: true});
exportedRouter.use('/', baseRouter);
exportedRouter.use('/municipality', municipalityRouter);
exportedRouter.use('/municipality/:municipalityId/post', postRouter);

export default exportedRouter;