import mongoose from 'mongoose';
import connection from './Connection';

const secessionSchema = new mongoose.Schema({
  secessionId: { type: String, required: true },
  secessionName: { type: String, required: true },
  approach: { type: Number, default: 0 },
}, {
  timestamps: true,
});

secessionSchema.statics = {
  createSecession: function (secessionId, secessionName) {
    return this.create({
      secessionId, secessionName,
    });
  },
  updateSecession: function (secessionId) {
    return this.findOneAndUpdate({ secessionId }, {
      $set: {
        approach: 1,
      },
    });
  },
  getSecessionById: function (userId) {
    return this.find({ id: userId });
  },
  getSecessions: function () {
    return this.find({});
  },
};

export default connection.model('secessions', secessionSchema);
