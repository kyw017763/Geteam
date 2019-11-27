export const typeDef = `
    extend type Query {
        secession: Secession
        Secession(userId: String!): Secession
        allSecession(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: SearchFilter): [Secession]
    }
    extend type Mutation {
        createSecession(secessionId: String!, secessionName: String!): Secession
        updateSecession(secessionId: String!): Secession
    }
    type Secession implements Node {
        id: ID!
        createdAt: DateTime!
        updatedAt: DateTime!
        secessionId: String!
        secessionName: String!
        approach: Int
    }`;
