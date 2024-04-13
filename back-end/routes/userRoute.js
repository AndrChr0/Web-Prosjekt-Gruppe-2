import jwt from 'jsonwebtoken';
import express from "express";
import { User } from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import e from 'express';
const router = express.Router();


router.get('/profile', async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId)
                               .populate('courses') 
                               .exec();

        if (!user) {
            return res.status(404).send('User not found.');
        }

        return res.status(200).json({
            id: user._id, 
            email: user.email,
            role: user.role,
            courses: user.courses, 
           
        });

    } catch (error) {
        console.error("Error accessing profile:", error);
        res.status(500).send('Error fetching user profile.');
    }
});


router.put('/update-email', async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        const newEmail = req.body.email;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found.');
        }

        user.email = newEmail;
        await user.save();

        return res.status(200).json({ message: 'Email updated successfully' });
    } catch (error) {
        return res.status(500).send('Error updating email.');
    }
});

router.put('/update-password', async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        const { password } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found.');
        }

        // Update password
        user.password = password;
        await user.save();

        return res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        return res.status(500).send('Error updating password.');
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
router.post('/register', async (req, res) => { 
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


router.get('/students', async (req, res) => {
    try {
        // Fetch only users with role "student"
        const students = await User.find({ role: 'student' });
        res.json(students);
    } catch (error) {
        console.error('Failed to fetch students:', error);
        res.status(500).send('Error fetching students');
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
        //Generate token with user id, role, email + courses
        const token = jwt.sign({
            userId: user._id, role: user.role, email: user.email, courses: user.courses
        }, // Including role in payload 
            process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token }); //Send token to client
    } catch (error) {
        res.status(400).json({ error: error.message });
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



export default router;