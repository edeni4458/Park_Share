const User = require('../models/User');
const bycrpt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Reg a new user

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    
    // See if User is in the system
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'User already exists'});
    }

    const user =  await User.create({ name, email, password});
    res.status(201).json({ 
        _id:user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
    });
};

// Login the new user

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.staus(401).json({ message: 'Invalid Credentials '})
    }
};

//  Create JWT token

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '90d'});
};

module.exports = { registerUser, loginUser}