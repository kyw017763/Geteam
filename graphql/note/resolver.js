import { sortOpt, filterOption } from '../libs';

export const resolver = {
  Query: {
    note: async (_parent, { id }, { models }) => {
      return models.Note.getNoteById(id).lean({ virtuals: true });
    },
    Note: async (_parent, { id }, { models }) => {
      return models.Note.getNoteById(id).lean({ virtuals: true });
    },
    allNote: async (_parent, {
      page, perPage, sortField, sortOrder, filter,
    }, { models }) => {
      return models.Note.getNotes(filterOption(filter))
        .sort(sortOpt(sortField, sortOrder))
        .skip(page * perPage)
        .limit(perPage)
        .lean({ virtuals: true });
    },
    _allNoteMeta: async (_parent, { filter }, { models }) => {
      return { count: await models.Note.countDocuments(filterOption(filter)) };
    },
  },
  Mutation: {
    createNote: async (_parent, {
      noteId, noteName, teacher, score,
    }, { models }) => {
      return await models.Note.createNote({
        noteId, noteName, teacher, score,
      });
    },
    updateNote: async (_parent, {
      id, noteId, noteName, teacher, score,
    }, { models }) => {
      return await models.Note.updateNote(id, {
        noteId, noteName, teacher, score,
      }).lean({ virtuals: true });
    },
    removeNote: async (_parent, { id }, { models }) => {
      return await models.Note.removeNote(id);
    },
  },
  Note: {
  },
};
