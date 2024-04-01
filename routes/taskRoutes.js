const express = require('express');
const { createTask, viewTask, viewStaffTask } = require('../controllers/taskController');
const router = express.Router();

router.post('/create-task', createTask);
router.get('/:subDomine/get-tasklist', viewTask);
router.get('/:subDomine/get-tasklist/:staffId', viewStaffTask);

module.exports = router;
