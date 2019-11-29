export const typeDef = `
    type Member {
        _id: ID!
        createdAt: String!
        updatedAt: String!
        id: String!
        name: String!
        pwd: String!
        sNum: Int!
        interest1: String!
        interest2: String!
        interest3: String!
        profile: String!
        listNum: Int
        notiApply: Int
        notiRecv: Int
        notiVol: Int
    }
    extend type Query {
        member: Member
        Member(useId: String!): Member
        allMember(page: Int, perPage: Int, sortField: String, sortOrder: String): [Member]
    }
    extend type Mutation {
        createMember(id: String!, name: String!, pwd: String!, sNum: Int!, interest1: String!, interest2: String!, interest3: String!, profile: String!): Member
        updateMember(userId: String!, name: String!, sNum: Int!, interest1: String!, interest2: String!, interest3: String!, profile: String!): Member
        removeMember(userId: String!): Member
    }`;
