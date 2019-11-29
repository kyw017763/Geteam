export const typeDef = `
    type Secession {
        _id: ID!
        createdAt: String!
        updatedAt: String!
        secessionId: String!
        secessionName: String!
        approach: Int
    }
    extend type Query {
        secession: Secession
        Secession(userId: String!): Secession
        allSecession(page: Int, perPage: Int, sortField: String, sortOrder: String): [Secession]
    }
    extend type Mutation {
        createSecession(secessionId: String!, secessionName: String!): Secession
        updateSecession(secessionId: String!): Secession
    }`;
