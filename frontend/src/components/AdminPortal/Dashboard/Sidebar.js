import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import "../../../assets/style/DashBoard.css";
import SidebarData from "./SidebarData";

function Sidebar() {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate(); // Get the navigate function

  const handleItemClick = (index, link) => {
    setActiveIndex(index);
    navigate(link); // Use navigate instead of changing window.location.pathname
  };

  return (
    <div className="sidebar">
      <ul className="sidebarlist">
        {SidebarData.map((val, key) => {
          return (
            <li
              key={key}
              className="row"
              id={activeIndex === key ? "active" : ""}
              onClick={() => handleItemClick(key, val.link)}
            >
              <div id="icon">{val.icon}</div>
              <div id="title">{val.title}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
