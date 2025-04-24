import React from "react";
import { Link } from "react-router-dom";
import UserService from "../service/UserService";

function Navbar() {
  const isAuthenticated = UserService.isAuthenticated();
  const isAdmin = UserService.isAdmin();

  console.log("isAuthenticated:", isAuthenticated);
  console.log("isAdmin:", isAdmin);

  const handleLogout = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to logout this user?"
    );
    if (confirmDelete) {
      UserService.logout();
    }
  };

  return (
    <nav>
      <ul>
        <h1 style={{ margin: "10 px" }}>Dipal Das</h1>
        {isAuthenticated && (
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        )}
        {isAdmin && (
          <li>
            <Link to="/admin/user-management">User Management</Link>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
