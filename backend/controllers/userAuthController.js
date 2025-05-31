import User from "../../models/User";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

export const blacklistedTokens = new Set();

export const registerUser = async (req, res) => {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({ errors:errors.array() });
    }
    try{
    const {name,email,password}=req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({email});
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword=await bcrypt.hash(password,10)
    const newUser = new User({
        name,
        email,
        password:hashedPassword
    })
    await newUser.save()
    const token=jwt.sign({_id:newUser._id},process.env.JWT_SECRET,{expiresIn:'1d'});

    res.status(201).json({
        message:'User registered Successfully',
        user:{
            id:newUser._id,
            name: newUser.name,
            email: newUser.email,
        },
        token
    })

    }catch(err){
        console.error('Register Error:', err.message);
        res.status(500).json({ message: 'Server Error' });
    }
}

export const loginUser = async (req, res) => {
   const errors=validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({ errors:errors.array() });
    }
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });

  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

export const logoutUser = (req, res) => {
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


export const userAuthMiddleware=async(req, res, next) =>{
  const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');

  if (!token) return res.status(401).json({ message: 'Access denied. No token.' });

  if (blacklistedTokens.has(token)) {
    return res.status(401).json({ message: 'Token is blacklisted. Please login again.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; 
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
}

