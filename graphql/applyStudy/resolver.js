import { sortOpt, filterOption } from '../libs';

export const resolver = {
  Query: {
    applyStudy: async (_parent, { id }, { models }) => {
      return models.ApplyStudy.getApplyStudyById(id).lean({ virtuals: true });
    },
    ApplyStudy: async (_parent, { id }, { models }) => {
      return models.ApplyStudy.getApplyStudyById(id).lean({ virtuals: true });
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
    _allApplyStudyMeta: async (_parent, { filter }, { models }) => {
      return { count: await models.ApplyStudy.countDocuments(filterOption(filter)) };
    },
  },
  Mutation: {
    createApplyStudy: async (_parent, {
      applyStudyId, applyStudyName, teacher, score,
    }, { models }) => {
      return await models.ApplyStudy.createApplyStudy({
        applyStudyId, applyStudyName, teacher, score,
      });
    },
    updateApplyStudy: async (_parent, {
      id, applyStudyId, applyStudyName, teacher, score,
    }, { models }) => {
      return await models.ApplyStudy.updateApplyStudy(id, {
        applyStudyId, applyStudyName, teacher, score,
      }).lean({ virtuals: true });
    },
    removeApplyStudy: async (_parent, { id }, { models }) => {
      return await models.ApplyStudy.removeApplyStudy(id);
    },
  },
  ApplyStudy: {
  },
};
