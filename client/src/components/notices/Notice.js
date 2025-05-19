import React from "react";

const Notice = ({ idx, notice, notFor }) => {
  if (notFor === notice.noticeFor) return null;

  return (
    <div className="flex items-start gap-4 p-4 bg-white dark:bg-slate-800 shadow-sm rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all cursor-pointer">
      <span className="text-xl text-gray-600 dark:text-gray-300">⚫</span>
      <div className="flex flex-col overflow-hidden">
        <h1 className="font-semibold text-md text-gray-800 dark:text-white truncate w-[18rem]">
          {notice.topic}
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 truncate w-[28rem]">
          {notice.content}
        </p>
      </div>
    </div>
  );
};

export default Notice;
