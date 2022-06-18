import MunicipalityRepository from "../repositories/municipality";

let municipalityRepository : MunicipalityRepository;

export function setMunicipalityRepository(repository : MunicipalityRepository) {
    municipalityRepository = repository;
}

export function getMunicipalityRepository() {
    return municipalityRepository;
}