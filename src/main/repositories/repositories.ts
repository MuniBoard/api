import Repository from "./repository";
import MunicipalityRepository from "./municipality";
import PostRepository from "./post";
import DummyRepository from "./dummy";
import DummyDatabase from "../databases/common/dummy";

let municipalityRepository: MunicipalityRepository;
let postRepository: PostRepository;

export enum ObjectsManipulated {
  Municipality,
  Post,
}

export function setRepositories(
  repositories: Map<ObjectsManipulated, Repository>
) {
  for (let [key, value] of repositories) {
    switch (key) {
      case ObjectsManipulated.Municipality:
        municipalityRepository = value as unknown as MunicipalityRepository;
        continue;
      case ObjectsManipulated.Post:
        postRepository = value as unknown as PostRepository;
        continue;
    }
  }
}

export function getRepository(
  objectManipulated: ObjectsManipulated
): Repository {
  switch (objectManipulated) {
    case ObjectsManipulated.Municipality:
      return municipalityRepository;
    case ObjectsManipulated.Post:
      return postRepository;
    default:
      return new DummyRepository(new DummyDatabase());
  }
}
