import Database from "../databases/common/database";
import Repository from "./repository";

type Municipality = {
    id: string,
    name: string,
    coordinates?: {
        lat: number
        long: number
    }
    website?: string
}

class MunicipalityRepository implements Repository{
    municipalities : any []
    database: Database;

    constructor(database : Database) {
        this.municipalities = []
        this.database = database
    }
    
    save = (municipality : any) => {
        return this.municipalities.push(municipality);
    }
    
    getAll = () => {
        return this.municipalities as any;
    }    

    get = (id : string) => {
        return this.municipalities.find((municipality) => municipality.id === id);
    }

}

export default MunicipalityRepository