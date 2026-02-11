import { NavLink } from "react-router-dom";
import sidebarStyles from "../styles/sidebar.styles";

export default function Sidebar() {
  return (
    <div className={sidebarStyles.sidebar}>
      <NavLink
        to="/patient/dashboard"
        className={({ isActive }) =>
          `${sidebarStyles.link} ${
            isActive ? sidebarStyles.active : ""
          }`
        }
      >
        <i className="fas fa-home"></i> Dashboard
      </NavLink>

      <NavLink
        to="/patient/appointments"
        className={({ isActive }) =>
          `${sidebarStyles.link} ${
            isActive ? sidebarStyles.active : ""
          }`
        }
      >
        <i className="fas fa-calendar-alt"></i> Appointments
      </NavLink>

      <NavLink
        to="/patient/results"
        className={({ isActive }) =>
          `${sidebarStyles.link} ${
            isActive ? sidebarStyles.active : ""
          }`
        }
      >
        <i className="fas fa-file-medical"></i> Test Results
      </NavLink>

      <NavLink
        to="/patient/profile"
        className={({ isActive }) =>
          `${sidebarStyles.link} ${
            isActive ? sidebarStyles.active : ""
          }`
        }
      >
        <i className="fas fa-user"></i> My Profile
      </NavLink>

      <NavLink
        to="/patient/contact"
        className={({ isActive }) =>
          `${sidebarStyles.link} ${
            isActive ? sidebarStyles.active : ""
          }`
        }
      >
        <i className="fas fa-envelope"></i> Contact Us
      </NavLink>
    </div>
  );
}
