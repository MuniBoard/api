import Database from "../databases/common/database";
import Repository from "./repository";

class PostRepository implements Repository {
  database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  save = (post: any) => {
    return this.database.save(post);
  };

  getAll = () => {
    return this.database.getAll() as any;
  };

  get = (id: string) => {
    return this.database.get(id);
  };
}

export default PostRepository;
