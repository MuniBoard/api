import { Request, Response, NextFunction } from "express";
import {v4 as uuidv4} from "uuid";
import { getRepository, ObjectsManipulated } from "../repositories/repositories";
import { objectContainsNoOtherKeys } from "./utils/all";

const municipalityWithIdExists = (id : any) => {
    return !!getRepository(ObjectsManipulated.Municipality).get(id);
}

const isValidCreationRequest = (request: Request) => {
    const containsBody = !!request.body;
    const containsValidTitle = !!request.body?.title && typeof request.body?.title === 'string';
    const containsValidContent = !request.body?.content || (request.body?.content && typeof request.body?.content === 'string');
    return containsBody && containsValidTitle && containsValidContent && objectContainsNoOtherKeys(request.body, ['title', 'content']);
}

const post = async (req: Request, res: Response, next: NextFunction) => {
    if(req.params.municipalityId === "routecheck") {
        return res.status(200).json();
    }

    if(!municipalityWithIdExists(req.params.municipalityId)) {
        return res.status(404).json();
    }

    if(!isValidCreationRequest(req)) {
        return res.status(400).json();
    }
    
    const id = uuidv4();

    const createdPost = {
        id,
        title : req.body.title,
        content : req.body.content,
    }

    return res.status(200).json(createdPost);
};


export default { post };