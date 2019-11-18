import { sortOpt, filterOption } from '../libs';

export const resolver = {
  Query: {
    student: async (_parent, { id }, { models }) => {
      return models.Student.getStudentById(id).lean({ virtuals: true });
    },
    Student: async (_parent, { id }, { models }) => {
      return models.Student.getStudentById(id).lean({ virtuals: true });
    },
    allStudent: async (_parent, {
      page, perPage, sortField, sortOrder, filter,
    }, { models }) => {
      return models.Student.getStudents(filterOption(filter))
        .sort(sortOpt(sortField, sortOrder))
        .skip(page * perPage)
        .limit(perPage)
        .lean({ virtuals: true });
    },
    _allStudentMeta: async (_parent, { filter }, { models }) => {
      return { count: await models.Student.countDocuments(filterOption(filter)) };
    },
  },
  Mutation: {
    createStudent: async (_parent, {
      studentId, studentName, teacher, score,
    }, { models }) => {
      return await models.Student.createStudent({
        studentId, studentName, teacher, score,
      });
    },
    updateStudent: async (_parent, {
      id, studentId, studentName, teacher, score,
    }, { models }) => {
      return await models.Student.updateStudent(id, {
        studentId, studentName, teacher, score,
      }).lean({ virtuals: true });
    },
    removeStudent: async (_parent, { id }, { models }) => {
      return await models.Student.removeStudent(id);
    },
  },
  Student: {
  },
};
