import React, { useState } from 'react';
import { FaCarSide } from 'react-icons/fa';
import { data, Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const UserRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate()

  const handleRegister =async (e) => {
    e.preventDefault();
    try{
      const response=await axios.post('http://localhost:4000/api/users/register',{
        name,
        email,
        password
      });
      console.log('User registered Successfully')
      navigate('/user-login')
      localStorage.setItem('token',response.data.token)
    }catch(e){
      console.log('registration error',e)
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-white">
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg
          viewBox="0 0 1440 320"
          className="absolute bottom-0 left-0 w-full h-40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#111"
            fillOpacity="1"
            d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,229.3C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
          {/* Road line */}
          <rect x="700" y="260" width="40" height="60" rx="20" fill="#fff" opacity="0.2" />
          <rect x="800" y="270" width="40" height="40" rx="20" fill="#fff" opacity="0.2" />
        </svg>
      </div>
      <div className="relative z-10 w-full max-w-xl bg-white/90 p-12 rounded-3xl shadow-2xl border border-gray-200 min-h-[600px] flex flex-col justify-center">
        <div className="flex justify-center mb-6 text-black">
          <FaCarSide size={48} />
        </div>
        <h2 className="text-3xl font-bold text-black mb-6 text-center">User Registration</h2>
        <form className="space-y-6" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Name"
            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white/80"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white/80"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white/80"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <Link to="/user-login" className="text-black font-medium underline hover:text-gray-800">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserRegister;
