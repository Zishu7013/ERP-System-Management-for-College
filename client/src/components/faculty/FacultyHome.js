import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getNotice } from "../../redux/actions/adminActions";
import Body from "./Body";
import Header from "./Header";
import Sidebar from "./Sidebar";

const FacultyHome = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotice());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-950 flex items-center justify-center p-4">
      <div className="flex flex-col bg-white dark:bg-gray-900 h-full w-full max-w-[1600px] rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <Header />

        {/* Sidebar + Body */}
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <Body />
        </div>
      </div>
    </div>
  );
};

export default FacultyHome;
