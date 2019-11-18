import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import connection from './Connection';
import Member from './member';

autoIncrement.initialize(connection);

const noteSchema = new mongoose.Schema({
  idx: { type: Number, required: true, unique: true }, // A.I
  memRecv: { type: mongoose.Schema.Types.ObjectId, required: true },
  memSend: { type: mongoose.Schema.Types.ObjectId, required: true },
  content: { type: String, required: true },
  recvChk: { type: Number, default: 0 }, // 읽음 체크
  reChk: { type: Number, default: 0 }, // 대답인지
}, {
  timestamps: true,
});

noteSchema.plugin(autoIncrement.plugin, {
  model: 'Note',
  field: 'idx',
  startAt: 1,
  incrementBy: 1,
});

noteSchema.statics.saveNote = function (req) {
  return this.create({
    memRecv: Member.find({ id: req.body.recvId }),
    memSend: Member.find({ id: req.body.sendId }),
    content: req.body.content,
  });
};

noteSchema.statics.updateNote = function (req) {
  this.update(
    { idx: req.body.idx },
    { $set: { recvChk: 1 } },
  );
};

export default mongoose.model('notes', noteSchema);
