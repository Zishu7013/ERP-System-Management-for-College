
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen w-64 bg-white dark:bg-gray-900 shadow-lg px-4 py-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-white">
          EduTrack
        </h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-gray-700 dark:text-gray-300"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <nav className="flex flex-col space-y-4">
        <Link to="/student/dashboard" className="sidebar-link">Dashboard</Link>
        <Link to="/student/attendance" className="sidebar-link">Attendance</Link>
        <Link to="/student/tests" className="sidebar-link">Tests</Link>
        <Link to="/student/profile" className="sidebar-link">Profile</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
