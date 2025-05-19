import React, { useEffect, useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useDispatch, useSelector } from "react-redux";
import { SET_ERRORS } from "../../../redux/actionTypes";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import AttendancePieChart from "./AttendancePieChart";

const Body = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [sortedAttendance, setSortedAttendance] = useState([]);
  const [sortAsc, setSortAsc] = useState(true); // Toggle for sorting

  const attendance = useSelector((state) => state.student.attendance.result);
  const subjects = useSelector((state) => state.admin.subjects.result);
  const store = useSelector((state) => state);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  useEffect(() => {
    if (subjects?.length !== 0) setLoading(false);
  }, [subjects]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  useEffect(() => {
    setSortedAttendance(attendance); // Set initially
  }, [attendance]);

  const handleSortByPercentage = () => {
    const sorted = [...sortedAttendance].sort((a, b) =>
      sortAsc ? a.percentage - b.percentage : b.percentage - a.percentage
    );
    setSortedAttendance(sorted);
    setSortAsc(!sortAsc);
  };

  return (
    <div className="flex-[0.8] mt-3">
      <div className="space-y-5">
        <div className="flex text-gray-400 items-center space-x-2">
          <MenuBookIcon />
          <h1>All Subjects</h1>
        </div>

        <div className="flex justify-end mr-10">
          <button
            onClick={handleSortByPercentage}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Sort by % ({sortAsc ? "Low → High" : "High → Low"})
          </button>
        </div>

        <div className="mr-10 bg-white rounded-xl pt-6 pl-6 h-[29.5rem] overflow-y-auto">
          <div className="col-span-3 mr-6">
            <div className={classes.loadingAndError}>
              {loading && (
                <Spinner
                  message="Loading"
                  height={50}
                  width={150}
                  color="#111111"
                  messageColor="blue"
                />
              )}
              {error.noSubjectError && (
                <p className="text-red-500 text-2xl font-bold">
                  {error.noSubjectError}
                </p>
              )}
            </div>

            {!loading &&
              Object.keys(error).length === 0 &&
              subjects?.length !== 0 && (
                <>
                  {/* Attendance Table */}
                  <div className={classes.adminData}>
                    <div className="grid grid-cols-8">
                      <h1 className={`${classes.adminDataHeading} col-span-1`}>
                        Sr no.
                      </h1>
                      <h1 className={`${classes.adminDataHeading} col-span-1`}>
                        Subject Code
                      </h1>
                      <h1 className={`${classes.adminDataHeading} col-span-2`}>
                        Subject Name
                      </h1>
                      <h1 className={`${classes.adminDataHeading} col-span-2`}>
                        Attended
                      </h1>
                      <h1 className={`${classes.adminDataHeading} col-span-1`}>
                        Total
                      </h1>
                      <h1 className={`${classes.adminDataHeading} col-span-1`}>
                        Percentage
                      </h1>
                    </div>
                    {sortedAttendance?.map((res, idx) => (
                      <div
                        key={idx}
                        className={`${classes.adminDataBody} grid grid-cols-8`}
                      >
                        <h1
                          className={`col-span-1 ${classes.adminDataBodyFields}`}
                        >
                          {idx + 1}
                        </h1>
                        <h1
                          className={`col-span-1 ${classes.adminDataBodyFields}`}
                        >
                          {res.subjectCode}
                        </h1>
                        <h1
                          className={`col-span-2 ${classes.adminDataBodyFields}`}
                        >
                          {res.subjectName}
                        </h1>
                        <h1
                          className={`col-span-2 ${classes.adminDataBodyFields}`}
                        >
                          {res.attended}
                        </h1>
                        <h1
                          className={`col-span-1 ${classes.adminDataBodyFields}`}
                        >
                          {res.total}
                        </h1>
                        <h1
                          className={`col-span-1 ${classes.adminDataBodyFields}`}
                        >
                          {res.percentage}%
                        </h1>
                      </div>
                    ))}
                  </div>

                  {/* Attendance Pie Chart */}
                  <div className="flex justify-center items-center mt-6">
                    <div className="w-full max-w-[600px] h-[400px]">
                      <AttendancePieChart attendance={attendance} />
                    </div>
                  </div>
                </>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
