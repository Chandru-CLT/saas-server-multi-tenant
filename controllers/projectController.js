const { connectToDatabase } = require('../utils/database');
const projectModel = require('../models/projectModel');


const createProject = async (req, res) => {
    const { organisationName } = req.body;
    const db = await connectToDatabase(organisationName);

    try {
        const Project = db.model('projects', projectModel.schema);

        const newProject = new Project({
            organisationName: req.body.organisationName,
            projectName: req.body.projectName,
        });
        console.log(newProject);
        await newProject.save();

        // Close the connection after saving the user
        db.close();

        res.status(201).json({
            message: 'Project added successfully',
            newProject
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getProjectList = async (req, res) => {
    const { subDomine } = req.params;

    try {
        const db = connectToDatabase(subDomine);

        const User = db.model('projects', projectModel.schema);
        const projectList = await User.find();

        // .select('_id name');

        db.close();

        res.status(200).json(projectList);

    } catch (error) {
        console.log(error);
    }
}

module.exports = { createProject, getProjectList };
