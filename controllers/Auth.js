const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'patient',
        });

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.status(201).json({
            message: 'User registered successfully',
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                accessToken: token,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'User logged in successfully',
            data: {
                accessToken: token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            },
        });
    } catch (error) {
        console.error("🚀 ~ exports.login= ~ error:", error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};