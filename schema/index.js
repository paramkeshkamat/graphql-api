import { buildSchema } from "graphql";

export const schema = buildSchema(`
    type Post {
        id: ID!
        title: String
        body: String
        user: User
    }   
        
    type User {
        id: ID!
        name: String
    }

    type Query {
        posts(options: PageQueryOptions): PaginatedPosts
        post(id: ID!): Post
        users: [User]
        user(id: ID!): User
    }

    type Mutation {
        addPost(input: AddPostInput) : Post
        updatePost(id: ID!, input: UpdatePostInput): Post
        deletePost(id: ID!): String
    }

    type PostsMeta {
        totalCount: Int!
        page: Int!
        itemsPerPage: Int!
    }
    type PaginatedPosts {
        data: [Post!]!
        metaData: PostsMeta!
    }
    input PageProps {
        page: Int
        limit: Int
    }
    input PageQueryOptions {
        paginate: PageProps
    }

    input AddPostInput {
        title: String!
        body: String!
        userId: ID!
    }
    input UpdatePostInput {
        title: String!
        body: String!
    }
`);
