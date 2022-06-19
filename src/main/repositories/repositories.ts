import Repository from "./repository";
import MunicipalityRepository from "./municipality";
import DummyRepository from './dummy';
import DummyDatabase from "../databases/common/dummy";

let municipalityRepository : MunicipalityRepository;

export enum ObjectsManipulated {
    Municipality,
}

export function setRepositories(repositories : Map<ObjectsManipulated, Repository>) {
    for (let [key, value] of repositories) {
        if(key === ObjectsManipulated.Municipality) {
            municipalityRepository = value as unknown as MunicipalityRepository;
        }
    }
}

export function getRepository(objectManipulated : ObjectsManipulated) : Repository {
    if(objectManipulated === ObjectsManipulated.Municipality) {
        return municipalityRepository;
    }

    return new DummyRepository(new DummyDatabase());
}