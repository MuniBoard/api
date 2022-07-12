import Database from "../common/database";
class DummyDatabase implements Database {
  save = (municipality: any) => {
    return {};
  };

  getAll = () => {
    return [];
  };

  get = (id: string) => {
    return {};
  };
}

export default DummyDatabase;
