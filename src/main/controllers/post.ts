import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import {
  getRepository,
  ObjectsManipulated,
} from "../repositories/repositories";
import { objectContainsNoOtherKeys } from "./utils/all";

const municipalityWithIdExists = (id: any) => {
  return !!getRepository(ObjectsManipulated.Municipality).get(id);
};

const isValidCreationRequest = (request: Request) => {
  const containsBody = !!request.body;
  const containsValidTitle =
    !!request.body?.title && typeof request.body?.title === "string";
  const containsValidContent =
    !request.body?.content ||
    (request.body?.content && typeof request.body?.content === "string");
  return (
    containsBody &&
    containsValidTitle &&
    containsValidContent &&
    objectContainsNoOtherKeys(request.body, ["title", "content"])
  );
};

const post = async (req: Request, res: Response, next: NextFunction) => {
  if (!isValidCreationRequest(req)) {
    return res.status(400).json();
  }

  const id = uuidv4();
  const createdPost = {
    id,
    municipalityId: req.params.municipalityId,
    title: req.body.title,
    content: req.body.content,
  };
  getRepository(ObjectsManipulated.Post).save(createdPost);

  return res.status(200).json(createdPost);
};

const get = async (req: Request, res: Response, next: NextFunction) => {
  const allPosts = getRepository(ObjectsManipulated.Post).getAll();
  const specificPosts = allPosts.filter(
    (post: any) => post.municipalityId === req.params.municipalityId
  );
  return res.status(200).json({ posts: specificPosts });
};

const getSingle = async (req: Request, res: Response, next: NextFunction) => {
  if (req.params.postId === "routecheck") {
    return res.status(200).json();
  }

  const post = getRepository(ObjectsManipulated.Post).get(req.params.postId);

  if (!post) {
    return res.status(404).json({});
  }

  return res.status(200).json(post);
};

const verify = async (req: Request, res: Response, next: NextFunction) => {
  if (
    req.params.municipalityId === "routecheck" &&
    req.params.postId === undefined
  ) {
    return res.status(200).json();
  }

  if (
    req.params.municipalityId !== "routecheck" &&
    !municipalityWithIdExists(req.params.municipalityId)
  ) {
    return res.status(404).json({ municipalityId: req.params.municipalityId });
  }

  next();
};

export default { get, post, verify, getSingle };
