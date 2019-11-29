export const typeDef = `
    type ApplyStudy {
      _id: ID!
      createdAt: String!
      updatedAt: String!
      num: Int!
      kind: String!
      itemNum: Int!
      memApply: String!
      memRecv: String!
      topic: String!
      title: String!
      portfolio: String!
      want: String!
      applyChk: Int
    }
    extend type Query {
        applyStudy: ApplyStudy
        ApplyStudy(userId: String!): ApplyStudy
        applyStudyByKind(userId: String!, kind: String!): [ApplyStudy]
        allApplyStudy(page: Int, perPage: Int, sortField: String, sortOrder: String): [ApplyStudy]
    }
    extend type Mutation {
        createApplyStudy(kind: String!, itemNum: Int!, memApply: String!, memRecv: String!, topic: String!, title: String!, portfolio: String!, want: String!): ApplyStudy
        updateApplyStudy(userId: String!, itemNum: Int!, topic: String!, title: String!, portfolio: String!, want: String!): ApplyStudy
        removeApplyStudy(userId: String!, itemNum: Int!): ApplyStudy
    }`;
