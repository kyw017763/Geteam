export const typeDef = `
    extend type Query {
        applyContest: ApplyContest
        ApplyContest(id: ID!): ApplyContest
        allApplyContest(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: SearchFilter): [ApplyContest]
        _allApplyContestMeta(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: SearchFilter): ListMetaData
    }
    extend type Mutation {
        createApplyContest(applyContestId: Int!, applyContestName: String!, teacher: String!, score: String): ApplyContest
        updateApplyContest(id: ID!, applyContestId: Int!, applyContestName: String!, teacher: String!, score: String): ApplyContest
        removeApplyContest(id: ID!): ApplyContest
    }
    type ApplyContest implements Node {
        id: ID!
        createdAt: DateTime!
        updatedAt: DateTime!
        applyContestId: Int!
        applyContestName: String!
        teacher: String!
        score: String
    }`;
