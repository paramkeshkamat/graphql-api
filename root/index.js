let { posts } = require("../data/posts");
let { users } = require("../data/users");

const root = {
  posts: ({ options }) => {
    let { page, limit } = options.paginate;
    if (!page) page = 1;
    if (!limit) limit = 20;
    const startIndex = limit * (page - 1);
    const endIndex = startIndex + limit;
    return {
      data: posts.slice(startIndex, endIndex).map((post) => ({
        ...post,
        user: users.find((user) => user.id === post.userId),
      })),
      metaData: {
        totalCount: posts.length,
        page: page,
        itemsPerPage: limit,
      },
    };
  },

  post: ({ id }, context) => {
    // if (!context.user) {
    //   return null;
    // }
    const post = posts.find((post) => post.id === id);
    return { ...post, user: users.find((user) => user.id === post.userId) };
  },

  addPost: ({ input }) => {
    const newPost = {
      id: String(posts.length + 1),
      title: input.title,
      body: input.body,
      userId: input.userId,
    };
    posts.push(newPost);
    return newPost;
  },

  updatePost: ({ id, input }) => {
    const post = posts.find((post) => post.id === id);
    if (!post) {
      return null;
    }
    const updatedPost = {
      id: String(id),
      title: input.title,
      body: input.body,
      ...post,
    };
    posts[id - 1] = updatedPost;
    return updatedPost;
  },

  deletePost: ({ id }) => {
    const post = posts.find((post) => post.id === id);
    if (!post) {
      return null;
    }
    posts = posts.filter((post) => post.id !== id);
    return "Delete Successful";
  },

  users: () => {
    return users;
  },

  user: ({ id }) => {
    return users.find((user) => user.id === id);
  },
};

module.exports = { root };
