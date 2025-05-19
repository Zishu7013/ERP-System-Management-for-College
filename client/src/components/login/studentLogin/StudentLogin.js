import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Spinner from "../../../utils/Spinner";
import { studentSignIn } from "../../../redux/actions/studentActions";

const StudentLogin = () => {
  const [translate, setTranslate] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => state);
  const [error, setError] = useState({});

  useEffect(() => {
    setTimeout(() => setTranslate(true), 1000);
  }, []);

  useEffect(() => {
    if (store.errors) setError(store.errors);
  }, [store.errors]);

  useEffect(() => {
    if (store.errors) {
      setLoading(false);
      setUsername("");
      setPassword("");
    }
  }, [store.errors]);

  const login = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(studentSignIn({ username, password }, navigate));
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#141e30] to-[#243b55] flex items-center justify-center px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Sliding Panel */}
        <div
          className={`backdrop-blur-xl bg-white/10 text-white p-10 rounded-3xl shadow-2xl flex items-center justify-center transform transition-transform duration-1000 ${
            translate ? "translate-x-0" : "-translate-x-96"
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center">
            Welcome <br /> Student
          </h1>
        </div>

        {/* Login Form */}
        <form
          onSubmit={login}
          className={`backdrop-blur-xl bg-white/10 text-white p-8 md:p-10 rounded-3xl shadow-2xl space-y-6 w-[22rem] transform transition-transform duration-1000 ${
            translate ? "translate-x-0" : "translate-x-96"
          }`}
        >
          <h2 className="text-2xl font-bold text-center">Student Login</h2>

          {/* Username */}
          <div>
            <label className="text-sm text-gray-300 font-semibold">Username</label>
            <div className="flex items-center bg-gray-700 bg-opacity-50 rounded-lg px-3 mt-1">
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full bg-transparent text-white placeholder:text-sm py-2 outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-300 font-semibold">Password</label>
            <div className="flex items-center bg-gray-700 bg-opacity-50 rounded-lg px-3 mt-1">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-transparent text-white placeholder:text-sm py-2 outline-none"
              />
              {showPassword ? (
                <VisibilityIcon
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-white cursor-pointer"
                />
              ) : (
                <VisibilityOffIcon
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-white cursor-pointer"
                />
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all duration-200"
          >
            Login
          </button>

          {/* Spinner */}
          {loading && (
            <Spinner
              message="Logging In"
              height={30}
              width={150}
              color="#ffffff"
              messageColor="#fff"
            />
          )}

          {/* Error Message */}
          {(error.usernameError || error.passwordError) && (
            <p className="text-red-400 text-sm text-center mt-2">
              {error.usernameError || error.passwordError}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;
