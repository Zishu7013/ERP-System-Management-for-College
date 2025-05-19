import React, { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import Calendar from "react-calendar";
import EngineeringIcon from "@mui/icons-material/Engineering";
import BoyIcon from "@mui/icons-material/Boy";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ShowNotice from "../notices/ShowNotice";
import { useSelector } from "react-redux";
import ReplyIcon from "@mui/icons-material/Reply";
import Notice from "../notices/Notice";
import "./ModernCalendar.css"; // ✅ Custom styles import

const Body = () => {
  const [open, setOpen] = useState(false);
  const [openNotice, setOpenNotice] = useState({});
  const notices = useSelector((state) => state.admin.notices.result);
  const testResult = useSelector((state) => state.student.testResult.result);
  const attendance = useSelector((state) => state.student.attendance.result);
  const user = JSON.parse(localStorage.getItem("user"));
  const subjects = useSelector((state) => state.admin.subjects.result);
  const [value, onChange] = useState(new Date());

  let totalAttendance = 0;
  attendance?.map((att) => (totalAttendance += att.attended));

  return (
    <div className="flex-[0.8] mt-3 px-4">
      <div className="space-y-5">
        <div className="flex text-gray-500 items-center space-x-2 text-lg font-semibold">
          <HomeIcon />
          <h1>Dashboard</h1>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-yellow-200 to-yellow-400 p-5 rounded-xl shadow-md flex items-center space-x-4">
            <EngineeringIcon sx={{ fontSize: 40 }} />
            <div>
              <h2 className="text-gray-700">Subjects</h2>
              <p className="text-2xl font-bold">{subjects?.length}</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-pink-200 to-pink-400 p-5 rounded-xl shadow-md flex items-center space-x-4">
            <BoyIcon sx={{ fontSize: 40 }} />
            <div>
              <h2 className="text-gray-700">Tests</h2>
              <p className="text-2xl font-bold">{testResult?.length}</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-200 to-blue-400 p-5 rounded-xl shadow-md flex items-center space-x-4">
            <SupervisorAccountIcon sx={{ fontSize: 40 }} />
            <div>
              <h2 className="text-gray-700">Attendance</h2>
              <p className="text-2xl font-bold">{totalAttendance}</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-200 to-green-400 p-5 rounded-xl shadow-md flex items-center space-x-4">
            <MenuBookIcon sx={{ fontSize: 40 }} />
            <div>
              <h2 className="text-gray-700">Year</h2>
              <p className="text-2xl font-bold">{user.result.year}</p>
            </div>
          </div>
        </div>

        {/* Calendar & Notices */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Calendar */}
          <div className="md:w-1/3 bg-white rounded-xl shadow-md p-5 overflow-y-auto max-h-[24rem]">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">Calendar</h2>
            <Calendar
              onChange={onChange}
              value={value}
              className="modern-calendar"
              calendarType="US"
              locale="en-US"
            />
          </div>

          {/* Notices */}
          <div className="bg-white w-full rounded-xl shadow-md p-5 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              {open && (
                <ReplyIcon
                  onClick={() => setOpen(false)}
                  className="cursor-pointer text-gray-600"
                />
              )}
              <h1 className="text-xl font-semibold text-center w-full">
                Notices
              </h1>
            </div>
            <div className="overflow-y-auto h-64 space-y-3">
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
                    <Notice idx={idx} notice={notice} notFor="faculty" />
                  </div>
                ))
              ) : (
                <ShowNotice notice={openNotice} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
