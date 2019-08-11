const mongoose = require('mongoose');

const secessionSchema = new mongoose.Schema({
    num: { type: Number, required: true, unique: ture }, // A.I
    secession_id: { type: String, required: true },
    secession_name: { type: String, required: true },
    secession_date: { type: Date, required: true, default: Date.now }
});

secessionSchema.plugin(autoIncrement.plugin, {
    model: 'Secession', 
    field: 'num', 
    startAt: 1, 
    incrementBy: 1 
});

secessionSchema.statics.saveSecession = function(req) {
    
    return this.create({
        secession_id: req.body.secession_id,
        secession_name: req.body.secession_name
    });
};

module.exports = mongoose.model('secessions', secessionSchema);