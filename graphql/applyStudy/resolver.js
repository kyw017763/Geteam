import { sortOpt, filterOption } from '../libs';

export const resolver = {
  Query: {
    applyStudy: async (_parent, { userId }, { models }) => {
      return models.ApplyStudy.getApplyStudyById(userId).lean({ virtuals: true });
    },
    ApplyStudy: async (_parent, { userId }, { models }) => {
      return models.ApplyStudy.getApplyStudyById(userId).lean({ virtuals: true });
    },
    applyStudyByKind: async (_parent, { userId, kind }, { models }) => {
      return models.ApplyStudy.getApplyStudyByIdAndKind(userId, kind).lean({ virtuals: true });
    },
    allApplyStudy: async (_parent, {
      page, perPage, sortField, sortOrder, filter,
    }, { models }) => {
      return models.ApplyStudy.getApplyStudies(filterOption(filter))
        .sort(sortOpt(sortField, sortOrder))
        .skip(page * perPage)
        .limit(perPage)
        .lean({ virtuals: true });
    },
  },
  Mutation: {
    createApplyStudy: async (_parent, {
      kind, itemNum, memApply, memRecv, topic, title, portfolio, want,
    }, { models }) => {
      return await models.ApplyStudy.createApplyStudy({
        kind, itemNum, memApply, memRecv, topic, title, portfolio, want,
      });
    },
    updateApplyStudy: async (_parent, {
      userId, itemNum, topic, title, portfolio, want,
    }, { models }) => {
      return await models.ApplyStudy.updateApplyStudy({
        userId, itemNum, topic, title, portfolio, want,
      }).lean({ virtuals: true });
    },
    removeApplyStudy: async (_parent, { userId, itemNum }, { models }) => {
      return await models.ApplyStudy.removeApplyStudy(userId, itemNum);
    },
  },
  ApplyStudy: {
  },
};
