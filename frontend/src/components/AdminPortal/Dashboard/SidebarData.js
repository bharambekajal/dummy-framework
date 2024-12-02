// SidebarData.js
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

export const SidebarData = [
  {
    title: "Home",
    icon: <HomeIcon />,
    link: "home", 
  },
  {
    title: "Add Details",
    icon: <AppRegistrationIcon />,
    link: "client_form",
  },
  {
    title: "Search Details",
    icon: <PeopleAltIcon />,
    link: "client_list",
  },
];

export default SidebarData;
