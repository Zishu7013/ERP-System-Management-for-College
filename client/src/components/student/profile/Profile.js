import React from "react";
import Body from "./Body";
import Header from "../Header";
import Sidebar from "../Sidebar";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0e7ff] to-[#f8fafc] py-5 px-3">
      <div className="max-w-[1300px] mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        <Header />
        <div className="flex">
          <Sidebar />
          <Body />
        </div>
      </div>
    </div>
  );
};

export default Profile;
