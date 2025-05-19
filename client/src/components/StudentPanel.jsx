
import Sidebar from "./Sidebar";

const StudentPanel = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <h2 className="text-3xl font-semibold mb-4">Welcome, Student 👋</h2>
        <p>This is your dashboard. Navigate through the sidebar options.</p>
      </div>
    </div>
  );
};

export default StudentPanel;
