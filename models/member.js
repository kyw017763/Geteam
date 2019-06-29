const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    num: { type: Number, required: true, unique: ture }, // A.I
    id: { type: String, required: true },
    name: { type: String, required: true },
    pwd: { type: String, required: true },
    s_num: { type: Number, required: true },
    interest1: { type: String, required: true },
    intesrest2: { type: String, required: true },
    interest3: { type: String, required: true },
    profile: { type: String, required: true },
    image : {
        data : Buffer,
        contentsType : String
    },
    friend: [String],
    list_num: { type: Number, required: true },
    date_join: { type: Date, required: true, default: Date.now },
    noti_ap: { type: Number, required: true, default: 1 },
    noti_recvap: { type: Number, required: true, default: 1 },
    noti_vol: { type: Number, required: true, default: 1 }
})

module.exports = mongoose.model('Member', memberSchema);
