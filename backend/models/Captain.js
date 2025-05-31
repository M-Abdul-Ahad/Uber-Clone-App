import mongoose, { model } from "mongoose";

const captainSchema=new mongoose.Schema({
    name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  socketId: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    required: true,
    enum: ['active', 'inactive'], 
    default: 'inactive',
  },
  vehicle:{
    model: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    plate: {
      type: String,
      required: true,
      unique: true,
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ['car', 'bike', 'truck'], 
    },    
  },
  location:{
    lat: {
      type: Number,
      
    },
    lng: {
      type: Number,
      
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  
})

const Captain = mongoose.model("Captain", captainSchema);
export default Captain;