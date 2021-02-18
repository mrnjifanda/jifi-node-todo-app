const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Task', taskSchema);