import React from "react";
import { Link, useLocation } from "react-router-dom";
import AvatarDropdown from "./AvatarDropdown";
import { useAuth } from "../../hooks/useAuth";

const NavbarAlt = () => {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <nav className="bg-white shadow-md" aria-label="Main Navigation">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-blue-900">
              Logo
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <AvatarDropdown />
            ) : (
              <>
                <Link
                  to="/login"
                  state={{ from: location.pathname }}
                  className="px-4 py-2 border border-white rounded-md hover:border-amber-500 hover:text-amber-500 transition duration-300"
                >
                  Log in
                </Link>
                <Link
                  to="/sign_up"
                  className="hidden tracking-wider lg:block px-4 py-2 bg-amber-500 border border-amber-500 rounded-md text-blue-950 hover:text-[#e89b3d] hover:bg-transparent transition duration-300"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarAlt;
