import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

//eslint-disable-next-line
export default function NavBar() {
  //eslint-disable-next-line
  const [selected, setSelected] = useState("home");

  const styles = {
    link: "hover:text-blue-600 px-3 rounded-full py-1 transition-colors duration-300",
    activeLink:
      "text-blue-600 bg-blue-100 px-3 rounded-full py-1 transition-colors duration-300",
  };

  return (
    <nav className="bg-gray-100 p-3  mt-2 rounded-full shadow-lg text-gray-800 border border-gray-300 flex items-center space-x-8 position-static">
      <h1 className="px-3 text-blue-700  font-bold">Digital Ledger</h1>
      <div className="flex gap-3 justify-center items-center">
        <Link
          to="/"
          className={
            window.location.pathname.includes("/") &&
            !(
              window.location.pathname.includes("/users") ||
              window.location.pathname.includes("/products")
            )
              ? styles.activeLink
              : styles.link
          }
          onClick={() => setSelected("home")}
        >
          Home
        </Link>
        <Link
          to="/users"
          className={
            window.location.pathname.includes("/users")
              ? styles.activeLink
              : styles.link
          }
          onClick={() => setSelected("users")}
        >
          Users
        </Link>
        <Link
          to="/products"
          className={
            window.location.pathname.includes("/products")
              ? styles.activeLink
              : styles.link
          }
          onClick={() => setSelected("products")}
        >
          Products
        </Link>
      </div>
      <LogoutIcon
        className="cursor-pointer bg-red-300  rounded-full p-2 text-red-500"
        style={{ fontSize: 35 }}
      />
    </nav>
  );
}
