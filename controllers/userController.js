const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret ="sskrishna"


exports.loginUser = async (req, res) => {
    try {
        const { gmail, name, password } = req.body;

        if ((!gmail && !name) || !password) {
            return res.status(400).json({ error: 'Please provide either Gmail or Name along with Password' });
        }

        const user = await User.findOne(
            gmail ? { gmail } : { name }
        );

        if (!user) {
            return res.status(400).json({ error: 'User not found with provided credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        // Generate token
        const token = jwt.sign(
            { id: user._id, gmail: user.gmail },
            secret, 
            { expiresIn: '5m' }
        );

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                gmail: user.gmail,
                name: user.name,
                sport:user.sport,
                age:user.age
            },
            token
        });

    } catch (err) {
        res.status(500).json({ error: 'Login failed', details: err.message });
    }
};
exports.registerUser = async (req, res) => {
    try {
        const { name, age, gmail, password, sport } = req.body;
        const existingUser = await User.findOne({ gmail });
        if (existingUser) {
            return res.status(400).json({ error: 'Gmail already registered' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            name,
            age,
            gmail,
            password: hashedPassword,
            sport
        });
        const savedUser = await newUser.save();
        res.status(201).json({ message: 'User registered successfully', user: savedUser });
    } catch (err) {
        res.status(500).json({ error: 'Registration failed', details: err.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};
