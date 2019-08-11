const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    idx: { type: Number, required: true, unique: ture }, // A.I
    recv_id: { type: String, required: true },
    send_id: { type: String, required: true },
    content: { type: String, required: true },
    recv_chk: { type: Number, required: true, default: 0 }, // 읽음 체크
    send_date: { type: Date, required: true, timestamps: true, default: Date.now }, // 쪽지에는 시간까지 저장
    re_chk: { type: Number, required: true, default: 0 } // 대답인지
});

noteSchema.plugin(autoIncrement.plugin, {
    model: 'Note', 
    field: 'idx', 
    startAt: 1, 
    incrementBy: 1 
});

noteSchema.statics.saveNote = function(req) {
    
    return this.create({
        recv_id: req.body.recv_id,
        send_id: req.body.send_id,
        content: req.body.content
    });

};

noteSchema.statics.updateNote = function(req) {
    this.update(
        { idx: req.body.note_idx },
        { $set: { recv_chk: 1 } }
    )
}

module.exports = mongoose.model('notes', noteSchema);