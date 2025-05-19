import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import EngineeringIcon from "@mui/icons-material/Engineering";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

const Sidebar = () => {
  const [user] = useState(JSON.parse(localStorage.getItem("user")));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    alert("OOPS! Your session expired. Please Login again");
    dispatch({ type: "LOGOUT" });
    navigate("/login/studentlogin");
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
  }, [navigate]);

  const linkClasses = ({ isActive }) =>
    `flex items-center px-5 py-3 gap-4 rounded-md transition-all font-medium ${
      isActive
        ? "bg-blue-100 text-blue-600 shadow dark:bg-gray-700"
        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
    }`;

  return (
    <aside className="flex-[0.2] min-h-full bg-white dark:bg-[#1e1e2f] px-3 py-6 shadow-md rounded-l-2xl">
      <nav className="space-y-6">
        <div className="space-y-2">
          <NavLink to="/student/home" className={linkClasses}>
            <HomeIcon />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/student/profile" className={linkClasses}>
            <AssignmentIndIcon />
            <span>Profile</span>
          </NavLink>
        </div>

        <div className="space-y-2">
          <NavLink to="/student/testresult" className={linkClasses}>
            <AddIcon />
            <span>Test Results</span>
          </NavLink>
          <NavLink to="/student/attendance" className={linkClasses}>
            <AddIcon />
            <span>Attendance</span>
          </NavLink>
        </div>

        <div className="space-y-2">
          <NavLink to="/student/subjectlist" className={linkClasses}>
            <EngineeringIcon />
            <span>Subject List</span>
          </NavLink>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
