const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/userModel.js');

router.get('/profile', async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(404).send('User not found.');
        }

        return res.status(200).json({
            id: user._id,
            email: user.email,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            courses: user.courses,
        });

    } catch (error) {
        console.error("Error accessing profile:", error);
        res.status(500).send('Error fetching user profile.');
    }
});

router.put('/update', async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        const { firstName, lastName, email, password } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found.');
        }

        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (email) user.email = email;
        if (password) user.password = password;

        await user.save();

        return res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        return res.status(500).send('Error updating profile.');
    }
});

router.delete('/delete', async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        // Delete the user account
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).send('User not found.');
        }

        return res.status(200).json({ message: 'User account deleted successfully' });
    } catch (error) {
        return res.status(500).send('Error deleting user account.');
    }
});

router.get('/students', async (req, res) => {
    try {
        const { query } = req.query;
        let students;

        if (query) {
            // Split the query into first name and last name
            const [firstName, lastName] = query.split(' ');

            // Create a regex for case-insensitive search
            const firstNameRegex = new RegExp(firstName, 'i');
            const lastNameRegex = lastName ? new RegExp(lastName, 'i') : firstNameRegex;

            // Search for students by email, first name or last name
            students = await User.find({
                $or: [
                    { email: { $regex: firstNameRegex } }, // Case-insensitive email search
                    { firstName: { $regex: firstNameRegex } }, // Case-insensitive first name search
                    { lastName: { $regex: lastNameRegex } }, // Case-insensitive last name search
                ],
                role: 'student' // Filter only students
            });
        } else {
            // Fetch all students if no query provided
            students = await User.find({ role: 'student' });
        }

        res.json(students);
    } catch (error) {
        console.error('Failed to fetch students:', error);
        res.status(500).send('Error fetching students');
    }
});

router.put('/:userId/add_course', async (req, res) => {
    try {
        const { userId } = req.params;
        const { courseId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        if (user.courses.includes(courseId)) {
            return res.status(400).send('User already in course');
        } else {
            user.courses.push(courseId);
            await user.save();
            return res.status(200).send('User was added to course');
        }
    } catch (error) {
        res.status(500).send('Server error');
    }
});

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

router.post('/register', async (req, res) => {
    try {
        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
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
        //Generate token with user id, role, email, first name, last name + courses
        const token = jwt.sign({
            userId: user._id, 
            role: user.role, 
            email: user.email, 
            firstName: user.firstName, // Include first name in token payload
            lastName: user.lastName, // Include last name in token payload
            courses: user.courses
        }, 
        process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token }); //Send token to client
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});



module.exports = router;
