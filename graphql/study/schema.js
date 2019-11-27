export const typeDef = `
    extend type Query {
        study: Study
        Study(id: ID!): Study
        allStudy(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: SearchFilter): [Study]
        _allStudyMeta(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: SearchFilter): ListMetaData
    }
    extend type Mutation {
        createStudy(studyId: Int!, studyName: String!, teacher: String!, score: String): Study
        updateStudy(id: ID!, studyId: Int!, studyName: String!, teacher: String!, score: String): Study
        removeStudy(id: ID!): Study
    }
    type Study implements Node {
        id: ID!
        createdAt: DateTime!
        updatedAt: DateTime!
        studyId: Int!
        studyName: String!
        teacher: String!
        score: String
    }`;
