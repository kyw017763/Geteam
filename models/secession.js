import mongoose from 'mongoose';
import connection from './Connection';

const secessionSchema = new mongoose.Schema({
  secessionId: { type: String, required: true },
  secessionName: { type: String, required: true },
  approach: { type: Number, default: 0 },
}, {
  timestamps: true,
});

secessionSchema.statics.saveSecession = function (req) {
  return this.create({
    secessionId: req.body.secessionId,
    secessionName: req.body.secessionName,
  });
};

export default connection.model('secessions', secessionSchema);
