import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import connection from './Connection';

autoIncrement.initialize(connection);

const studySchema = new mongoose.Schema({
  num: { type: Number, required: true, unique: true }, // A.I
  kind: { type: String, required: true },
  mem: { type: String, required: true },
  topic: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  wantNum: { type: Number, required: true },
  applyNum: { type: Number, default: 0 },
  // startDay는 createdAt 으로 대신한다
  endDay: { type: Date, required: true },
  hit: { type: Number, default: 0 },
  teamChk: { type: Number, default: 0 },
}, {
  timestamps: true,
});


studySchema.plugin(autoIncrement.plugin, {
  model: 'Study',
  field: 'num',
  startAt: 1,
  incrementBy: 1,
});

studySchema.statics = {
  // study 등록
  createStudy: function (userId, kind, topic, title, content, wantNum, applyNum, endDay) {
    return this.create({
      mem: userId, kind, topic, title, content, wantNum, applyNum, endDay,
    });
  },
  // 모든 study 받아오기
  getStydies: function () {
    return this.find({});
  },
  getStudiesByCategory: function (kind, page, listOrder) {
    return this.find({ kind }).sort(listOrder).skip(page * 10)
      .lean()
      .exec()
      .then((studies) => {
        return studies;
      });
  },
  // 내가 작성한 모든 study 받아오기 - listNum과 연결
  getStudyById: function (userId) {
    return this.find({ mem: userId });
  },
  // 내가 작성한 study 종류별로 받아오기
  getSutydByKind: function (userId, kind) {
    return this.find({ mem: userId, kind });
  },
  // 현재 study 받아오기'
  getStudyByNum: function (num) {
    return this.find({
      num,
    });
  },
  // 검색
  searchStudy: function (keyword) {
    // keyword 하나 받아서 id, 이름, 주제, 파트, 제목, 내용 검색
    return this.find().or(
      [
        { id: { $regex: keyword } },
        { name: { $regex: keyword } },
        { topic: { $regex: keyword } },
        { title: { $regex: keyword } },
        { content: { $regex: keyword } },
      ],
    );
  },
  // 내가 작성한 study 변경하기
  updateStudy: function (userId, num, part, title, content, wantNum, endDay) {
    return this.findOneAndUpdate({ mem: userId, num }, {
      part, title, content, wantNum, endDay,
    }, { returnNewDocument: true });
  },
  // 내거 작성한 study 삭제하기
  removeStudy: function (userId, num) {
    return this.findOneAndDelete({ mem: userId, num });
  },
  // 조회수 하나 올리기
  updateHit: function (num) {
    return this.findOneAndUpdate(
      { num },
      { $inc: { hit: 1 } },
    );
  },
  // applyNum 하나 올리기
  updateApplyNum: function (num) {
    return this.findOneAndUpdate(
      { num },
      { $inc: { applyNum: 1 } },
    );
  },
  // 수정이 가능한지 확인 - 신청 인원이 한 명 이상이라면 수정할 수 없음
  enableModify: function (num) {
    this.find({
      num,
      applyNum: 0,
    }, (err, result) => {
      if (err) {
        return false;
      }
      // 조건을 충족하면 true
      if (result.length) {
        return true;
      }
    });
  },
  // 신청이 가능한지 확인
  enableApply: function (num) {
    this.find({
      num,
      teamChk: 0,
    }, (err, result) => {
      if (err) {
        return false;
      }
      // 조건을 충족하면 true
      if (!result.length) {
        return true;
      }
    });
  },
};

// 정렬 (1, -1)
studySchema.query.sortByNum = (order) => this.sort({ num: order });
studySchema.query.sortById = (order) => this.sort({ id: order });
studySchema.query.sortByAuthor = (order) => this.sort({ name: order });
studySchema.query.sortByTitle = (order) => this.sort({ title: order });

export default connection.model('study', studySchema);
