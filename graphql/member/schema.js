export const typeDef = `
    extend type Query {
        Member: Member
        Member(id: ID!): Member
        allMember(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: SearchFilter): [Member]
        _allMemberMeta(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: SearchFilter): ListMetaData
    }
    extend type Mutation {
        createMember(memberId: Int!, memberName: String!, teacher: String!, score: String): Member
        updateMember(id: ID!, memberId: Int!, memberName: String!, teacher: String!, score: String): Member
        removeMember(id: ID!): Member
    }
    type Member implements Node {
        id: ID!
        createdAt: DateTime!
        updatedAt: DateTime!
        memberId: Int!
        memberName: String!
        teacher: String!
        score: String
    }`;
