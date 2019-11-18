import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import connection from './Connection';

autoIncrement.initialize(connection);

const secessionSchema = new mongoose.Schema({
  num: { type: Number, required: true, unique: true }, // A.I
  secessionId: { type: String, required: true },
  secessionName: { type: String, required: true },
  approach: { type: Number, default: 0 },
}, {
  timestamps: true,
});


secessionSchema.plugin(autoIncrement.plugin, {
  model: 'Secession',
  field: 'num',
  startAt: 1,
  incrementBy: 1,
});

secessionSchema.statics.saveSecession = function (req) {
  return this.create({
    secessionId: req.body.secessionId,
    secessionName: req.body.secessionName,
  });
};

export default mongoose.model('secessions', secessionSchema);
