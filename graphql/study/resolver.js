import { sortOpt, filterOption } from '../libs';

export const resolver = {
  Query: {
    study: async (_parent, { userId }, { models }) => {
      return models.Study.getStudyById(userId).lean({ virtuals: true });
    },
    Study: async (_parent, { userId }, { models }) => {
      return models.Study.getStudyById(userId).lean({ virtuals: true });
    },
    studyByKind: async (_parent, { userId, kind }, { models }) => {
      return models.Study.getStudyByKind(userId, kind).lean({ virtuals: true });
    },
    allStudy: async (_parent, {
      page, perPage, sortField, sortOrder, filter,
    }, { models }) => {
      return models.Study.getStudies(filterOption(filter))
        .sort(sortOpt(sortField, sortOrder))
        .skip(page * perPage)
        .limit(perPage)
        .lean({ virtuals: true });
    },
  },
  Mutation: {
    createStudy: async (_parent, {
      userId, kind, topic, title, content, wantNum, endDay,
    }, { models }) => {
      return await models.Study.createStudy({
        userId, kind, topic, title, content, wantNum, endDay,
      });
    },
    updateStudy: async (_parent, {
      userId, num, part, title, content, wantNum, endDay,
    }, { models }) => {
      return await models.Study.updateStudy({
        userId, num, part, title, content, wantNum, endDay,
      }).lean({ virtuals: true });
    },
    removeStudy: async (_parent, { userId, num }, { models }) => {
      return await models.Study.removeStudy(userId, num);
    },
  },
  Study: {
  },
};
