const mongoose = require('mongoose');

const countingSchema = new mongoose.Schema({
    member: { type: Number },
    list: { type: Number },
    apply: { type: Number },
    team: { type: Number },
    visit: { type: Number },
});

  module.exports = mongoose.model('User', userSchema);