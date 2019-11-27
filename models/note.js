import mongoose from 'mongoose';
import connection from './Connection';

const noteSchema = new mongoose.Schema({
  // idx 는 createdAt 으로 sort 해서 대체함
  memRecv: { type: String, required: true },
  memSend: { type: String, required: true },
  content: { type: String, required: true },
  recvChk: { type: Number, default: 0 }, // 읽음 체크
  reChk: { type: Number, default: 0 }, // 대답인지
}, {
  timestamps: true,
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

export default connection.model('notes', noteSchema);
