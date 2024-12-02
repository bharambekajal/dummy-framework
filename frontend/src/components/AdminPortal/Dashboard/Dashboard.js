import { React } from "react";
import "../../../assets/style/DashBoard.css";
import DropDownProfile from "./DropDownProfile";
import { Outlet, Link } from "react-router-dom";  // Import Link
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="logoo">
          <img src="/logo" alt="Logo" className="logo-img" />
          <h2>Company Name</h2>

          <DropDownProfile />
        </div>
        {/* Adding the "View Drafts" link to the navbar */}
        <div className="navbar-links">
          <Link to="drafts" className="navbar-link">
            View Drafts
          </Link>
        </div>
      </nav>
      <div className="sidebar-container">
        <Sidebar />
        <div className="outlet-area">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
