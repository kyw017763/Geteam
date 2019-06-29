const mongoose = require('mongoose');

const contestSchema = new mongoose.Schema({
    num: { type: Number, required: true, unique: ture }, // A.I
    type: { type: String, required: true },
    id: { type: String, required: true },
    name: { type: String, required: true },
    topic: { type: String, required: true },
    part: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    want_num: { type: Number, required: true },
    apply_num: { type: Number, required: true },
    start_day: { type: Date, required: true },
    end_day: { type: Date, required: true },
    hit: { type: Number, required: true },
    team_chk: { type: Number, required: true, default: 0 }
})

module.exports = mongoose.model('Contest', contestSchema);