import { sortOpt, filterOption } from '../libs';

export const resolver = {
  Query: {
    contest: async (_parent, { id }, { models }) => {
      return models.Contest.getContestById(id).lean({ virtuals: true });
    },
    Contest: async (_parent, { id }, { models }) => {
      return models.Contest.getContestById(id).lean({ virtuals: true });
    },
    allContest: async (_parent, {
      page, perPage, sortField, sortOrder, filter,
    }, { models }) => {
      return models.Contest.getContests(filterOption(filter))
        .sort(sortOpt(sortField, sortOrder))
        .skip(page * perPage)
        .limit(perPage)
        .lean({ virtuals: true });
    },
    _allContestMeta: async (_parent, { filter }, { models }) => {
      return { count: await models.Contest.countDocuments(filterOption(filter)) };
    },
  },
  Mutation: {
    createContest: async (_parent, {
      contestId, contestName, teacher, score,
    }, { models }) => {
      return await models.Contest.createContest({
        contestId, contestName, teacher, score,
      });
    },
    updateContest: async (_parent, {
      id, contestId, contestName, teacher, score,
    }, { models }) => {
      return await models.Contest.updateContest(id, {
        contestId, contestName, teacher, score,
      }).lean({ virtuals: true });
    },
    removeContest: async (_parent, { id }, { models }) => {
      return await models.Contest.removeContest(id);
    },
  },
  Contest: {
  },
};
