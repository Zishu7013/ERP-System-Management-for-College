import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSubject } from "../../../redux/actions/studentActions";

import Header from "../Header";
import Sidebar from "../Sidebar";
import Body from "./Body";

const SubjectList = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubject(user.result.department, user.result.year));
  }, [dispatch, user.result.department, user.result.year]);

  return (
    <div className="bg-[#d6d9e0] min-h-screen flex items-center justify-center px-4 py-6">
      <div className="flex flex-col bg-[#f4f6fa] rounded-2xl shadow-2xl h-[90vh] w-full max-w-7xl space-y-6 overflow-hidden">
        <Header />
        <div className="flex flex-1 overflow-hidden rounded-b-2xl">
          <Sidebar />
          <Body />
        </div>
      </div>
    </div>
  );
};

export default SubjectList;
