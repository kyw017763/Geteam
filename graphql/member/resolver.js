import { sortOpt, filterOption } from '../libs';

export const resolver = {
  Query: {
    member: async (_parent, { userId }, { models }) => {
      return models.Member.getMemberById(userId).lean({ virtuals: true });
    },
    Member: async (_parent, { userId }, { models }) => {
      return models.Member.getMemberById(userId).lean({ virtuals: true });
    },
    allMember: async (_parent, {
      page, perPage, sortField, sortOrder, filter,
    }, { models }) => {
      return models.Member.getMembers(filterOption(filter))
        .sort(sortOpt(sortField, sortOrder))
        .skip(page * perPage)
        .limit(perPage)
        .lean({ virtuals: true });
    },
  },
  Mutation: {
    createMember: async (_parent, {
      id, name, pwd, sNum, interest1, interest2, interest3, profile,
    }, { models }) => {
      return await models.Member.createMember({
        id, name, pwd, sNum, interest1, interest2, interest3, profile,
      });
    },
    updateMember: async (_parent, {
      userId, name, sNum, interest1, interest2, interest3, profile,
    }, { models }) => {
      return await models.Member.updateMember({
        userId, name, sNum, interest1, interest2, interest3, profile,
      }).lean({ virtuals: true });
    },
    removeMember: async (_parent, { userId }, { models }) => {
      return await models.Member.removeMember(userId);
    },
  },
  Member: {
  },
};
