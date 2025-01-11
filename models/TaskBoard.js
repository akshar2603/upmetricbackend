const mongoose = require('mongoose');
const Task = require('./Task'); // Import Task model

const taskBoardSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }], // Referencing the Task model
});

const TaskBoard = mongoose.model('TaskBoard', taskBoardSchema);

module.exports = TaskBoard; // Export the TaskBoard model
