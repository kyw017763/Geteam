import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import connection from './Connection';
import Member from './member';

autoIncrement.initialize(connection);

const contestSchema = new mongoose.Schema({
  num: { type: Number, required: true, unique: true }, // A.I
  kind: { type: String, required: true },
  mem: { type: mongoose.Schema.Types.ObjectId, required: true },
  topic: { type: String, required: true },
  part: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  wantNum: { type: Number, required: true },
  applyNum: { type: Number, required: true },
  // startDay는 createdAt 으로 대신한다
  endDay: { type: Date, required: true },
  hit: { type: Number, required: true, default: 0 },
  teamChk: { type: Number, default: 0 },
}, {
  timestamps: true,
});


contestSchema.plugin(autoIncrement.plugin, {
  model: 'Contest',
  field: 'num',
  startAt: 1,
  incrementBy: 1,
});

contestSchema.statics.saveContestItem = function (req) {
  return this.create({
    kind: req.body.kind,
    mem: Member.find({ id: req.body.idApply }),
    topic: req.body.topic,
    part: req.body.part,
    title: req.body.title,
    content: req.body.content,
    wantNum: req.body.wantNum,
    applyNum: req.body.applyNum,
    endDay: req.body.endDay,
  });
};


contestSchema.statics.updateHit = function (req) {
  return this.update(
    { num: req.body.num },
    { $inc: { hit: 1 } },
  );
};

// 신청 인원이 한 명 이상이라면 수정할 수 없다는 것 명시
contestSchema.statics.updateItemContest = function (req) {
  return this.update(
    { num: req.body.num },
    {
      $set: {
        part: req.body.part,
        title: req.body.title,
        content: req.body.content,
        wantNum: req.body.wantNum,
        endDay: req.body.endDay,
      },
    },
  );
};

contestSchema.statics.deleteItemContest = function (req) {
  return this.remove({ num: req.body.num });
};

// List 시 검색
contestSchema.static.allItem = function () {
  return this.find();
};
contestSchema.static.subjectItem = function (kind) {
  return this.find({ kind });
};

// View 시 검색
contestSchema.static.viewItem = function (kind, num) {
  return this.find({
    num,
    kind,
  });
};

// 검색
contestSchema.statics.findItem = function (keyword) {
  // keyword 하나 받아서 id, 이름, 주제, 파트, 제목, 내용 검색
  return this.find().or(
    [
      { id: { $regex: keyword } },
      { name: { $regex: keyword } },
      { topic: { $regex: keyword } },
      { part: { $regex: keyword } },
      { title: { $regex: keyword } },
      { content: { $regex: keyword } },
    ],
  );
};

// 정렬 (1, -1)
contestSchema.query.sortByNum = function (order) {
  return this.sort({ num: order });
};
contestSchema.query.sortById = function (order) {
  return this.sort({ id: order });
};
contestSchema.query.sortByAuthor = function (order) {
  return this.sort({ name: order });
};
contestSchema.query.sortByTitle = function (order) {
  return this.sort({ title: order });
};

export default connection.model('contestBoards', contestSchema);
