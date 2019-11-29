export const typeDef = `
    type Study {
        id: ID!
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
    type Query {
        study: Study
        Study(id: ID!): Study
        allStudy(page: Int, perPage: Int, sortField: String, sortOrder: String): [Study]
    }
    type Mutation {
        createStudy(studyId: Int!, studyName: String!, teacher: String!, score: String): Study
        updateStudy(id: ID!, studyId: Int!, studyName: String!, teacher: String!, score: String): Study
        removeStudy(id: ID!): Study
    }`;
