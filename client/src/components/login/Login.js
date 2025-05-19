import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div
      className="h-screen w-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1658235081452-c2ded30b8d9f?q=80&w=2014&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-0"></div>

      {/* Main Container */}
      <div className="z-10 text-white px-4 md:px-10 w-full max-w-5xl">
        {/* Logo & Heading */}
        <div className="flex flex-col items-center mb-12 backdrop-blur-md bg-white/10 px-6 py-4 rounded-xl shadow-lg space-y-3">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
            alt="Institute Logo"
            className="w-16 h-16"
          />
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            JRS Institute of Technology
          </h1>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Faculty Card */}
          <div className="backdrop-blur-lg bg-white/10 p-8 rounded-2xl shadow-lg hover:scale-105 transform transition duration-300">
            <h2 className="text-2xl font-semibold text-center mb-6">Faculty</h2>
            <div className="flex justify-center">
              <Link
                to="/login/facultylogin"
                className="bg-gradient-to-r from-indigo-500 to-blue-500 px-6 py-2 rounded-full text-white text-lg font-medium shadow-md hover:shadow-xl transition"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Student Card */}
          <div className="backdrop-blur-lg bg-white/10 p-8 rounded-2xl shadow-lg hover:scale-105 transform transition duration-300">
            <h2 className="text-2xl font-semibold text-center mb-6">Student</h2>
            <div className="flex justify-center">
              <Link
                to="/login/studentlogin"
                className="bg-gradient-to-r from-pink-500 to-red-500 px-6 py-2 rounded-full text-white text-lg font-medium shadow-md hover:shadow-xl transition"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
