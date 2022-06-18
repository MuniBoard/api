import { Request, Response, NextFunction } from "express";
import {v4 as uuidv4} from "uuid";

const objectContainsNoOtherKeys = (obj : object, keys : any) => {
    return Object.keys(obj).every(key => keys.includes(key));
}

const validateWebsiteURL = (website : string) => {
    let url;
  
    try {
      url = new URL(website);
    } catch (_) {
      return false;  
    }
  
    return url.protocol === "http:" || url.protocol === "https:";
}

const inputMakesSense = (request: Request) => {
    const websiteURLIsValid = request.body.website ? validateWebsiteURL(request.body.website) : true;
    return websiteURLIsValid;
}

const isValidCreationRequest = (request: Request) => {
    const containsBody = !!request.body;
    const containsValidName = !!request.body?.name && typeof request.body?.name === 'string';
    const containsValidLat = request.body?.coordinates?.lat && typeof request.body?.coordinates?.lat === 'number';
    const containsValidLong = request.body?.coordinates?.long && typeof request.body?.coordinates?.long === 'number';
    const containsValidCoordinates = request.body?.coordinates !== undefined && request.body?.coordinates !== null ? typeof request.body?.coordinates === 'object' && containsValidLat && containsValidLong && objectContainsNoOtherKeys(request.body?.coordinates, ['lat', 'long']) : true;
    const containsValidWebsite = request.body?.website ? typeof request.body?.website === 'string' : true;
    return containsBody && containsValidName && containsValidCoordinates && containsValidWebsite && objectContainsNoOtherKeys(request.body, ['name', 'coordinates', 'website']);
}

const post = async (req: Request, res: Response, next: NextFunction) => {
    if(!isValidCreationRequest(req)) {
        return res.status(400).json();
    }

    if(!inputMakesSense(req)) {
        return res.status(400).json();
    }

    const id = uuidv4();
    const responseBody = {
        id,
        name: req.body.name,
        coordinates: req.body.coordinates,
        website: req.body.website
    }

    return res.status(201).json(responseBody);
};

export default { post };