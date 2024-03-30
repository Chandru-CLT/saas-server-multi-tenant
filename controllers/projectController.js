const { connectToDatabase } = require('../utils/database');
const projectModel = require('../models/projectModel');


const createProject = async (req, res) => {
    const { organisationName } = req.body;
    console.log("createProject api called");


    try {
        const db = await connectToDatabase(organisationName);
        console.log("connected to tenant DB to add projects");

        const Project = db.model('projects', projectModel.schema);

        const newProject = new Project({
            organisationName: req.body.organisationName,
            projectName: req.body.projectName,
        });
        console.log(newProject);
        
        await newProject.save();

        // Close the connection after saving the user
        console.log("data saved successfully");
        // db.close();

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
    console.log("getProjectList api called");
    try {
        const db = connectToDatabase(subDomine);
        console.log("connected to tenant DB to fetch projects");
        const User = db.model('projects', projectModel.schema);
        const projectList = await User.find();

        // .select('_id name');

        // db.close();

        res.status(200).json(projectList);
        console.log("Data sent successfully");
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { createProject, getProjectList };
