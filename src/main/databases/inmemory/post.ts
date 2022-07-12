import Database from "../common/database";
class PostDatabase implements Database {
  posts: any[];

  constructor() {
    this.posts = [];
  }

  save = (post: any) => {
    return this.posts.push(post);
  };

  getAll = () => {
    return this.posts as any;
  };

  get = (id: string) => {
    return this.posts.find((post) => post.id === id);
  };
}

export default PostDatabase;
