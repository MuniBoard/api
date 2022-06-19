import Database from "../databases/common/database";
import Repository from "./repository";

class DummyRepository implements Repository{
    database: Database;

    constructor(database: Database) {
        this.database = database;
    }
    
    save = (municipality : any) => {
        return {};
    }
    
    getAll = () => {
        return [];
    }    

    get = (id : string) => {
        return {};
    }

}

export default DummyRepository