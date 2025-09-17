//aqui se crea un usuario

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import errorHandler from '../middlewares/errorHandler.js';

const generateToken = (userId, displayName, role) => {
  return jwt.sign({ userId, displayName, role },
    process.env.JWT_SECRET,
    { expiresIn: '1h', }
  )
}

const generatePassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

const checkUserExist = async (email) => {
  const user = await User.findOne({ email });
  return user;
}

async function register(req, res) {
  try {
    const { displayName, email, password, phone } = req.body;
    const userExist = await checkUserExist(email);
    if (userExist) {
      return res.status(400).json({ message: 'User already exist' });
    }
    let role = 'guest';
    const hashPassword = await generatePassword(password);
    const newUser = new User({
      displayName,
      email,
      hashPassword,
      role,
      phone
    });
    await newUser.save();
    res.status(201).json({ displayName, email, phone });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const userExist = await checkUserExist(email);
    if (!userExist) {
      return res.status(400).json({ message: 'User does not exist. You must to sign in' });
    }
    const isMatch = await bcrypt.compare(password, userExist.hashPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = generateToken(userExist._id, userExist.displayName, userExist.role);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
}

export { register, login };


