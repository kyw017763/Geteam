import { sortOpt, filterOption } from '../libs';

export const resolver = {
  Query: {
    contest: async (_parent, { userId }, { models }) => {
      return models.Contest.getContestById(userId).lean({ virtuals: true });
    },
    Contest: async (_parent, { userId }, { models }) => {
      return models.Contest.getContestById(userId).lean({ virtuals: true });
    },
    contestByKind: async (_parent, { userId, kind }, { models }) => {
      return models.Contest.getContestByKind(userId, kind).lean({ virtuals: true });
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
  },
  Mutation: {
    createContest: async (_parent, {
      userId, kind, topic, part, title, content, wantNum, applyNum, endDay,
    }, { models }) => {
      return await models.Contest.createContest({
        userId, kind, topic, part, title, content, wantNum, applyNum, endDay,
      });
    },
    updateContest: async (_parent, {
      userId, num, part, title, content, wantNum, endDay,
    }, { models }) => {
      return await models.Contest.updateContest({
        userId, num, part, title, content, wantNum, endDay,
      }).lean({ virtuals: true });
    },
    removeContest: async (_parent, { userId, num }, { models }) => {
      return await models.Contest.removeContest(userId, num);
    },
  },
  Contest: {
  },
};
