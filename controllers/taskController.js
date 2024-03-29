const { connectToDatabase } = require('../utils/database');
const taskModel = require('../models/taskModel');


const createTask = async (req, res) => {
    const { organisationName } = req.body;
    const db = await connectToDatabase(organisationName);

    try {
        const Task = db.model('tasklist', taskModel.schema);

        const newTask = new Task({
            organisationName: req.body.organisationName,
            projectName: req.body.projectName,
            projectId: req.body.projectId,
            taskInfo: req.body.taskName,
            assignedTo: req.body.assignedTo,
            assignedToId: req.body.assignedToId,
        });

        console.log(newTask);

        await newTask.save();

        // Close the connection after saving the user
        db.close();

        res.status(201).json({
            message: 'Task added successfully',
            newTask
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const viewTask = async(req, res) => {
    const { subDomine } = req.params;
    const db = await connectToDatabase(subDomine);

    try {
        const Task = db.model('tasklist', taskModel.schema);

        const taskList = await Task.find();
        // .select('_id name');

        db.close();

        res.status(200).json(taskList);
    } catch (error) {
        
    }

}

module.exports = { createTask, viewTask };
