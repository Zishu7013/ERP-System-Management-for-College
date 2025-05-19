import React from "react";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SecurityUpdateIcon from "@mui/icons-material/SecurityUpdate";
import { Avatar } from "@mui/material";
import Data from "./Data";
import { useNavigate } from "react-router-dom";

const Body = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  return (
    <div className="flex-1 p-6 overflow-auto bg-gray-100 dark:bg-[#121212] text-gray-900 dark:text-white transition-colors duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-300">
          <AssignmentIndIcon />
          <h1 className="text-xl font-semibold">Profile</h1>
        </div>
        <div
          onClick={() => navigate("/student/update")}
          className="flex items-center space-x-2 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <SecurityUpdateIcon />
          <h1 className="font-bold">Update</h1>
        </div>
      </div>

      <div className="relative bg-white dark:bg-[#1e1e2f] text-gray-800 dark:text-white rounded-2xl shadow-xl pt-14 pb-10 px-6 transition-colors duration-300">
        <div className="absolute inset-x-0 top-[-35px] flex justify-center">
          <Avatar src={user.result.avatar} sx={{ width: 80, height: 80 }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6">
          <div className="flex flex-col space-y-6">
            <Data label="Name" value={user.result.name} />
            <Data label="Email" value={user.result.email} />
            <Data label="Username" value={user.result.username} />
            <Data label="Department" value={user.result.department} />
            <Data label="Father's Name" value={user.result.fatherName} />
            <Data label="Mother's Name" value={user.result.motherName} />
          </div>

          <div className="flex flex-col space-y-6">
            <Data label="DOB" value={user.result.dob} />
            <Data label="Year" value={user.result.year} />
            <Data label="Contact Number" value={user.result.contactNumber} />
            <Data label="Section" value={user.result.section} />
            <Data
              label="Father's Contact Number"
              value={user.result.fatherContactNumber}
            />
            <Data label="Batch" value={user.result.batch} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
