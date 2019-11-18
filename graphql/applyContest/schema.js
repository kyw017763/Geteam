export const typeDef = `
    extend type Query {
        student: Student
        Student(id: ID!): Student
        allStudent(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: SearchFilter): [Student]
        _allStudentMeta(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: SearchFilter): ListMetaData
    }
    extend type Mutation {
        createStudent(studentId: Int!, studentName: String!, teacher: String!, score: String): Student
        updateStudent(id: ID!, studentId: Int!, studentName: String!, teacher: String!, score: String): Student
        removeStudent(id: ID!): Student
    }
    type Student implements Node {
        id: ID!
        createdAt: DateTime!
        updatedAt: DateTime!
        studentId: Int!
        studentName: String!
        teacher: String!
        score: String
    }`;