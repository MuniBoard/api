import { MultiDatabaseContainer } from "../common/multidatabasecontainer";
import MunicipalityDatabase from "./municipality";

function getNewDatabases() {
    return {
        municipality : new MunicipalityDatabase()
    } as MultiDatabaseContainer
}

export default getNewDatabases;