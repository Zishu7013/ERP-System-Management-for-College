import React, { useState, useEffect } from "react";
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

  if (!user) {
    return null; // In case user data is missing
  }

  return (
    <div className="w-full flex justify-between items-center p-4 bg-white dark:bg-gray-900 shadow-md dark:text-white">
      <div className="text-blue-600 font-bold text-lg">JRS Institute</div>

      <div className="text-sm sm:text-base font-semibold">
        Welcome, {user?.result?.name?.split(" ")[0]}
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={toggleDarkMode}
          className="text-xl hover:scale-110 transition-transform"
        >
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </button>

        <Avatar
          src={user.result.avatar}
          alt={user.result.name.charAt(0)}
          sx={{ width: 32, height: 32 }}
          className="border-blue-600 border-2"
        />
        <span className="hidden sm:block text-sm font-medium">
          {user?.result?.name?.split(" ")[0]}
        </span>

        <LogoutIcon
          onClick={logout}
          className="cursor-pointer hover:scale-125 transition-transform"
        />
      </div>
    </div>
  );
};

export default Header;
