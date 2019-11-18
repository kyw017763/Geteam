import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import connection from './Connection';
import Member from './member';

autoIncrement.initialize(connection);

const applyStudySchema = new mongoose.Schema({
  num: { type: Number, required: true, unique: true }, // A.I
  kind: { type: String, required: true },
  itemNum: { type: Number, required: true },
  memApply: { type: mongoose.Schema.Types.ObjectId, required: true },
  memRecv: { type: mongoose.Schema.Types.ObjectId, required: true },
  topic: { type: String, required: true, trim: true },
  title: { type: String, required: true, trim: true },
  portfolio: { type: String, required: true, trim: true },
  want: { type: String, required: true, trim: true },
  applyChk: { type: Number, default: 0 },
}, {
  timestamps: true,
});

applyStudySchema.plugin(autoIncrement.plugin, {
  model: 'ApplyStudy',
  field: 'num',
  startAt: 1,
  incrementBy: 1,
});

applyStudySchema.statics.saveApplyS = function (req) {
  return this.create({
    kind: req.body.kind,
    itemNum: req.body.itemNum,
    memApply: Member.find({ id: req.body.idApply }),
    memRecv: Member.find({ id: req.body.idRecv }),
    topic: req.body.topic,
    title: req.body.title,
    portfolio: req.body.portfolio,
    want: req.body.want,
  });
};

applyStudySchema.statics.findApplyS = function (itemKind, itemNum, userId) {
  // kind, list_num, user_id 비교해서 true면 이미 신청한 것으로 판단
  this.find({
    kind: itemKind,
    num: itemNum,
    memApply: Member.find({ id: userId }),
  }, (err, results) => {
    if (err) {
      return false;
    }
    if (!results.length) {
      return true;
    }
  });
};

export default connection.model('studyApplies', applyStudySchema);
