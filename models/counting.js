const mongoose = require('mongoose');

const countingSchema = new mongoose.Schema({
    member: { type: Number, default: 0 },
    list: { type: Number, default: 0 },
    apply: { type: Number, default: 0 },
    team: { type: Number, default: 0 },
    visit: { type: Number, default: 0 },
});

module.exports = mongoose.model('Counting', countingSchema);