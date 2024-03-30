const { connectToDatabase } = require('../utils/database');
const UserModel = require('../models/userModel');
const domainModel = require('../models/subdomineModel')
const jwt = require('jsonwebtoken')


const createUser = async (req, res) => {
    console.log("New company created");
    const organization = req.body.organisationName;
    const formattedDbName = organization
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/ /g, "-")
        .replace(/[^a-zA-Z0-9_]/g, "") // Only allow alphanumeric characters and underscores
        .split("")
        .filter((char) => char !== "/")
        .join("");
        // console.log(formattedDbName);
        // console.log(connectToDatabase(formattedDbName));
        console.log("Creating the new DB");
    const db = connectToDatabase(formattedDbName);
    console.log("Created the new DB and connected");

    try {
        // Create a new collection for users
        const User = db.model('Admin', UserModel.schema);
        const newUser = new User({
            organisationName: req.body.organisationName,
            name: req.body.name,
            email: req.body.email,
            mobileNumber: req.body.mobileNumber,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            role: req.body.role,
            subDomine: formattedDbName
        });

        await newUser.save();

        // // Close the connection after saving the user
        // db.close();
        console.log("Company registered and saved successfully");
        // Now, create a new domain
        const domainDb = connectToDatabase('odonine-tenant');
        const domain = domainDb.model('odonine-tenant', domainModel.schema);
        const newDomain = new domain({
            organisationName: req.body.organisationName,
            name: req.body.name,
            email: req.body.email,
            mobileNumber: req.body.mobileNumber,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            role: req.body.role,
            subDomine: formattedDbName
        });

        console.log(newDomain);

        await newDomain.save();
        // domainDb.close();

        const accessToken = jwt.sign({ email: email, role: "admin" }, "jwt-access-token-secret-key", { expiresIn: "1m" });
        const refreshToken = jwt.sign({ email: email, role: "admin" }, "jwt-refresh-token-secret-key", { expiresIn: "5m" });

        res.cookie('access_token', accessToken, { httpOnly: true, maxAge: 60 * 1000 }); // Expires in 1 minute
        res.cookie('refresh_token', refreshToken, 
            { httpOnly: true, maxAge: 300 * 1000, httpOnly: true, secure: true, sameSite:'strict' }); // Expires in 5 minutes
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.status(201).json(newUser);

    } catch (err) {
        if (err.code === 11000 && err.keyPattern.subDomine) {
            // res.status(400).json({ message: `The subDomine '${formattedDbName}' is already in use.` });
            res.status(400).json({ message: err });
        } else {
            res.status(400).json({ message: err.message });
        }
    }
};

const companySignIn = async (req, res) => {
    const { email, password, subDomine } = req.body;
    
    try {
        const db = connectToDatabase("odonine-tenant");

        // Find the user by email and password
        const User = db.model('odonine-tenant', domainModel.schema);
        const user = await User.findOne({ email, password, subDomine });
        console.log(user);
        // If user not found, return error
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Close the connection
        db.close();

        res.status(200).json({ 
            message: "Sign in successful",
            user
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { createUser, companySignIn };
