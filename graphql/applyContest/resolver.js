import { sortOpt, filterOption } from '../libs';

export const resolver = {
  Query: {
    applyContest: async (_parent, { id }, { models }) => {
      return models.ApplyContest.getApplyContestById(id).lean({ virtuals: true });
    },
    ApplyContest: async (_parent, { id }, { models }) => {
      return models.ApplyContest.getApplyContestById(id).lean({ virtuals: true });
    },
    allApplyContest: async (_parent, {
      page, perPage, sortField, sortOrder, filter,
    }, { models }) => {
      return models.ApplyContest.getApplyContests(filterOption(filter))
        .sort(sortOpt(sortField, sortOrder))
        .skip(page * perPage)
        .limit(perPage)
        .lean({ virtuals: true });
    },
    _allApplyContestMeta: async (_parent, { filter }, { models }) => {
      return { count: await models.ApplyContest.countDocuments(filterOption(filter)) };
    },
  },
  Mutation: {
    createApplyContest: async (_parent, {
      applyContestId, applyContestName, teacher, score,
    }, { models }) => {
      return await models.ApplyContest.createApplyContest({
        applyContestId, applyContestName, teacher, score,
      });
    },
    updateApplyContest: async (_parent, {
      id, applyContestId, applyContestName, teacher, score,
    }, { models }) => {
      return await models.ApplyContest.updateApplyContest(id, {
        applyContestId, applyContestName, teacher, score,
      }).lean({ virtuals: true });
    },
    removeApplyContest: async (_parent, { id }, { models }) => {
      return await models.ApplyContest.removeApplyContest(id);
    },
  },
  ApplyContest: {
  },
};
