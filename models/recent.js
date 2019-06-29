const mongoose = require('mongoose');

const recentSchema = new mongoose.Schema({
    num: { type: Number, required: true, unique: ture, default: 0 }, // A.I
    big: { type: String, required: true, default: 0 },
    kind: { type: String, required: true, default: 0 },
    list_num: { type: Number, required: true, default: 0 }
});

module.exports = mongoose.model('Recent', recentSchema);