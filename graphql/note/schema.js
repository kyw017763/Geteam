export const typeDef = `
    extend type Query {
        note: Note
        Note(id: ID!): Note
        allNote(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: SearchFilter): [Note]
        _allNoteMeta(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: SearchFilter): ListMetaData
    }
    extend type Mutation {
        createNote(noteId: Int!, noteName: String!, teacher: String!, score: String): Note
        updateNote(id: ID!, noteId: Int!, noteName: String!, teacher: String!, score: String): Note
        removeNote(id: ID!): Note
    }
    type Note implements Node {
        id: ID!
        createdAt: DateTime!
        updatedAt: DateTime!
        noteId: Int!
        noteName: String!
        teacher: String!
        score: String
    }`;
