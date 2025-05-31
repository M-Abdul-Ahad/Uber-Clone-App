import { loginCaptain,logoutCaptain,registerCaptain,authCaptainMiddleware } from "../controllers/captainAuthController";
import express from 'express';
import { body } from 'express-validator';
import Captain from '../models/Captain.js';
const router = express.Router();    
router.post('/register', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('status').notEmpty().withMessage('Status is required'),
  body('vehicle.model').notEmpty().withMessage('Vehicle model is required'),
  body('vehicle.color').notEmpty().withMessage('Vehicle color is required'),
  body('vehicle.plate').notEmpty().withMessage('Vehicle plate is required'),
  body('vehicle.vehicleType').notEmpty().withMessage('Vehicle type is required')
], registerCaptain);       
router.post('/login', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
], loginCaptain);
router.post('/logout', logoutCaptain);
router.get('/profile', authCaptainMiddleware, async (req, res) => {
  try {
    const captain = await Captain.findById(req.captain._id).select('-password');
    if (!captain) return res.status(404).json({ message: 'Captain not found' });
    res.json(captain);
    } catch (err) {
    console.error('Profile error:', err.message);
    res.status(500).json({ message: 'Server error' });
    }
}
);

export default router;
   
