import React from 'react';

const UserHome = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-white">
      <div className="bg-white/90 rounded-3xl shadow-2xl p-10 max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold mb-4 text-black">Welcome, User!</h1>
        <p className="text-gray-700 mb-8">
          Book your next ride quickly and easily.
        </p>
        <button className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition">
          Book a Ride
        </button>
      </div>
    </div>
  );
};

export default UserHome;