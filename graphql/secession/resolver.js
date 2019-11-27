import { sortOpt, filterOption } from '../libs';

export const resolver = {
  Query: {
    secession: async (_parent, { id }, { models }) => {
      return models.Secession.getSecessionById(id).lean({ virtuals: true });
    },
    Secession: async (_parent, { id }, { models }) => {
      return models.Secession.getSecessionById(id).lean({ virtuals: true });
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
    _allSecessionMeta: async (_parent, { filter }, { models }) => {
      return { count: await models.Secession.countDocuments(filterOption(filter)) };
    },
  },
  Mutation: {
    createSecession: async (_parent, {
      secessionId, secessionName, teacher, score,
    }, { models }) => {
      return await models.Secession.createSecession({
        secessionId, secessionName, teacher, score,
      });
    },
    updateSecession: async (_parent, {
      id, secessionId, secessionName, teacher, score,
    }, { models }) => {
      return await models.Secession.updateSecession(id, {
        secessionId, secessionName, teacher, score,
      }).lean({ virtuals: true });
    },
    removeSecession: async (_parent, { id }, { models }) => {
      return await models.Secession.removeSecession(id);
    },
  },
  Secession: {
  },
};
