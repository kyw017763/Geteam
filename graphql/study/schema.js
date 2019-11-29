export const typeDef = `
    type Study {
        _id: ID!
        createdAt: String!
        updatedAt: String!
        num: Int!
        kind: String!
        mem: String!
        topic: String!
        title: String!
        content: String!
        wantNum: Int!
        applyNum: Int
        endDay: Date!
        hit: Int
        teamChk: Int
    }
    extend type Query {
        study: Study
        Study(id: ID!): Study
        studyByKind(userId: String!, kind: String!): [Study]
        allStudy(page: Int, perPage: Int, sortField: String, sortOrder: String): [Study]
    }
    extend type Mutation {
        createStudy(userId: String!, kind: String!, topic: String!, title: String!, content: String!, wantNum: Int!, endDay: String!): Study
        updateStudy(num: Int!, userId: String!, kind: String!, topic: String!, title: String!, content: String!, wantNum: Int!, endDay: Date!): Study
        removeStudy(num: Int!): Study
    }`;
