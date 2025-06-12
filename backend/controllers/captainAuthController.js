import Captain from '../models/Captain.js';
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

export const blacklistedTokens = new Set();

export const registerCaptain = async (req, res) => {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({ errors:errors.array() });
    }
    try{
    const {name,email,password,status,vehicle}=req.body;
    if (!name || !email || !password || !status || !vehicle) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const existingCaptain = await Captain.findOne({email});
    if (existingCaptain) {
        return res.status(400).json({ message: "Captain already exists" });
    }
    const hashedPassword=await bcrypt.hash(password,10)
    const newCaptain = new Captain({
        name,
        email,
        password:hashedPassword,
        status,
        vehicle: {
            model: vehicle.model,
            color: vehicle.color,
            plate: vehicle.plate,
            vehicleType: vehicle.vehicleType
        },
    })
    await newCaptain.save()
    const token=jwt.sign({_id:newCaptain._id},process.env.JWT_SECRET,{expiresIn:'1d'});

    res.status(201).json({
        message:'Captain registered Successfully',
        captain:{
            id:newCaptain._id,
            name: newCaptain.name,
            email: newCaptain.email,
            status: newCaptain.status,
            vehicle: newCaptain.vehicle
        },
        token
    })

    }catch(err){
        console.error('Register Error:', err.message);
        res.status(500).json({ message: 'Server Error' });
    }
}

export const loginCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const captain = await Captain.findOne({ email });
    if (!captain) {
      return res.status(404).json({ message: 'Captain not found' });
    }

    const isMatch = await bcrypt.compare(password, captain.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: captain._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({
      message: 'Login successful',
      captain: {
        id: captain._id,
        name: captain.name,
        email: captain.email,
        status: captain.status,
        vehicle: captain.vehicle,
      },
      token,
    });

  } catch (error) {
    console.error('Captain login error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

export const logoutCaptain = (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(400).json({ message: 'No token found' });

  blacklistedTokens.add(token);
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful' });

  const decoded = jwt.decode(token);
  const expiry = decoded.exp * 1000;
  const now = Date.now();
  const delay = expiry - now;

  if (delay > 0) {
    setTimeout(() => {
      blacklistedTokens.delete(token);
    }, delay);
  }
};

export const authCaptainMiddleware = async (req, res, next) => {
  const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');

  if (!token) return res.status(401).json({ message: 'Access denied. No token.' });

  if (blacklistedTokens.has(token)) {
    return res.status(401).json({ message: 'Token is blacklisted. Please login again.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const captain = await Captain.findById(decoded.id);
    if (!captain) {
      return res.status(404).json({ message: 'Captain not found' });
    }

    req.captain = captain; 
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};
