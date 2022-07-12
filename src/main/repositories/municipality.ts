import Database from "../databases/common/database";
import Repository from "./repository";

class MunicipalityRepository implements Repository {
  database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  save = (municipality: any) => {
    return this.database.save(municipality);
  };

  getAll = () => {
    return this.database.getAll();
  };

  get = (id: string) => {
    return this.database.get(id);
  };
}

export default MunicipalityRepository;
