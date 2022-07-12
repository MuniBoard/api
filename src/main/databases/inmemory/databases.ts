import { MultiDatabaseContainer } from "../common/multidatabasecontainer";
import MunicipalityDatabase from "./municipality";
import PostDatabase from "./post";

function getNewDatabases() {
  return {
    municipality: new MunicipalityDatabase(),
    post: new PostDatabase(),
  } as MultiDatabaseContainer;
}

export default getNewDatabases;
