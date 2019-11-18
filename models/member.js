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
  listNum: { type: Number, required: true, default: 0 },
  dateJoin: { type: Date, required: true, default: Date.now },
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
        type: mongoose.Schema.Types.ObjectId,
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

memberSchema.methods.comparePassword = function (inputPwd, memberPwd, cb) {
  if (inputPwd === memberPwd) {
    console.log('same');
    cb(null, true);
  } else {
    console.log('not same');
    cb('error');
  }
};

// 마이페이지에서 개인정보 조회 시
memberSchema.statics.mypageInfo = function (userId) {
  return this.find({ id: userId });
};

// 마이페이지에서 개인정보 변경 시
memberSchema.statics.updateMyInfo = function (req) {
  return this.update(
    { id: req.body.id },
    {
      $set: {
        name: req.body.name,
        sNum: req.body.sNum,
        interest1: req.body.interest1,
        interest2: req.body.interest2,
        interest3: req.body.interest3,
        profile: req.body.profile,
      },
    },
  );
};

// 마이페이지에서 비밀번호 변경 시
// 현재 비밀번호 같은지 확인하고 새로운 비밀번호로 변경
memberSchema.statics.updateMyPwd = function (req) {
  if (!(this.find({ id: req.body.id, pwd: req.body.pwd }))) {
    return this.update(
      { id: req.body.id },
      { $set: { pwd: req.body.newpwd } },
    );
  }
};

// 마이페이지에서 알림 변경 시
memberSchema.statics.updateMyNoti = function (req) {
  return this.update(
    { id: req.body.id },
    {
      $set: {
        notiApply: req.body.notiApply,
        notiRecv: req.body.notiRecv,
        notiVol: req.body.notiVol,
      },
    },
  );
};

// 회원탈퇴
memberSchema.statics.deleteSign = function (userId) {
  return this.remove({ id: userId });
};

export default connection.model('members', memberSchema);
