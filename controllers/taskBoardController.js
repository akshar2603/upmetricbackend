const TaskBoard = require('../models/TaskBoard'); // Import TaskBoard model
const Task = require('../models/Task'); // Import Task model

// Controller functions

const createTaskBoard = async (req, res) => {
  try {
    const newBoard = new TaskBoard({
      name: req.body.name,
      tasks: []
    });
    await newBoard.save();
    res.status(201).json(newBoard);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create task board', error });
  }
};

const getTaskBoard = async (req, res) => {
  try {
    const board = await TaskBoard.findById(req.params.boardId).populate('tasks');
    if (!board) {
      return res.status(404).json({ message: 'Task board not found' });
    }
    res.status(200).json(board);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch task board', error });
  }
};

const addTask = async (req, res) => {
  try {
    const board = await TaskBoard.findById(req.params.boardId);
    if (!board) {
      return res.status(404).json({ message: 'Task board not found' });
    }

    const newTask = new Task({
      text: req.body.text,
      boardId: board._id
    });

    await newTask.save();
    board.tasks.push(newTask._id);
    await board.save();

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add task', error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const board = await TaskBoard.findById(req.params.boardId);
    if (!board) {
      return res.status(404).json({ message: 'Task board not found' });
    }

    const task = await Task.findByIdAndDelete(req.params.taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    board.tasks = board.tasks.filter(taskId => taskId.toString() !== req.params.taskId);
    await board.save();

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete task', error });
  }
};

const updateTaskOrder = async (req, res) => {
  try {
    const { tasks } = req.body;
    const board = await TaskBoard.findById(req.params.boardId);
    if (!board) {
      return res.status(404).json({ message: 'Task board not found' });
    }

    board.tasks = tasks;
    await board.save();

    res.status(200).json(board);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update task order', error });
  }
};

module.exports = {
  createTaskBoard,
  getTaskBoard,
  addTask,
  deleteTask,
  updateTaskOrder
};
