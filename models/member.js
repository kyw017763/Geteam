import mongoose from 'mongoose';
import connection from './Connection';

const memberSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  pwd: { type: String, required: true },
  sNum: { type: Number, required: true },
  interest1: { type: String, required: true },
  interest2: { type: String, required: true },
  interest3: { type: String, required: true },
  profile: { type: String, required: true },
  listNum: { type: Number, default: 0 },
  // 가입일은 createdAt 으로 대신한다
  notiApply: { type: Number, default: 1 },
  notiRecv: { type: Number, default: 1 },
  notiVol: { type: Number, default: 1 },
  image: {
    data: Buffer,
    contentsType: String,
    default: {},
  },
  friend: {
    type: [{
      fId: {
        type: String,
        requied: true,
      },
      fDate: {
        type: Date,
        default: Date.now(),
      },
    }],
    default: [],
  },
}, { minimize: false, timestamps: true });

memberSchema.statics = {
  createMember: function (id, name, pwd, sNum, interest1, interest2, interest3, profile) {
    return this.create({
      id, name, pwd, sNum, interest1, interest2, interest3, profile,
    });
  },
  getMembers: function (userId) {
    return this.find({ id: userId });
  },
  getMemberById: function (userId) {
    return this.find({ id: userId });
  },
  updateMember: function (userId, name, sNum, interest1, interest2, interest3, profile) {
    return this.findOneAndUpdate({ id: userId }, {
      $set: {
        name, sNum, interest1, interest2, interest3, profile,
      },
    });
  },
  updatePwd: function (userId, newPwd) {
    const pwd = this.find({ id: userId }).select('pwd');

    if (pwd === newPwd) {
      return false;
    // eslint-disable-next-line no-else-return
    } else {
      this.update(
        { id: userId },
        { $set: { pwd: newPwd } },
      );
      return true;
    }
  },
  updateNoti: function (userId, notiApply, notiRecv, notiVol) {
    return this.update(
      { id: userId },
      {
        $set: {
          notiApply, notiRecv, notiVol,
        },
      },
    );
  },
  removeMember: function (userId) {
    return this.findOneAndDelete({ id: userId });
  },

  addFriend: function (userId, fId) {
    this.update(
      { id: userId },
      { // 내쪽에 추가
        $push: {
          friend: {
            fId,
          },
        },
      },
    ).update(
      { id: fId },
      { // 쟤쪽에 추가
        $push: {
          friend: {
            fId: userId,
          },
        },
      },
    );
  },
  removeFriend: function (userId, friendId) {
    this.update( // 내쪽에서 삭제
      { id: userId },
      {
        $pull: {
          friend: {
            fId: friendId,
          },
        },
      },
    )
      .update( // 쟤쪽에서 삭제
        { id: friendId },
        {
          $pull: {
            friend: {
              fId: userId,
            },
          },
        },
      );
  },
};

// TODO: 이미지 처리 필요
// TODO: 친구 신청 처리 필요
// TODO: 친구 추가 (양쪽)

export default connection.model('members', memberSchema);
