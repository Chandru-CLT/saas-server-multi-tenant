const { connectToDatabase } = require('../utils/database');
const staffModel = require('../models/staffModel');

const staffSignUp = async (req, res) => {
    const { organisationName } = req.body;

    const db = await connectToDatabase(organisationName);

    try {
        console.log(req.body);
        const Staff = db.model('staff', staffModel.schema);

        const newStaff = new Staff({
            organisationName: req.body.organisationName,
            name: req.body.name,
            email: req.body.email,
            mobileNumber: req.body.mobileNumber,
            password: req.body.password,
        });

        await newStaff.save();

        // Close the connection after saving the user
        console.log("Staff added successfully");
        // db.close();

        res.status(201).json({
            message: 'Signup successful',
            newStaff
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'User already registered' });
    }
}

const staffSignin = async (req, res) => {
    const { email, password, subDomine } = req.body;

    try {
        const db = connectToDatabase(subDomine);

        // Find the user by email and password
        const User = db.model('staff', staffModel.schema);
        const user = await User.findOne({ email, password });
        console.log(user);
        // If user not found, return error
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Close the connection
        // db.close();

        res.status(200).json({ 
            message: "Sign in successful",
            user
        });

    } catch (error) {
        res.status(500).json({ message: err.message });
    }
}

const getStaffList = async (req, res) => {
    const { subDomine } = req.params;
    console.log("Stafflist api called");
    try {
        const db = connectToDatabase(subDomine);

        const User = db.model('staff', staffModel.schema);
        const staffList = await User.find().select('_id name');;

        // db.close();

        res.status(200).json(staffList);
        console.log("Stafflist data send succesfully");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = { staffSignUp, staffSignin, getStaffList };
