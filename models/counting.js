const mongoose = require('mongoose');

const countingSchema = new mongoose.Schema({
    member: { type: Number, default: 0 },
    list: { type: Number, default: 0 },
    apply: { type: Number, default: 0 },
    team: { type: Number, default: 0 },
    visit: { type: Number, default: 0 },
});

countingSchema.statics.updateMember = () => {
  update({ $inc: { member : 1 } });
}

countingSchema.statics.updateList = () => {
  update({ $inc: { list : 1 } });
}

countingSchema.statics.updateApply = () => {
  update({ $inc: { apply : 1 } });
}

countingSchema.statics.updateTeam = () => {
  update({ $inc: { team : 1 } });
}

countingSchema.statics.updateVisit = () => {
  update({ $inc: { visit : 1 } });
}


module.exports = mongoose.model('Counting', countingSchema);