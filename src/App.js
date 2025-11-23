import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Products from "./components/ProductsPage/Products";
import Users from "./components/usersPage/Users";
import { useState } from "react";

function App() {
  const [userArr, setUserArr] = useState([]);
  const [productsArr, setProductsArr] = useState([]);

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
      <div className="min-h-screen w-full bg-gray-200 flex flex-col items-center p-4 box-border">
        <NavBar />
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
      </div>
    </BrowserRouter>
  );
}

export default App;
