const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const memberSchema = new mongoose.Schema({
    num: { type: Number, required: true, unique: true }, // A.I
    id: { type: String, required: true },
    name: { type: String, required: true },
    pwd: { type: String, required: true },
    s_num: { type: Number, required: true },
    interest1: { type: String, required: true },
    interest2: { type: String, required: true },
    interest3: { type: String, required: true },
    profile: { type: String, required: true },
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
    },
    list_num: { type: Number, required: true, default: 0 },
    date_join: { type: Date, required: true, default: Date.now },
    noti_apply: { type: Number, required: true, default: 1 },
    noti_recvap: { type: Number, required: true, default: 1 },
    noti_vol: { type: Number, required: true, default: 1 }
});

memberSchema.plugin(autoIncrement.plugin, {
    model: 'Member', 
    field: 'num', 
    startAt: 1, 
    incrementBy: 1 
});

// 이미지 처리 필요

// 친구 신청 처리 필요

// 친구 추가 (양쪽) 
memberSchema.statics.addFriend = (req, user_id) => {
    memberSchema.update(
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
memberSchema.statics.removeFriend = (req) => {
    memberSchema.update( // 내쪽에서 삭제
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


// 회원가입
memberSchema.statics.signup = (req) => {
    return memberSchema.create({
        id: req.body.signup_email,
        name: req.body.signup_name,
        pwd: req.body.signup_pwd,
        s_num: req.body.signup_num,
        interest1: req.body.signup_inter1,
        interest2: req.body.signup_inter2,
        interest3: req.body.signup_inter3,
        profile: req.body.signup_profile
    })
};

// 회원가입 시 같은 이메일인 사람 있는 지 확인
memberSchema.statics.checkSignup = (req) => {
    return memberSchema.find({id : req.body.signup_email});
}

// 마이페이지에서 개인정보 조회 시
memberSchema.statics.mypageInfo = (user_id) => {
    return memberSchema.find({id : user_id});
};

// 마이페이지에서 개인정보 변경 시
memberSchema.statics.updateMyInfo = (req) => {
    return memberSchema.update(
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
memberSchema.statics.updateMyPwd = (req) => {
    if(memberSchema.find({ id: req.body.id, pwd: req.body.pwd })) 
    {
        
    } else {
        return memberSchema.update(
            { id: req.body.id }, 
            { $set: { pwd : req.body.newpwd } }
    );
    }
};

// 마이페이지에서 알림 변경 시
memberSchema.statics.updateMyNoti = (req) => {
    return memberSchema.update(
        { id: req.body.id }, 
        { $set: { 
        noti_apply: req.body.noti_apply,
        noti_recvap: req.body.noti_recvap,
        noti_vol:  req.body.noti_vol
    } });
};
  

// 로그인
memberSchema.statics.checkSignin = (user_id, user_pwd) => {
    return memberSchema.find({id : user_id}, {pwd: user_pwd});
};
memberSchema.statics.checkSigninId = (user_id) => {
    return memberSchema.find({id : user_id});
};

// 회원탈퇴
memberSchema.statics.deleteSign = (user_id) => {
    return memberSchema.remove({ id: user_id });
};

module.exports = mongoose.model('Member', memberSchema);
