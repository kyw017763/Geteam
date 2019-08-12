const mongoose = require('mongoose');

let url = 'mongodb://localhost:27017/zteam';
let connection = mongoose.createConnection(url, {useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true}, function(err) {
  if(err){
    console.log("Connected failed");
  }
  console.log("Connected successfully to server");
});

const countingSchema = new mongoose.Schema({
    member: { type: Number, default: 0 },
    list: { type: Number, default: 0 },
    apply: { type: Number, default: 0 },
    team: { type: Number, default: 0 },
    visit: { type: Number, default: 0 },
});

countingSchema.statics.updateMember = function() {
  this.updateOne({}, { $inc: { member : 1 } });
}

countingSchema.statics.updateList = function() {
  this.updateOne({}, { $inc: { list : 1 } });
}

countingSchema.statics.updateApply = function() {
  this.updateOne({}, { $inc: { apply : 1 } });
}

countingSchema.statics.updateTeam = function() {
  this.updateOne({}, { $inc: { team : 1 } });
}

countingSchema.statics.updateVisit = function() {
  this.updateOne({}, { $inc: { visit : 1 } });
}

module.exports = connection.model('countings', countingSchema);