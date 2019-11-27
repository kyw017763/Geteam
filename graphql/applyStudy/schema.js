export const typeDef = `
    extend type Query {
        applyStudy: ApplyStudy
        ApplyStudy(userId: String!): ApplyStudy
        applyStudyByKind(userId: String!, kind: String!): [ApplyStudy]
        allApplyStudy(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: SearchFilter): [ApplyStudy]
    }
    extend type Mutation {
        createApplyStudy(kind: String!, itemNum: Int!, memApply: String!, memRecv: String!, topic: String!, title: String!, portfolio: String!, want: String!): ApplyStudy
        updateApplyStudy(userId: String!, itemNum: Int!, topic: String!, title: String!, portfolio: String!, want: String!): ApplyStudy
        removeApplyStudy(userId: String!, itemNum: Int!): ApplyStudy
    }
    type ApplyStudy implements Node {
      id: ID!
      createdAt: DateTime!
      updatedAt: DateTime!
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
    }`;
