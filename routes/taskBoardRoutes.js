const express = require('express');
const {
  createTaskBoard,
  getTaskBoard,
  addTask,
  deleteTask,
  updateTaskOrder,
} = require('../controllers/taskBoardController'); // Importing the controller functions

const router = express.Router();

// Define routes for task board operations
router.post('/board', createTaskBoard); // Create new task board
router.get('/board/:boardId', getTaskBoard); // Get tasks for a task board
router.post('/board/:boardId/tasks', addTask); // Add task to a task board
router.delete('/board/:boardId/tasks/:taskId', deleteTask); // Delete task from task board
router.put('/board/:boardId/tasks/order', updateTaskOrder); // Update task order

// Export the router to be used in the main server file
module.exports = router;
