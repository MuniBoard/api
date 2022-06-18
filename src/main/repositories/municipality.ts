type Municipality = {
    id: string,
    name: string,
    coordinates?: {
        lat: number
        long: number
    }
    website?: string
}

class MunicipalityRepository {
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

export default MunicipalityRepository