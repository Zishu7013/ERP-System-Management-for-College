import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newMode);
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login/facultylogin");
  };

  if (!user || !user.result) {
    return null;
  }

  const fullName = user.result.name?.trim() || "Faculty";

  return (
    <div className="w-full flex justify-between items-center p-4 bg-white dark:bg-gray-900 shadow-md rounded-b-xl">
      {/* Logo & Institute Name */}
      <div className="flex items-center gap-3">
        {/* Custom colorful circular logo */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg select-none">
          JRS
        </div>
        <span className="text-xl font-bold text-blue-700">JRS Institute</span>
      </div>

      {/* Welcome Message */}
      <div className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">
        Welcome, {fullName}
      </div>

      {/* Dark Mode, Avatar & Logout */}
      <div className="flex items-center gap-4">
        <button onClick={toggleDarkMode} title="Toggle Theme">
          {darkMode ? (
            <LightModeIcon className="text-yellow-400" />
          ) : (
            <DarkModeIcon className="text-gray-700" />
          )}
        </button>

        <Avatar
          src={user.result.avatar || ""}
          alt={fullName.charAt(0)}
          sx={{ width: 36, height: 36 }}
          className="border-2 border-blue-600"
        />

        <LogoutIcon
          onClick={logout}
          className="cursor-pointer text-red-600 hover:scale-110 transition-transform"
        />
      </div>
    </div>
  );
};

export default Header;
