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
  createMember: function (req) {
    return this.create({
      id: req.body.id,
      name: req.body.name,
      pwd: req.body.pwd,
      sNum: req.body.sNum,
      interest1: req.body.interest1,
      interest2: req.body.interest2,
      interest3: req.body.interest3,
      profile: req.body.profile,
    });
  },
  getMember: function (userId) {
    return this.find({ id: userId });
  },
  updateMember: function (userId, req) {
    return this.findOneAndUpdate({ id: userId }, {
        $set: {
          name: req.body.name,
          sNum: req.body.sNum,
          interest1: req.body.interest1,
          interest2: req.body.interest2,
          interest3: req.body.interest3,
          profile: req.body.profile,
        }
    });
  },
  updatePwd: function (userId, newPwd) {
    let pwd = this.find({ id: userId }).select('pwd');

    if(pwd === newPwd) {
      return false;
    } else {
      this.update(
        { id: req.body.id },
        { $set: { pwd: req.body.newpwd } },
      );
      return true;
    }
  },
  updateNoti: function (userId, req) {
    return this.update(
      { id: userId },
      {
        $set: {
          notiApply: req.body.notiApply,
          notiRecv: req.body.notiRecv,
          notiVol: req.body.notiVol,
        },
      },
    );
  },
  removeMember: function (userId) {
    return this.findOneAndDelete({ id: userId });
  },
};


// 이미지 처리 필요
// 친구 신청 처리 필요
// 친구 추가 (양쪽)
memberSchema.statics.addFriend = function (req, userId) {
  this.update(
    { id: userId },
    { // 내쪽에 추가
      $push: {
        friend: {
          fId: req.body.fId,
        },
      },
    },
  ).update(
    { id: req.body.fId },
    { // 쟤쪽에 추가
      $push: {
        friend: {
          fId: userId,
        },
      },
    },
  );
};

// 친구 끊기 (양쪽)
memberSchema.statics.removeFriend = function (req, userId) {
  this.update( // 내쪽에서 삭제
    { id: userId },
    {
      $pull: {
        friend: {
          fId: req.body.fId,
        },
      },
    },
  )
    .update( // 쟤쪽에서 삭제
      { id: req.body.fId },
      {
        $pull: {
          friend: {
            fId: userId,
          },
        },
      },
    );
};

export default connection.model('members', memberSchema);
