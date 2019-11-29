export const typeDef = `
    type Secession {
        id: ID!
        createdAt: String!
        updatedAt: String!
        secessionId: String!
        secessionName: String!
        approach: Int
    }
    type Query {
        secession: Secession
        Secession(userId: String!): Secession
        allSecession(page: Int, perPage: Int, sortField: String, sortOrder: String): [Secession]
    }
    type Mutation {
        createSecession(secessionId: String!, secessionName: String!): Secession
        updateSecession(secessionId: String!): Secession
    }`;
