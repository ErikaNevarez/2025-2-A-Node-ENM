import express from 'express'; 
import {body} from 'express-validator';
import {register, login} from '../controllers/authController.js';
import {register, login } from '../controllers/authController.js';
import validate from '../middlewares/validation.js';

const router =express.Router (); 

router.post('/register', [
    body('displayName')
    .notEmpty().withMessage('displayName is required')
    .isAlphanumeric().withMessage('displayName must contain only letters and numbers'),
    body('email')
    .notEmpty().withMessage('email is required')
    .isEmail().withMessage('Valid email is required'),
    body('password')
    .isLength({min:6}).withMessage('Password must be at least 6 characters')
    .matches(/\d/).withMessage('Password must contain at least one number')
], validate,  register);
router.post('/login', login);

export default router; 