export const typeDef = `
    extend type Query {
      recvNote: Note
      RecvNote(userId: String!): Note
      sendNote: Note
      SendNote(userId: String!): Note
    }
    extend type Mutation {
      createNote(recvId: String!, sendId: String!, content: String!): Note
      createNoteReturned(recvId: String!, sendId: String!, content: String!): Note
      updateNoteReadChk(id: ID!): Note
      removeNote(id: ID!): Note
    }
    type Note implements Node {
      id: ID!
      createdAt: DateTime!
      updatedAt: DateTime!
      memRecv: String!
      memSend: String!
      content: String!
      recvChk: Int
      reChk: Int
    }`;
