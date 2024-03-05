import express from "express";
import { User } from "../models/userModel.js";
const router = express.Router();

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

router.post('/', async (req, res) => {
    try {
        const newUser = new User({
            email:req.body.email,
            password:req.body.password,
            role:req.body.role
        });

        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
        console.log('User registered successfully');
    } catch (error) {
        res.status(400).json(error);
        console.log('User registration failed');
    }
});

// put method... update a user


export default router;