import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import connection from './Connection';

autoIncrement.initialize(connection);

const noteSchema = new mongoose.Schema({
  idx: { type: Number, required: true, unique: true }, // A.I
  memRecv: { type: String, required: true },
  memSend: { type: String, required: true },
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

noteSchema.statics = {
  createNote: function (req) {
    return this.create({
      memRecv: req.body.recvId,
      memSend: req.body.sendId,
      content: req.body.content,
    });
  },
  createNoteReturn: function (req) {
    return this.create({
      memRecv: req.body.recvId,
      memSend: req.body.sendId,
      content: req.body.content,
      reChk: 1,
    });
  },
  updateNote: function (userId, content) {
    return this.findOneAndUpdate({ id: userId }, {
      $set: {
        content,
      },
    });
  },
  removeNote: function (idx) {
    return this.findOneAndDelete({ idx });
  },
  updateReadChk: function (idx) {
    this.update(
      { idx },
      { $set: { recvChk: 1 } },
    );
  },
};

export default mongoose.model('notes', noteSchema);
