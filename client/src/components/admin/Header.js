import React from "react";
import { Avatar } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login/adminLogin");
  };

  return (
    <div className="flex-[0.05] flex justify-between items-center mx-5 my-2">
      {/* Logo and title */}
      <div className="flex items-center space-x-2">
        {/* Simple cool logo as a colored circle with initials */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg select-none">
          JRS
        </div>
        <h1 className="font-bold text-blue-700 text-lg">JRS Institute</h1>
      </div>

      <h1 className="font-semibold text-black">Welcome</h1>

      <div className="flex items-center space-x-3">
        <Avatar
          src={user.result.avatar}
          alt={user.result.name.charAt(0)}
          sx={{ width: 24, height: 24 }}
          className="border-blue-600 border-2"
        />
        <h1>{user.result.name.split(" ")[0]}</h1>
        <LogoutIcon
          onClick={logout}
          className="cursor-pointer hover:scale-125 transition-all "
        />
      </div>
    </div>
  );
};

export default Header;
