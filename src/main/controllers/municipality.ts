import { Request, Response, NextFunction } from "express";
import {v4 as uuidv4} from "uuid";
import { getMunicipalityRepository } from "../utils/datamanipulation";

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
    const createdMunicipality = {
        id,
        name: req.body.name,
        coordinates: req.body.coordinates,
        website: req.body.website
    }
    
    getMunicipalityRepository().save(createdMunicipality);

    return res.status(201).json(createdMunicipality);
};

const get = async(req: Request, res: Response, next: NextFunction) => {
    if(!objectContainsNoOtherKeys(req.body, [])) {
        return res.status(400).json({});
    }

    const municipalities = getMunicipalityRepository().getAll();

    return res.status(200).json({municipalities});
}

const getSingle = async(req: Request, res: Response, next: NextFunction) => {
    if(!objectContainsNoOtherKeys(req.body, []) || !objectContainsNoOtherKeys(req.params, ['id'])) {
        return res.status(400).json({});
    }

    const municipality = getMunicipalityRepository().get(req.params.id);

    if(!municipality) {
        return res.status(404).json({});
    }

    return res.status(200).json(municipality);
}

export default { getSingle, get, post };