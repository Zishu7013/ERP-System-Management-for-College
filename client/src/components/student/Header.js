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
    navigate("/login/studentlogin");
  };

  return (
    <div className="flex-[0.05] flex justify-between items-center px-5 py-2 bg-white dark:bg-gray-900 dark:text-white shadow-sm rounded-t-2xl">
      <h1 className="font-bold text-blue-600 text-sm">JRS Institute</h1>

      <h1 className="font-semibold hidden sm:block">
        Welcome, {user.result.name.split(" ")[0]}
      </h1>

      <div className="flex items-center space-x-3">
        <button onClick={toggleDarkMode} className="text-xl hover:scale-110">
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </button>

        <Avatar
          src={user.result.avatar}
          alt={user.result.name.charAt(0)}
          sx={{ width: 28, height: 28 }}
          className="border-blue-600 border-2"
        />
        <h1 className="hidden sm:block">{user.result.name.split(" ")[0]}</h1>

        <LogoutIcon
          onClick={logout}
          className="cursor-pointer hover:scale-125 transition-all"
        />
      </div>
    </div>
  );
};

export default Header;
