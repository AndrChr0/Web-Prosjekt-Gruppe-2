
/***************************************
 *          userRoute.js             *
 ***************************************
 * Purpose: Handles HTTP requests for Users (CRUD operations).
 * Interacts with: userModel 
 **************************************/

import jwt from 'jsonwebtoken';//Import jsonwebtoken
import express from "express";
import { User } from "../models/userModel.js";
import bcrypt from 'bcryptjs';
const router = express.Router();

//Get user by id
router.get('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).send('User not found.');
        }

        res.json(user);
    } catch (error) {
        res.status(500).send('Error fetching user.');
    }
});



// Profile user test
router.get('/profile', async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Assuming 'Bearer <token>'
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password');
        console.log(decoded.userId);
        if (!user) return res.status(404).send('User not found.');

        res.json({ email: user.email });
    } catch (error) {
        res.status(500).send('Error fetching user profile.');
    }
});

// Get route for fetching all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json({
            count: users.length,
            data: users,
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Updated post for User Registration 
router.post('/register', async (req, res) => { //Changed this line to use '/register'
    try {
        const newUser = new User({
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
        console.log('User registered successfully');
    } catch (error) {
        res.status(400).json(error);
        console.log('User registration failed');
    }
});

// Placeholder for PUT route to update a user


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        // Password verification logic
        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        //Generate token with user id, role, email
        const token = jwt.sign({
            userId: user._id, role: user.role, email: user.email
        }, // Including role in payload 
            process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token }); //Send token to client
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


export default router;