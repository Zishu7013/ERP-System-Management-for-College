import React, { useEffect, useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../utils/Spinner";
import { SET_ERRORS } from "../../../redux/actionTypes";
import * as classes from "../../../utils/styles";

const Body = () => {
  const dispatch = useDispatch();
  const testResult = useSelector((state) => state.student.testResult.result);
  const subjects = useSelector((state) => state.admin.subjects.result);
  const store = useSelector((state) => state);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  useEffect(() => {
    if (subjects?.length !== 0) setLoading(false);
  }, [subjects]);

  // Filter test results by subject name based on search term
  const filteredResults = testResult?.filter((res) =>
    res.subjectName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-[0.8] mt-6 px-6 flex flex-col h-full">
      <div className="space-y-6 flex-grow flex flex-col">
        {/* Header */}
        <div className="flex items-center space-x-2 text-gray-700">
          <MenuBookIcon fontSize="large" />
          <h1 className="text-2xl font-semibold tracking-wide">Test Results</h1>
        </div>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by Subject Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-2xl shadow-lg p-6 overflow-auto flex-grow max-h-[calc(100vh-250px)]">
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <Spinner
                message="Loading"
                height={50}
                width={150}
                color="#111"
                messageColor="#2563eb"
              />
            </div>
          ) : error.noSubjectError ? (
            <p className="text-red-600 text-xl font-bold text-center mt-10">
              {error.noSubjectError}
            </p>
          ) : !filteredResults || filteredResults.length === 0 ? (
            <p className="text-gray-500 text-center mt-10 text-lg">
              No test results found.
            </p>
          ) : (
            <div className="min-w-full">
              {/* Table Header */}
              <div className="grid grid-cols-8 gap-x-4 border-b border-gray-300 pb-2 sticky top-0 bg-white z-10">
                <h1 className={`${classes.adminDataHeading} col-span-1`}>Sr no.</h1>
                <h1 className={`${classes.adminDataHeading} col-span-1`}>Subject Code</h1>
                <h1 className={`${classes.adminDataHeading} col-span-2`}>Subject Name</h1>
                <h1 className={`${classes.adminDataHeading} col-span-2`}>Test</h1>
                <h1 className={`${classes.adminDataHeading} col-span-1`}>Marks Obtained</h1>
                <h1 className={`${classes.adminDataHeading} col-span-1`}>Total Marks</h1>
              </div>

              {/* Table Rows */}
              {filteredResults.map((res, idx) => (
                <div
                  key={idx}
                  className={`${classes.adminDataBody} grid grid-cols-8 gap-x-4 hover:bg-gray-50 transition-colors rounded-md cursor-pointer`}
                  style={{ padding: "0.5rem 0" }}
                >
                  <h1 className={`col-span-1 ${classes.adminDataBodyFields}`}>{idx + 1}</h1>
                  <h1 className={`col-span-1 ${classes.adminDataBodyFields}`}>{res.subjectCode}</h1>
                  <h1 className={`col-span-2 ${classes.adminDataBodyFields}`}>{res.subjectName}</h1>
                  <h1 className={`col-span-2 ${classes.adminDataBodyFields}`}>{res.test}</h1>
                  <h1 className={`col-span-1 ${classes.adminDataBodyFields}`}>{res.marks}</h1>
                  <h1 className={`col-span-1 ${classes.adminDataBodyFields}`}>{res.totalMarks}</h1>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Body;
