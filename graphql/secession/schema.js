export const typeDef = `
    extend type Query {
        secession: Secession
        Secession(id: ID!): Secession
        allSecession(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: SearchFilter): [Secession]
        _allSecessionMeta(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: SearchFilter): ListMetaData
    }
    extend type Mutation {
        createSecession(secessionId: Int!, secessionName: String!, teacher: String!, score: String): Secession
        updateSecession(id: ID!, secessionId: Int!, secessionName: String!, teacher: String!, score: String): Secession
        removeSecession(id: ID!): Secession
    }
    type Secession implements Node {
        id: ID!
        createdAt: DateTime!
        updatedAt: DateTime!
        secessionId: Int!
        secessionName: String!
        teacher: String!
        score: String
    }`;
