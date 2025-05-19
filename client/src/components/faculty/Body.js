import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import Calendar from "react-calendar";
import EngineeringIcon from "@mui/icons-material/Engineering";
import BoyIcon from "@mui/icons-material/Boy";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import "react-calendar/dist/Calendar.css";
import { useSelector } from "react-redux";
import Notice from "../notices/Notice";
import ReplyIcon from "@mui/icons-material/Reply";
import ShowNotice from "../notices/ShowNotice";

const Body = () => {
  const [value, onChange] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [openNotice, setOpenNotice] = useState({});
  const notices = useSelector((state) => state.admin.notices.result);

  return (
    <div className="flex-1 p-4 overflow-y-auto dark:bg-gray-950">
      {/* Header Section */}
      <div className="flex items-center text-gray-500 dark:text-gray-300 space-x-2 mb-4">
        <HomeIcon />
        <h1 className="font-medium">Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Card icon={<EngineeringIcon />} title="Class" count="12" />
        <Card icon={<BoyIcon />} title="Student" count="10" />
        <Card icon={<SupervisorAccountIcon />} title="Subject" count="5" />
        <Card icon={<MenuBookIcon />} title="Test" count="3" />
      </div>

      {/* Calendar and Notice */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Calendar */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-3 w-full lg:w-1/3">
          <Calendar
            onChange={onChange}
            value={value}
            className="!border-none dark:bg-gray-800 dark:text-white rounded-xl p-2"
          />
        </div>

        {/* Notices */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-4 w-full lg:w-2/3">
          <div className="flex items-center mb-2">
            {open && (
              <ReplyIcon
                onClick={() => setOpen(false)}
                className="cursor-pointer mr-2 hover:text-blue-600"
              />
            )}
            <h1 className="font-bold text-xl w-full text-center text-gray-800 dark:text-white">
              Notices
            </h1>
          </div>

          <div className="h-[12rem] overflow-y-auto space-y-3 px-1">
            {!open ? (
              notices?.map((notice, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setOpen(true);
                    setOpenNotice(notice);
                  }}
                  className="cursor-pointer"
                >
                  <Notice idx={idx} notice={notice} notFor="student" />
                </div>
              ))
            ) : (
              <ShowNotice notice={openNotice} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Card component
const Card = ({ icon, title, count }) => (
  <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md flex items-center justify-start p-4 space-x-4">
    <div className="bg-orange-300 p-2 rounded-full">{icon}</div>
    <div>
      <h2 className="text-sm text-gray-500 dark:text-gray-300">{title}</h2>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{count}</h1>
    </div>
  </div>
);

export default Body;
