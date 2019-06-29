const mongoose = require('mongoose');

const secessionSchema = new mongoose.Schema({
    idx: { type: Number, required: true, unique: ture }, // A.I
    secession_id: { type: String, required: true },
    secession_name: { type: String, required: true },
    secession_date: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('Secession', secessionSchema);