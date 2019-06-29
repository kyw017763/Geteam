const mongoose = require('mongoose');

const applyContestSchema = new mongoose.Schema({
    num: { type: Number, required: true, unique: ture }, // A.I
    kind: { type: Number, required: true },
    num_recv: { type: Number, required: true },
    id_apply: { type: String, required: true },
    id_recv: { type: String, required: true },
    name_apply: { type: String, required: true },
    name_recv: { type: String, required: true },
    topic: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    apply_day: { type: Date, required: true, default: Date.now },
    part: { type: String, required: true, trim: true },
    portfolio: { type: String, required: true, trim: true },
    want: { type: String, required: true, trim: true },
    apply_chk: { type: Number, required: true, default: 0 }
})

module.exports = mongoose.model('ApplyContest', applyContestSchema);