import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Products from "./components/ProductsPage/Products";
import Users from "./components/usersPage/Users";
import { useEffect, useState } from "react";
import SignIn from "./auth/SignIn";

function App() {
  const [userArr, setUserArr] = useState([]);
  const [productsArr, setProductsArr] = useState([]);
  const [logedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  function logout() {
    setLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem("user");
  }

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setLoggedIn(true);
    }
  }, []);

  function addUser(user) {
    setUserArr((prev) => [...prev, user]);
  }
  function updateUser(updated) {
    setUserArr((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
  }

  function updateProduct(updated) {
    setProductsArr((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
  }

  function addProduct(product) {
    setProductsArr((prev) => [...prev, product]);
  }

  return (
    <BrowserRouter basename="/digital_ledger">
      <div
        className={`min-h-screen w-full bg-gray-200 flex flex-col items-center ${
          logedIn ? "p-4" : ""
        } box-border`}
      >
        {!logedIn ? (
          <SignIn setIfLoggedIn={setLoggedIn} />
        ) : (
          <>
            <NavBar logout={logout} />
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
