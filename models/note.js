import mongoose from 'mongoose';
import connection from './Connection';

const noteSchema = new mongoose.Schema({
  // idx 는 createdAt 으로 sort 해서 대체함
  memRecv: { type: String, required: true },
  memSend: { type: String, required: true },
  content: { type: String, required: true },
  recvChk: { type: Number, default: 0 }, // 읽음 체크
  reChk: { type: Number, required: true }, // 대답인지
}, {
  timestamps: true,
});

noteSchema.statics = {
  getNotesByRecvId: function (userId) {
    return this.find({
      memRecv: userId,
    });
  },
  getNotesBySendId: function (userId) {
    return this.find({
      memSend: userId,
    });
  },
  createNote: function (recvId, sendId, content) {
    return this.create({
      memRecv: recvId,
      memSend: sendId,
      content,
    });
  },
  createNoteReturned: function (recvId, sendId, content, returnedId) {
    return this.create({
      memRecv: recvId,
      memSend: sendId,
      content,
      reChk: returnedId,
    });
  },
  updateReadChk: function (id) {
    this.update(
      { _id: id },
      { $set: { recvChk: 1 } },
    );
  },
  removeNote: function (id) {
    return this.findOneAndDelete({ _id: id });
  },
};

export default connection.model('notes', noteSchema);
