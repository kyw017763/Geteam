const mongoose = require('mongoose');

let url = 'mongodb://localhost:27017/zteam';
let connection = mongoose.createConnection(url, {useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true}, function(err) {
  if(err){
    console.log("Connected failed");
  }
  console.log("Connected successfully to server");
});

// const autoIncrement = require('mongoose-auto-increment');
// autoIncrement.initialize(connection);

const memberSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    pwd: { type: String, required: true },
    s_num: { type: Number, required: true },
    interest1: { type: String, required: true },
    interest2: { type: String, required: true },
    interest3: { type: String, required: true },
    profile: { type: String, required: true },
    list_num: { type: Number, required: true, default: 0 },
    date_join: { type: Date, required: true, default: Date.now },
    noti_apply: { type: Number, required: true, default: 1 },
    noti_recvap: { type: Number, required: true, default: 1 },
    noti_vol: { type: Number, required: true, default: 1 },
    image : {
        data : Buffer,
        contentsType : String,
        default: {}
   },
    friend: {
        type : [{
            f_id: {
                type: String
            },
            f_date: {
                type: Date,
                default: Date.now()
            }
        }],
        default: []
    }
}, { minimize: false });

// memberSchema.plugin(autoIncrement.plugin, {
//     model: 'members', 
//     field: 'num', 
//     startAt: 1, 
//     incrementBy: 1 
// });

// 이미지 처리 필요

// 친구 신청 처리 필요

// 친구 추가 (양쪽) 
memberSchema.statics.addFriend = function(req, user_id) {
    this.update(
        { id: user_id },
        { // 내쪽에 추가
        $push: {
            friend: {
                f_id: req.body.f_id
            }
        }
    })
    .update(
        { id: req.body.id },
        { // 쟤쪽에 추가
        $push: {
            friend: {
                f_id: user_id,
            }
        }
    });
}

// 친구 끊기 (양쪽)
memberSchema.statics.removeFriend = function(req) {
    this.update( // 내쪽에서 삭제
        { id: user_id },
        {
        $pull: {
            friend: {
                f_id: req.body.f_id
            }
        }
    })
    .update( // 쟤쪽에서 삭제
        { id: req.body.id },
        {
        $pull: {
            friend: {
                f_id: user_id,
            }
        }
    });
}

// 마이페이지에서 개인정보 조회 시
memberSchema.statics.mypageInfo = function(user_id) {
    return this.find({id : user_id});
};

// 마이페이지에서 개인정보 변경 시
memberSchema.statics.updateMyInfo = function(req) {
    return this.update(
        { id: req.body.id },
        {   $set: {
            name: req.body.name,
            s_num: req.body.s_num,
            interest1: req.body.interest1,
            interest2: req.body.interest2,
            interest3: req.body.interest3,
            profile: req.body.profile
            }
        }
    )
};

// 마이페이지에서 비밀번호 변경 시
// 현재 비밀번호 같은지 확인하고 새로운 비밀번호로 변경
memberSchema.statics.updateMyPwd = function(req) {
    if(this.find({ id: req.body.id, pwd: req.body.pwd })) 
    {
        
    } else {
        return this.update(
            { id: req.body.id }, 
            { $set: { pwd : req.body.newpwd } }
    );
    }
};

// 마이페이지에서 알림 변경 시
memberSchema.statics.updateMyNoti = function(req) {
    return this.update(
        { id: req.body.id }, 
        { $set: { 
        noti_apply: req.body.noti_apply,
        noti_recvap: req.body.noti_recvap,
        noti_vol:  req.body.noti_vol
    } });
};

// 회원탈퇴
memberSchema.statics.deleteSign = function(user_id) {
    return this.remove({ id: user_id });
};

module.exports = connection.model('members', memberSchema);