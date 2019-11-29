export const typeDef = `
    type Contest {
      _id: ID!
      createdAt: String!
      updatedAt: String!
      num: Int!
      kind: String!
      mem: String!
      topic: String!
      part: String!
      title: String!
      content: String!
      wantNum: Int!
      applyNum: Int
      endDay: String!
      hit: Int
      teamChk: Int
    }
    extend type Query {
        contest: Contest
        Contest(userId: String!): Contest
        contestByKind(userId: String!, kind: String!): [Contest]
        allContest(page: Int, perPage: Int, sortField: String, sortOrder: String): [Contest]
    }
    extend type Mutation {
        createContest(userId: String!, kind: String!, topic: String!, part: String!, title: String!, content: String!, wantNum: Int!, endDay: String!): Contest
        updateContest(userId: String!, num: Int!, part: String!, title: String!, content: String!, wantNum: Int!, endDay: String!): Contest
        removeContest(userId: String!, num: Int!): Contest
    }`;
