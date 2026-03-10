import React from "react";
import { NavLink } from "react-router";

function Header() {
  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-gray-100">

      <h2 className="text-xl font-bold">UserApp</h2>

      <ul className="flex gap-6">

        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-semibold" : ""
            }
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/adduser"
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-semibold" : ""
            }
          >
            Add User
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/users"
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-semibold" : ""
            }
          >
            Users
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/userlist"
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-semibold" : ""
            }
          >
            User List
          </NavLink>
        </li>

      </ul>
    </nav>
  );
}

export default Header;