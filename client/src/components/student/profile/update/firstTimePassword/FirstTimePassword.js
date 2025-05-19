import React from "react";
import Header from "../../../../student/Header";
import Body from "./Body";

const FirstTimePassword = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#d6d9e0] to-[#f4f6fa] flex items-center justify-center p-4">
      <div className="flex flex-col bg-white rounded-3xl shadow-xl w-full max-w-md space-y-6 p-6">
        <Header />
        <Body />
      </div>
    </div>
  );
};

export default FirstTimePassword;
