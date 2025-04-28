/**
 * @file Navbar.jsx
 * @description Renders the Navbar area for the site
 */
import { Search, User } from "lucide-react";

import { Link, NavLink } from "react-router-dom";
import icon from '../assets/placeholder.svg';

/**
 * Navbar - Top navigation bar with logo, links, and user menu.
 *
 * @component
 * @returns {JSX.Element} The application header with navigation and user actions.
 */
const Navbar = () => {
    return (
      <div className="flex between justify-between font-medium px-8 py-4 bg-[var(--background-primary)] text-white">
        <Link to="/DragNDrop">
          <img src={icon} alt="Logo" className="w-36" />
        </Link>
        <nav className="hidden sm:flex gap-5 text-2xl my-auto">
          <NavLink to="/DragNDrop">
            <p>Home</p>
            <hr className="w-3/4 hidden mx-auto bg-gray-400 h-[1.5]" />
          </NavLink>
          <NavLink to="/DragNDrop/site-editor">
            <p>Editor</p>
            <hr className="w-3/4 hidden mx-auto bg-gray-400 h-[1.5]" />
          </NavLink>
        </nav>
        <div className="my-auto flex gap-4">
          <Search className="cursor-pointer" />
          <div className="group relative">
            <User className="cursor-pointer" />
            <div className="absolute right-0 hidden group-hover:block dropdown-menu bg-white text-gray-800 rounded-lg shadow-lg w-48">
              <div className="flex flex-col">
                <a href="/profile" className="px-2 py-2 text-sm whitespace-nowrap hover:bg-gray-100">My Profile</a>
                <a href="/cart" className="px-2 py-2 text-sm whitespace-nowrap hover:bg-gray-100">Cart</a>
                <a href="/logout" className="px-2 py-2 text-sm whitespace-nowrap hover:bg-gray-100">Logout</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};  

export default Navbar
