import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <ul className="flex space-x-4">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-white px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive ? 'bg-gray-700' : 'hover:bg-gray-600'
              }`
            }
          >
            Function Builder
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/json-linter"
            className={({ isActive }) =>
              `text-white px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive ? 'bg-gray-700' : 'hover:bg-gray-600'
              }`
            }
          >
            JSON Linter
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;