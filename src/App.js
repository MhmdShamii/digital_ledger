import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Products from "./components/ProductsPage/Products";
import Users from "./components/usersPage/Users";
import UserManagment from "./components/usersPage/UserManagment";
import { useEffect, useState } from "react";
import SignIn from "./auth/SignIn";
import axios from "axios";

function App() {
  const [userArr, setUserArr] = useState([]);
  const [productsArr, setProductsArr] = useState([]);
  const [logedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  function logout() {
    localStorage.removeItem("user");
    setLoggedIn(false);
    setCurrentUser(null);
    setUserArr([]);
  }

  useEffect(() => {
    async function fetchProducts() {
      const saved = localStorage.getItem("user");
      if (!saved) return;

      const user = JSON.parse(saved);

      const res = await axios.get(
        "https://digitalledgerbackend-production.up.railway.app/products",
        {
          params: { store_id: user.id },
        }
      );

      setProductsArr(res.data.products || []);
    }

    fetchProducts().catch(console.log);
  }, []);

  // restore session
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      setCurrentUser(JSON.parse(saved));
      setLoggedIn(true);
    }
  }, []);

  // fetch users once when logged in
  useEffect(() => {
    async function fetchUsers() {
      if (!currentUser) return;

      const res = await axios.get(
        "https://digitalledgerbackend-production.up.railway.app/users",
        {
          params: { store_id: currentUser.id },
        }
      );

      const list = res.data.users ?? res.data; // supports both shapes
      setUserArr(Array.isArray(list) ? list : []);
    }

    fetchUsers().catch(console.log);
  }, [currentUser]);

  function addUser(user) {
    setUserArr((prev) => [user, ...prev]);
  }

  function updateUser(updated) {
    setUserArr((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
  }

  // products stay same (MVP)
  function addProduct(product) {
    setProductsArr((prev) => [product, ...prev]);
  }

  function updateProduct(updated) {
    setProductsArr((prev) =>
      prev.map((p) => (p.id === updated.id ? { ...p, ...updated } : p))
    );
  }

  return (
    <BrowserRouter basename="/digital_ledger">
      <div
        className={`min-h-screen w-full bg-gray-200 flex flex-col items-center ${
          logedIn ? "p-4" : ""
        } box-border`}
      >
        {!logedIn ? (
          <SignIn
            setIfLoggedIn={(val) => {
              setLoggedIn(val);
              const saved = localStorage.getItem("user");
              if (saved) setCurrentUser(JSON.parse(saved));
            }}
          />
        ) : (
          <>
            <NavBar logout={logout} currentUser={currentUser} />

            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    products={productsArr}
                    users={userArr}
                    updateUser={updateUser}
                  />
                }
              />

              <Route
                path="/users"
                element={
                  <Users
                    users={userArr}
                    products={productsArr}
                    addUser={addUser}
                    updateUser={updateUser}
                  />
                }
              />

              <Route path="/user-management" element={<UserManagment />} />
              <Route
                path="/products"
                element={
                  <Products
                    products={productsArr}
                    updateProduct={updateProduct}
                    addProduct={addProduct}
                  />
                }
              />
            </Routes>
          </>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
