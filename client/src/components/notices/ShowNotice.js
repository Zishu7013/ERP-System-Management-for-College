import React from "react";

const ShowNotice = ({ notice }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md space-y-4 max-w-3xl mx-auto">
      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
        <p>
          <span className="font-bold">From: </span>
          {notice.from}
        </p>
        <p>{notice.date}</p>
      </div>

      <h1 className="text-center font-bold text-lg text-gray-800 dark:text-white">
        {notice.topic}
      </h1>

      <p className="text-gray-700 dark:text-gray-200 leading-relaxed max-h-[10rem] overflow-y-auto">
        {notice.content}
      </p>
    </div>
  );
};

export default ShowNotice;
