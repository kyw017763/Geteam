export const typeDef = `
    type ApplyContest {
      id: ID!
      createdAt: String!
      updatedAt: String!
      num: Int!,
      kind: String!
      itemNum: Int!
      memApply: String!
      memRecv: String!
      topic: String!
      title: String!
      part: String!
      portfolio: String!
      want: String!
      applyChk: Int
    }
    type Query {
        applyContest: ApplyContest
        ApplyContest(userId: String!): ApplyContest
        applyContestByKind(userId: String!, kind: String!): [ApplyContest]
        allApplyContest(page: Int, perPage: Int, sortField: String, sortOrder: String): [ApplyContest]
    }
    type Mutation {
        createApplyContest(kind: String!, itemNum: Int!, memApply: String!, memRecv: String!, topic: String!, title: String!, part: String!, portfolio: String!, want: String!): ApplyContest
        updateApplyContest(userId: String!, itemNum: Int!, topic: String!, title: String!, part: String!, portfolio: String!, want: String!): ApplyContest
        removeApplyContest(userId: String!, itemNum: Int!): ApplyContest
    }`;
