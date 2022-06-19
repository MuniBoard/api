export interface Database {
    save: (municipality : any) => any
    getAll: () => any
    get: (id: string) => any
}

export default Database;