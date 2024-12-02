import React, { useState, useEffect, useRef } from "react";
import "../../../assets/style/DropDownProfile.css";
import portrait from "../../../assets/img/profile_img.jpg";
import user from "../../../assets/img/user.png";
import settings from "../../../assets/img/settings.png";
import logout from "../../../assets/img/log-out.png";
import { useNavigate } from "react-router-dom";

const DropDownProfile = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  let menuRef = useRef();

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin");

    navigate("/admin/login");
  };
  const handleProfile = () => {
   
    navigate("/profile_card");
  };
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
        console.log(menuRef.current);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div className="menu-container" ref={menuRef}>
      <div
        className="menu-trigger"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <img src={portrait}></img>
      </div>

      <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
        <h3>
          Kajal Bharambe
          <br />
        </h3>
        <ul>
        <li className="dropdownItem" onClick={handleProfile}>
            <img src={user} alt="profile" />
            <a>My Profile</a>
          </li>
          <DropdownItem img={settings} text={"Settings"} />
          <li className="dropdownItem" onClick={handleLogout}>
            <img src={logout} alt="Logout" />
            <a>Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

function DropdownItem(props) {
  return (
    <li className="dropdownItem">
      <img src={props.img}></img>
      <a> {props.text} </a>
    </li>
  );
}

export default DropDownProfile;
