import React from "react";
import loginImage from "../../assets/img/login_img.png";
import { Outlet } from "react-router-dom";
import "../../assets/style/landingPages/AdminPage.css";

export default function AdminLanding() {
  return (
    <section className="login-layout">
   
      <div className="login-right">
        <img src={loginImage} alt="Login Visual" className="login-image" />
      </div>

      <div className="login-left">
        <div className="login-content">
          <Outlet />
        </div>
      </div>
    </section>
  );
}
