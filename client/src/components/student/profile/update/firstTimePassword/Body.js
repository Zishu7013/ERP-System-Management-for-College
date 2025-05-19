import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Spinner from "../../../../../utils/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { studentUpdatePassword } from "../../../../../redux/actions/studentActions";

const Body = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  const update = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(
      studentUpdatePassword(
        {
          newPassword,
          confirmPassword,
          email: user.result.email,
        },
        navigate
      )
    );
  };

  useEffect(() => {
    if (store.errors) {
      setLoading(false);
      setNewPassword("");
      setConfirmPassword("");
    }
  }, [store.errors]);

  return (
    <div className="flex flex-col items-center w-full space-y-10 mt-16 px-4">
      <form
        onSubmit={update}
        className="flex flex-col space-y-6 w-full max-w-md bg-white p-8 rounded-2xl shadow-lg"
      >
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4 text-center">
          Update Password
        </h1>

        {/* New Password */}
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="new-password"
            className="text-gray-700 font-semibold text-sm"
          >
            New Password
          </label>
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
            <input
              id="new-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="flex-grow bg-transparent outline-none text-gray-900 placeholder-gray-400 text-base"
              minLength={6}
            />
            {showPassword ? (
              <VisibilityOffIcon
                onClick={() => setShowPassword(false)}
                className="cursor-pointer text-gray-600"
              />
            ) : (
              <VisibilityIcon
                onClick={() => setShowPassword(true)}
                className="cursor-pointer text-gray-600"
              />
            )}
          </div>
          {error.newPassword && (
            <p className="text-red-500 text-sm mt-1">{error.newPassword}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="confirm-password"
            className="text-gray-700 font-semibold text-sm"
          >
            Confirm Password
          </label>
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
            <input
              id="confirm-password"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="flex-grow bg-transparent outline-none text-gray-900 placeholder-gray-400 text-base"
              minLength={6}
            />
            {showPassword ? (
              <VisibilityOffIcon
                onClick={() => setShowPassword(false)}
                className="cursor-pointer text-gray-600"
              />
            ) : (
              <VisibilityIcon
                onClick={() => setShowPassword(true)}
                className="cursor-pointer text-gray-600"
              />
            )}
          </div>
          {error.mismatchError && (
            <p className="text-red-500 text-sm mt-1">{error.mismatchError}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white font-semibold transition-colors duration-200 ${
            loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>

      {loading && (
        <Spinner
          message="Updating"
          height={30}
          width={150}
          color="#111111"
          messageColor="#2563eb"
        />
      )}
    </div>
  );
};

export default Body;
