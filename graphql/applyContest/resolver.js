import { sortOpt, filterOption } from '../libs';

export const resolver = {
  Query: {
    applyContest: async (_parent, { userId }, { models }) => {
      return models.ApplyContest.getApplyContestById(userId).lean({ virtuals: true });
    },
    ApplyContest: async (_parent, { userId }, { models }) => {
      return models.ApplyContest.getApplyContestById(userId).lean({ virtuals: true });
    },
    applyContestByKind: async (_parent, { userId, kind }, { models }) => {
      return models.ApplyContest.getApplyContestByIdAndKind(userId, kind).lean({ virtuals: true });
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
  },
  Mutation: {
    createApplyContest: async (_parent, {
      kind, itemNum, memApply, memRecv, topic, title, part, portfolio, want,
    }, { models }) => {
      return await models.ApplyContest.createApplyContest(
        kind, itemNum, memApply, memRecv, topic, title, part, portfolio, want,
      );
    },
    updateApplyContest: async (_parent, {
      userId, itemNum, topic, title, part, portfolio, want,
    }, { models }) => {
      return await models.ApplyContest.updateApplyContest(
        userId, itemNum, topic, title, part, portfolio, want,
      ).lean({ virtuals: true });
    },
    removeApplyContest: async (_parent, { userId, itemNum }, { models }) => {
      return await models.ApplyContest.removeApplyContest(userId, itemNum);
    },
  },
  ApplyContest: {
  },
};
