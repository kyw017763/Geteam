export const typeDef = `
    extend type Query {
        Member: Member
        Member(useId: String!): Member
        allMember(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: SearchFilter): [Member]
    }
    extend type Mutation {
        createMember(id: String!, name: String!, pwd: String!, sNum: Int!, interest1: String!, interest2: String!, interest3: String!, profile: String!): Member
        updateMember(userId: String!, name: String!, sNum: Int!, interest1: String!, interest2: String!, interest3: String!, profile: String!): Member
        removeMember(userId: String!): Member
    }
    type Member implements Node {
        id: ID!
        createdAt: DateTime!
        updatedAt: DateTime!
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
    }`;
