import { sortOpt, filterOption } from '../libs';

export const resolver = {
  Query: {
    counting: async (_parent, { id }, { models }) => {
      return models.Counting.getCountingById(id).lean({ virtuals: true });
    },
    Counting: async (_parent, { id }, { models }) => {
      return models.Counting.getCountingById(id).lean({ virtuals: true });
    },
    allCounting: async (_parent, {
      page, perPage, sortField, sortOrder, filter,
    }, { models }) => {
      return models.Counting.getCountings(filterOption(filter))
        .sort(sortOpt(sortField, sortOrder))
        .skip(page * perPage)
        .limit(perPage)
        .lean({ virtuals: true });
    },
    _allCountingMeta: async (_parent, { filter }, { models }) => {
      return { count: await models.Counting.countDocuments(filterOption(filter)) };
    },
  },
  Mutation: {
    createCounting: async (_parent, {
      countingId, countingName, teacher, score,
    }, { models }) => {
      return await models.Counting.createCounting({
        countingId, countingName, teacher, score,
      });
    },
    updateCounting: async (_parent, {
      id, countingId, countingName, teacher, score,
    }, { models }) => {
      return await models.Counting.updateCounting(id, {
        countingId, countingName, teacher, score,
      }).lean({ virtuals: true });
    },
    removeCounting: async (_parent, { id }, { models }) => {
      return await models.Counting.removeCounting(id);
    },
  },
  Counting: {
  },
};
