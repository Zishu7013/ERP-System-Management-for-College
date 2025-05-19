import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { facultySignIn } from "../../../redux/actions/facultyActions";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Spinner from "../../../utils/Spinner";

const FacultyLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => state);

  useEffect(() => {
    if (store.errors) {
      setError(store.errors);
      setLoading(false);
      setUsername("");
      setPassword("");
    }
  }, [store.errors]);

  const login = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(facultySignIn({ username, password }, navigate));
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-[#1f1c2c] to-[#928dab] flex items-center justify-center px-4">
      <div className="bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 rounded-2xl shadow-2xl w-full max-w-md p-8 space-y-6 animate-fade-in-down">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white tracking-wide">Faculty Portal</h1>
          <p className="text-gray-300 mt-2 text-sm">Sign in to continue</p>
        </div>

        <form onSubmit={login} className="space-y-5">
          <div>
            <label className="block text-gray-300 text-sm mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 bg-white bg-opacity-20 text-white border border-white border-opacity-30 rounded-lg outline-none focus:ring-2 focus:ring-[#04bd7d] placeholder:text-gray-300"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 bg-white bg-opacity-20 text-white border border-white border-opacity-30 rounded-lg outline-none focus:ring-2 focus:ring-[#04bd7d] placeholder:text-gray-300"
                placeholder="Enter your password"
              />
              <div
                className="absolute top-2.5 right-3 text-white cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </div>
            </div>
          </div>

          {(error.usernameError || error.passwordError) && (
            <p className="text-red-400 text-sm text-center">
              {error.usernameError || error.passwordError}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-2 bg-[#04bd7d] text-white rounded-lg hover:bg-[#03a56c] transition-all font-medium tracking-wide"
          >
            {loading ? "Please wait..." : "Login"}
          </button>

          {loading && (
            <div className="flex justify-center mt-2">
              <Spinner
                message="Logging In"
                height={30}
                width={150}
                color="#ffffff"
                messageColor="#fff"
              />
            </div>
          )}
        </form>

        <div className="text-center text-gray-400 text-xs">
          © {new Date().getFullYear()} College ERP • All rights reserved
        </div>
      </div>
    </div>
  );
};

export default FacultyLogin;
