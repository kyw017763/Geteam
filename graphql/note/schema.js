export const typeDef = `
    type Note {
      _id: ID!
      createdAt: String!
      updatedAt: String!
      memRecv: String!
      memSend: String!
      content: String!
      recvChk: Int
      reChk: Int
    }
    extend type Query {
      recvNote: Note
      RecvNote(userId: String!): Note
      sendNote: Note
      SendNote(userId: String!): Note
    }
    extend type Mutation {
      createNote(recvId: String!, sendId: String!, content: String!): Note
      createNoteReturned(recvId: String!, sendId: String!, content: String!, returnedId: Int!): Note
      updateNoteReadChk(id: ID!): Note
      removeNote(id: ID!): Note
    }`;
