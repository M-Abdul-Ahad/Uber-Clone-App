import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="fixed inset-0 text-white overflow-hidden">
      {/* Hero Section */}
      <section
        className="relative w-full h-full min-h-0 flex flex-col items-center justify-start bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(135deg, #000 60%, #fff 100%)`
        }}
      >
        {/* Subtle overlay for contrast */}
        <div className="absolute inset-0 bg-black bg-opacity-60" />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 mt-20">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">Book Your Ride Instantly</h1>
          <p className="text-base md:text-lg text-gray-300 mb-4">Fast. Reliable. Safe. Anytime, anywhere.</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-4">
            <Link
              to="/user-register"
              className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
            >
              Start as User
            </Link>
            <Link
              to="/captain-register"
              className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-black transition"
            >
              Start as Captain
            </Link>
          </div>
        </div>

        {/* Spacer to push features to bottom */}
        <div className="flex-1" />

        {/* Features Section */}
        <section className="relative z-10 w-full max-w-6xl mx-auto text-center mb-4">
          <div className="grid md:grid-cols-3 gap-4 px-2">
            <div className="bg-white text-black rounded-xl p-4 shadow hover:shadow-xl transition">
              <h3 className="font-bold text-lg mb-1">Quick Booking</h3>
              <p className="text-sm">Book your ride in seconds with our user-friendly interface.</p>
            </div>
            <div className="bg-white text-black rounded-xl p-4 shadow hover:shadow-xl transition">
              <h3 className="font-bold text-lg mb-1">Verified Captains</h3>
              <p className="text-sm">All our drivers are background-checked and trained for safety.</p>
            </div>
            <div className="bg-white text-black rounded-xl p-4 shadow hover:shadow-xl transition">
              <h3 className="font-bold text-lg mb-1">24/7 Support</h3>
              <p className="text-sm">We're here to help, anytime you need us.</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 w-full text-center py-3 text-gray-400 text-xs border-t border-gray-800 bg-black bg-opacity-80">
          &copy; {new Date().getFullYear()} RideBooker Inc. All rights reserved.
        </footer>
      </section>
    </div>
  );
};

export default Home;
