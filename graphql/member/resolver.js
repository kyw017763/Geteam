import { sortOpt, filterOption } from '../libs';

export const resolver = {
  Query: {
    member: async (_parent, { id }, { models }) => {
      return models.Member.getMemberById(id).lean({ virtuals: true });
    },
    Member: async (_parent, { id }, { models }) => {
      return models.Member.getMemberById(id).lean({ virtuals: true });
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
    _allMemberMeta: async (_parent, { filter }, { models }) => {
      return { count: await models.Member.countDocuments(filterOption(filter)) };
    },
  },
  Mutation: {
    createMember: async (_parent, {
      memberId, memberName, teacher, score,
    }, { models }) => {
      return await models.Member.createMember({
        memberId, memberName, teacher, score,
      });
    },
    updateMember: async (_parent, {
      id, memberId, memberName, teacher, score,
    }, { models }) => {
      return await models.Member.updateMember(id, {
        memberId, memberName, teacher, score,
      }).lean({ virtuals: true });
    },
    removeMember: async (_parent, { id }, { models }) => {
      return await models.Member.removeMember(id);
    },
  },
  Member: {
  },
};
