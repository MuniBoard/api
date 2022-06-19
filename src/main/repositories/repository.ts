import Database from '../databases/common/database';

export interface Repository {
    database: Database
    save: (municipality : any) => any
    getAll: () => any
    get: (id: string) => any
}

export default Repository;