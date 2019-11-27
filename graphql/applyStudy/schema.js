export const typeDef = `
    extend type Query {
        applyStudy: ApplyStudy
        ApplyStudy(id: ID!): ApplyStudy
        allApplyStudy(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: SearchFilter): [ApplyStudy]
        _allApplyStudyMeta(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: SearchFilter): ListMetaData
    }
    extend type Mutation {
        createApplyStudy(applyStudyId: Int!, applyStudyName: String!, teacher: String!, score: String): ApplyStudy
        updateApplyStudy(id: ID!, applyStudyId: Int!, applyStudyName: String!, teacher: String!, score: String): ApplyStudy
        removeApplyStudy(id: ID!): ApplyStudy
    }
    type ApplyStudy implements Node {
        id: ID!
        createdAt: DateTime!
        updatedAt: DateTime!
        applyStudyId: Int!
        applyStudyName: String!
        teacher: String!
        score: String
    }`;
