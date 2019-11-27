export const typeDef = `
    extend type Query {
        counting: Counting
        Counting(id: ID!): Counting
        allCounting(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: SearchFilter): [Counting]
        _allCountingMeta(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: SearchFilter): ListMetaData
    }
    extend type Mutation {
        createCounting(countingId: Int!, countingName: String!, teacher: String!, score: String): Counting
        updateCounting(id: ID!, countingId: Int!, countingName: String!, teacher: String!, score: String): Counting
        removeCounting(id: ID!): Counting
    }
    type Counting implements Node {
        id: ID!
        createdAt: DateTime!
        updatedAt: DateTime!
        countingId: Int!
        countingName: String!
        teacher: String!
        score: String
    }`;
