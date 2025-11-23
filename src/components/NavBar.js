import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export default function NavBar() {
  //eslint-disable-next-line
  const [selected, setSelected] = useState("home");
  const [open, setOpen] = useState(false);

  const styles = {
    link: "hover:text-blue-600 px-3 rounded-full py-1 transition-colors duration-300",
    activeLink:
      "text-blue-600 bg-blue-100 px-3 rounded-full py-1 transition-colors duration-300",
  };

  const isHomeActive =
    window.location.pathname.includes("/") &&
    !(
      window.location.pathname.includes("/users") ||
      window.location.pathname.includes("/products")
    );

  const isUsersActive = window.location.pathname.includes("/users");
  const isProductsActive = window.location.pathname.includes("/products");

  return (
    <nav className="bg-gray-100 p-3 mt-2 rounded-full shadow-lg text-gray-800 border border-gray-300 flex items-center justify-between w-full max-w-6xl">
      <h1 className="px-3 text-blue-700 font-bold">Digital Ledger</h1>

      <div className="hidden md:flex gap-3 justify-center items-center">
        <Link
          to="/"
          className={isHomeActive ? styles.activeLink : styles.link}
          onClick={() => {
            setSelected("home");
            setOpen(false);
          }}
        >
          Home
        </Link>

        <Link
          to="/users"
          className={isUsersActive ? styles.activeLink : styles.link}
          onClick={() => {
            setSelected("users");
            setOpen(false);
          }}
        >
          Users
        </Link>

        <Link
          to="/products"
          className={isProductsActive ? styles.activeLink : styles.link}
          onClick={() => {
            setSelected("products");
            setOpen(false);
          }}
        >
          Products
        </Link>
      </div>

      <div className="flex items-center gap-2 px-2">
        <LogoutIcon
          className="cursor-pointer bg-red-300 rounded-full p-2 text-red-500 hidden md:block"
          style={{ fontSize: 35 }}
        />

        <button
          className="md:hidden p-2 rounded-full hover:bg-gray-200 transition"
          onClick={() => setOpen(!open)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {open && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[95%] bg-white border border-gray-200 rounded-2xl shadow-lg p-4 flex flex-col gap-2 md:hidden z-50">
          <Link
            to="/"
            className={isHomeActive ? styles.activeLink : styles.link}
            onClick={() => {
              setSelected("home");
              setOpen(false);
            }}
          >
            Home
          </Link>

          <Link
            to="/users"
            className={isUsersActive ? styles.activeLink : styles.link}
            onClick={() => {
              setSelected("users");
              setOpen(false);
            }}
          >
            Users
          </Link>

          <Link
            to="/products"
            className={isProductsActive ? styles.activeLink : styles.link}
            onClick={() => {
              setSelected("products");
              setOpen(false);
            }}
          >
            Products
          </Link>

          <div className="pt-2 border-t flex justify-end">
            <LogoutIcon
              className="cursor-pointer bg-red-300 rounded-full p-2 text-red-500"
              style={{ fontSize: 35 }}
            />
          </div>
        </div>
      )}
    </nav>
  );
}
