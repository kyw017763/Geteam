import { sortOpt, filterOption } from '../libs';

export const resolver = {
  Query: {
    secession: async (_parent, { userId }, { models }) => {
      return models.Secession.getSecessionById(userId).lean({ virtuals: true });
    },
    Secession: async (_parent, { userId }, { models }) => {
      return models.Secession.getSecessionById(userId).lean({ virtuals: true });
    },
    allSecession: async (_parent, {
      page, perPage, sortField, sortOrder, filter,
    }, { models }) => {
      return models.Secession.getSecessions(filterOption(filter))
        .sort(sortOpt(sortField, sortOrder))
        .skip(page * perPage)
        .limit(perPage)
        .lean({ virtuals: true });
    },
  },
  Mutation: {
    createSecession: async (_parent, {
      secessionId, secessionName,
    }, { models }) => {
      return await models.Secession.createSecession({
        secessionId, secessionName,
      });
    },
    updateSecession: async (_parent, {
      secessionId,
    }, { models }) => {
      return await models.Secession.updateSecession({
        secessionId,
      }).lean({ virtuals: true });
    },
  },
  Secession: {
  },
};
