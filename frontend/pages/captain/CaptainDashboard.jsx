import React from 'react';

const CaptainDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-white">
      <div className="bg-white/90 rounded-3xl shadow-2xl p-10 max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold mb-4 text-black">Captain Dashboard</h1>
        <p className="text-gray-700 mb-8">
          Welcome, Captain! Here you can view and manage your rides.
        </p>
        <button className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition">
          Go Online
        </button>
      </div>
    </div>
  );
};

export default CaptainDashboard;