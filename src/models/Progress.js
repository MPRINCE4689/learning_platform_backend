const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  user:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  completedLessons: [String],
  percentComplete: { type: Number, default: 0 }
});

module.exports = mongoose.model('Progress', progressSchema);
