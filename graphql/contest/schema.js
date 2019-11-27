export const typeDef = `
    extend type Query {
        contest: Contest
        Contest(id: ID!): Contest
        allContest(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: SearchFilter): [Contest]
        _allContestMeta(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: SearchFilter): ListMetaData
    }
    extend type Mutation {
        createContest(contestId: Int!, contestName: String!, teacher: String!, score: String): Contest
        updateContest(id: ID!, contestId: Int!, contestName: String!, teacher: String!, score: String): Contest
        removeContest(id: ID!): Contest
    }
    type Contest implements Node {
        id: ID!
        createdAt: DateTime!
        updatedAt: DateTime!
        contestId: Int!
        contestName: String!
        teacher: String!
        score: String
    }`;
