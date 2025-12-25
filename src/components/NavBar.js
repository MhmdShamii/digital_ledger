import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export default function NavBar({ logout, currentUser }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const styles = {
    link: "hover:text-blue-600 px-3 rounded-full py-1 transition-colors duration-300",
    activeLink:
      "text-blue-600 bg-blue-100 px-3 rounded-full py-1 transition-colors duration-300",
  };

  const isHomeActive = location.pathname === "/";
  const isUsersActive = location.pathname.startsWith("/users");
  const isProductsActive = location.pathname.startsWith("/products");

  return (
    <nav className="bg-gray-100 p-3 mt-2 rounded-full shadow-lg text-gray-800 border border-gray-300 flex items-center justify-between w-full max-w-6xl relative">
      <h1 className="px-3 text-blue-700 font-bold">
        Digital Ledger "
        <span className="text-green-500">{currentUser.store_name}</span>"
      </h1>

      <div className="hidden md:flex gap-3 justify-center items-center">
        <Link
          to="/"
          className={isHomeActive ? styles.activeLink : styles.link}
          onClick={() => setOpen(false)}
        >
          Home
        </Link>

        <Link
          to="/users"
          className={isUsersActive ? styles.activeLink : styles.link}
          onClick={() => setOpen(false)}
        >
          Users
        </Link>

        <Link
          to="/products"
          className={isProductsActive ? styles.activeLink : styles.link}
          onClick={() => setOpen(false)}
        >
          Products
        </Link>
      </div>

      <div className="flex items-center gap-2 px-2">
        {/* ✅ Desktop logout */}
        <button
          type="button"
          onClick={logout}
          className="hidden md:flex"
          aria-label="Logout"
          title="Logout"
        >
          <LogoutIcon
            className="cursor-pointer bg-red-300 rounded-full p-2 text-red-600"
            style={{ fontSize: 35 }}
          />
        </button>

        <button
          type="button"
          className="md:hidden p-2 rounded-full hover:bg-gray-200 transition"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Menu"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {open && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[95%] bg-white border border-gray-200 rounded-2xl shadow-lg p-4 flex flex-col gap-2 md:hidden z-50">
          <Link
            to="/"
            className={isHomeActive ? styles.activeLink : styles.link}
            onClick={() => setOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/users"
            className={isUsersActive ? styles.activeLink : styles.link}
            onClick={() => setOpen(false)}
          >
            Users
          </Link>

          <Link
            to="/products"
            className={isProductsActive ? styles.activeLink : styles.link}
            onClick={() => setOpen(false)}
          >
            Products
          </Link>

          <div className="pt-2 border-t flex justify-end">
            {/* ✅ Mobile logout */}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                logout();
              }}
              aria-label="Logout"
              title="Logout"
            >
              <LogoutIcon
                className="cursor-pointer bg-red-300 rounded-full p-2 text-red-600"
                style={{ fontSize: 35 }}
              />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
