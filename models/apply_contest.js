const mongoose = require('mongoose');

const applyContestSchema = new mongoose.Schema({
    num: { type: Number, required: true, unique: ture }, // A.I
    kind: { type: String, required: true },
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
});

applyContestSchema.plugin(autoIncrement.plugin, {
    model: 'ApplyContest', 
    field: 'num', 
    startAt: 1, 
    incrementBy: 1 
});

applyContestSchema.statics.saveApplyC = function(req) {

    return this.create({
        kind: req.body.kind,
        num_recv: req.body.num_recv,
        id_apply: req.body.id_apply,
        id_recv: req.body.id_recv,
        name_apply: req.body.name_apply,
        name_recv: req.body.name_recv,
        topic: req.body.topic,
        title: req.body.title,
        part: req.body.part,
        portfolio: req.body.portfolio,
        want: req.body.want,
    })
};

applyContestSchema.statics.findApplyC = function(item_kind, item_num, user_id) {

    // kind, list_num, user_id 비교해서 true면 이미 신청한 것으로 판단 
    this.find({
        kind: item_kind,
        num_recv: item_num,
        item_id : user_id,

    }, function(err, results) {
        if(err) {
            return false;
        }
        if(!results.length) {
            return true;
        }
    });

};

module.exports = mongoose.model('contestapplies', applyContestSchema);