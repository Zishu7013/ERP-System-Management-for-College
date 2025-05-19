import React from "react";
import * as classes from "../../../utils/styles";

const Data = ({ label, value }) => {
  return (
    <div className="flex flex-col">
      <span className="text-sm text-gray-500 dark:text-gray-300 font-medium">
        {label}
      </span>
      <div className="text-base text-gray-800 dark:text-white bg-gray-100 dark:bg-[#2a2a3b] px-4 py-2 rounded-lg shadow-sm transition-colors duration-300">
        {value}
      </div>
    </div>
  );
};

export default Data;
