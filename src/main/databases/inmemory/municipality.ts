import Database from "../common/database";
class MunicipalityDatabase implements Database {
    municipalities : any []

    constructor() {
        this.municipalities = []
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

export default MunicipalityDatabase;