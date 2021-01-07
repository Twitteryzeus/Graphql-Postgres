const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    user(id: Int!): User!
    allusers: [User!]
    events(id: Int!): Events
    allevents: [Events!]
  }

  type User {
    id: Int!
    email: String!
    password: String!
    events: [Events!]
  }

  type Events {
    id: Int!
    name: String!
    invites: [String!]
    user: User!
  }

  type Mutation {
    createUser(email: String!, password: String!): User!
    createEvents(name: String!, userId: Int!): Events
  }
`;

module.exports = typeDefs;
