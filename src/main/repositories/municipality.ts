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

}

export default MunicipalityRepository