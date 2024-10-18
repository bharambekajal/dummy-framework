// Dashboard.js
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../../assets/style/DashBoard.css'; // Import CSS

function Dashboard() {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h3 className="sidebar-title">Business Screens</h3>
        <nav className="dashboard-nav">
          <Link to="business1" className="nav-link">Business Screen 1</Link>
          <Link to="business2" className="nav-link">Business Screen 2</Link>
          <Link to="business3" className="nav-link">Business Screen 3</Link>
        </nav>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <h2 className="dashboard-title">Welcome</h2>
          <div className="header-right">
            <span className="footer-item">Notifications</span>
            <span className="divider">|</span>
            <span className="footer-item">Profile</span>
          </div>
        </header>

        <div className="content-area">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
