import { sortOpt, filterOption } from '../libs';

export const resolver = {
  Query: {
    study: async (_parent, { id }, { models }) => {
      return models.Study.getStudyById(id).lean({ virtuals: true });
    },
    Study: async (_parent, { id }, { models }) => {
      return models.Study.getStudyById(id).lean({ virtuals: true });
    },
    allStudy: async (_parent, {
      page, perPage, sortField, sortOrder, filter,
    }, { models }) => {
      return models.Study.getStudys(filterOption(filter))
        .sort(sortOpt(sortField, sortOrder))
        .skip(page * perPage)
        .limit(perPage)
        .lean({ virtuals: true });
    },
    _allStudyMeta: async (_parent, { filter }, { models }) => {
      return { count: await models.Study.countDocuments(filterOption(filter)) };
    },
  },
  Mutation: {
    createStudy: async (_parent, {
      studyId, studyName, teacher, score,
    }, { models }) => {
      return await models.Study.createStudy({
        studyId, studyName, teacher, score,
      });
    },
    updateStudy: async (_parent, {
      id, studyId, studyName, teacher, score,
    }, { models }) => {
      return await models.Study.updateStudy(id, {
        studyId, studyName, teacher, score,
      }).lean({ virtuals: true });
    },
    removeStudy: async (_parent, { id }, { models }) => {
      return await models.Study.removeStudy(id);
    },
  },
  Study: {
  },
};
