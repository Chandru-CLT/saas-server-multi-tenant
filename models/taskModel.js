const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    organisationName: {
        type: String,
        required: [true, "Organisation name is mandatory"],
    },
    projectName: {
        type: String,
        required: [true, "projectName is mandatory"]
    },
    projectId: {
        type: String,
        // required: [true, "projectId is mandatory"]
    },
    taskName: {
        type: String,
        required: [true, "taskInfo is mandatory"]
    },
    assignedTo: {
        type: String,
        required: [true, "assignedTo is mandatory"]
    },
    assignedToId: {
        type: String,
        required: [true, "assignedToId is mandatory"]
    },

});

module.exports = mongoose.model('tasklist', taskSchema);
