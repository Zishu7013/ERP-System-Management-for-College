import React, { useEffect, useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../utils/Spinner";
import { SET_ERRORS } from "../../../redux/actionTypes";
import * as classes from "../../../utils/styles";

const Body = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);
  const subjects = useSelector((state) => state.admin.subjects.result);
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

  // Filter subjects by subjectCode or subjectName
  const filteredSubjects = subjects?.filter(
    (sub) =>
      sub.subjectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.subjectCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-[0.8] mt-3 flex flex-col">
      <div className="flex items-center space-x-2 text-gray-600 mb-4">
        <MenuBookIcon fontSize="medium" />
        <h1 className="text-lg font-semibold">All Subjects</h1>
      </div>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by Subject Name or Code..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <div className="bg-white rounded-xl p-6 flex-grow max-h-[30rem] overflow-auto shadow-lg">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Spinner
              message="Loading"
              height={50}
              width={150}
              color="#111111"
              messageColor="blue"
            />
          </div>
        ) : error.noSubjectError ? (
          <p className="text-red-600 text-center text-xl font-semibold mt-10">
            {error.noSubjectError}
          </p>
        ) : !filteredSubjects || filteredSubjects.length === 0 ? (
          <p className="text-gray-500 text-center text-lg mt-10">
            No subjects found.
          </p>
        ) : (
          <div className={classes.adminData}>
            {/* Table Header */}
            <div className="grid grid-cols-7 gap-x-2 border-b border-gray-300 sticky top-0 bg-white z-10 py-2">
              <h1 className={`${classes.adminDataHeading} col-span-1`}>Sr no.</h1>
              <h1 className={`${classes.adminDataHeading} col-span-2`}>Subject Code</h1>
              <h1 className={`${classes.adminDataHeading} col-span-3`}>Subject Name</h1>
              <h1 className={`${classes.adminDataHeading} col-span-1`}>Total Lectures</h1>
            </div>

            {/* Table Rows */}
            {filteredSubjects.map((sub, idx) => (
              <div
                key={idx}
                className={`${classes.adminDataBody} grid grid-cols-7 gap-x-2 hover:bg-gray-50 cursor-pointer transition-colors rounded-md py-2`}
              >
                <h1 className={`col-span-1 ${classes.adminDataBodyFields}`}>{idx + 1}</h1>
                <h1 className={`col-span-2 ${classes.adminDataBodyFields}`}>{sub.subjectCode}</h1>
                <h1 className={`col-span-3 ${classes.adminDataBodyFields}`}>{sub.subjectName}</h1>
                <h1 className={`col-span-1 ${classes.adminDataBodyFields}`}>{sub.totalLectures}</h1>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Body;
