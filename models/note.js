const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    idx: { type: Number, required: true, unique: ture }, // A.I
    recv_id: { type: String, required: true },
    send_id: { type: String, required: true },
    content: { type: String, required: true },
    recv_chk: { type: Number, required: true, default: 0 }, // 읽음 체크
    send_date: { type: Date, required: true, default: Date.now }, // 쪽지에는 시간까지 저장
    re_chk: { type: Number, required: true, default: 0 } // 대답인지
});

noteSchema.statics.saveNote = (req) => {
    
    return this.create({
        recv_id: req.body.recv_id,
        send_id: req.body.send_id,
        content: req.body.content
    });

};

noteSchema.statics.updateNote = (req) => {
    this.update( // 내쪽에서 삭제
        { idx: req.body.note_idx },
        { $set: { recv_chk: 10 } }
    )
}

module.exports = mongoose.model('Note', noteSchema);