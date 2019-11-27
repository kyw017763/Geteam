export const resolver = {
  Query: {
    recvNote: async (_parent, { userId }, { models }) => {
      return models.Note.getNotesByRecvId(userId).lean({ virtuals: true });
    },
    RecvNote: async (_parent, { userId }, { models }) => {
      return models.Note.getNotesByRecvId(userId).lean({ virtuals: true });
    },
    sendNote: async (_parent, { userId }, { models }) => {
      return models.Note.getNotesBySendId(userId).lean({ virtuals: true });
    },
    SendNote: async (_parent, { userId }, { models }) => {
      return models.Note.getNotesBySendId(userId).lean({ virtuals: true });
    },
  },
  Mutation: {
    createNote: async (_parent, {
      recvId, sendId, content,
    }, { models }) => {
      return await models.Note.createNote({
        recvId, sendId, content,
      });
    },
    createNoteReturned: async (_parent, {
      recvId, sendId, content,
    }, { models }) => {
      return await models.Note.createNoteReturned({
        recvId, sendId, content,
      });
    },
    updateNoteReadChk: async (_parent, {
      id,
    }, { models }) => {
      return await models.Note.updateNote({
        id,
      }).lean({ virtuals: true });
    },
    removeNote: async (_parent, { id }, { models }) => {
      return await models.Note.removeNote(id);
    },
  },
  Note: {
  },
};
