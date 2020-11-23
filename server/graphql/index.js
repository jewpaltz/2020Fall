const { ApolloServer, gql } = require('apollo-server');

const users = require("../models/users");
//  const cm = require("../models/ContactMethods"); For later
const posts = require("../models/posts");
const comments = require("../models/comments");
const reactions = require('../models/reactions');

const typeDefs = gql`
  
  type Post {
    id: Int
    URL: String
    Text: String
    user: User! # to-one
    reactionCount: Int  # if we only want to know how many but not 'who'
    comments: [Comment] # to-many
    reactions: [Reaction]
  }
  type Comment {
    id: Int
    Text: String
    post: Post! # to-one
    user: User! # to-one
  }
  type Reaction { # if we want to know who liked this post
    id: Int
    Emoji: String
    post: Post! # to-one
    user: User! # to-one
  }
  type User {
    id: Int
    FirstName: String
    LastName: String
    PrimaryEmail: String
    posts: [Post]
  }
  type Query {
    posts: [Post]
    post(id: ID): Post
  }
`;

const resolvers = {
    Query: {
        posts: (_, {}) => posts.getAll(),
        post: (_, { id }) => posts.get(id),
    },
    Post: {
        reactionCount: x=> x.Reactions,   
        user: ({ Owner_id }) => users.get(Owner_id),
        comments: ({ id }) => comments.getForPost(id),
        reactions: ({ id }) => reactions.getForPost(id),        
    },
    Comment: {
      user: ({ Owner_id }) => users.get(Owner_id)
    },
    Reaction: {
      user: ({ Owner_id }) => users.get(Owner_id)
    },
    User: {
        posts: ({ id }) => posts.getByUser(id)
    }
};

const server = new ApolloServer({  typeDefs, resolvers });

module.exports = server;