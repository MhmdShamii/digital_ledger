import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Products from "./components/ProductsPage/Products";
import Users from "./components/usersPage/Users";
import { useState } from "react";

const products = [
  // Snacks
  {
    id: 1,
    name: "Chips",
    price: 5,
    type: "snacks",
    img: "https://i.imgur.com/ODLwYV5.png",
  },
  {
    id: 2,
    name: "Soda",
    price: 3.5,
    type: "snacks",
    img: "https://i.imgur.com/6x6S7LK.png",
  },
  {
    id: 3,
    name: "Chocolate Bar",
    price: 4,
    type: "snacks",
    img: "https://i.imgur.com/LtQdvO5.png",
  },
  {
    id: 4,
    name: "Energy Drink",
    price: 7,
    type: "snacks",
    img: "https://i.imgur.com/bi1FTpt.png",
  },

  // Play Time
  {
    id: 5,
    name: "1 Hour Gaming",
    price: 5,
    type: "play",
    img: "https://i.imgur.com/5YqZQj6.png",
  },
  {
    id: 6,
    name: "3 Hours Gaming",
    price: 14,
    type: "play",
    img: "https://i.imgur.com/LyKPFe7.png",
  },
  {
    id: 7,
    name: "5 Hours Gaming",
    price: 20,
    type: "play",
    img: "https://i.imgur.com/xEw1qPt.png",
  },

  // Hubbly
  {
    id: 8,
    name: "Hubbly Bubbly — Regular",
    price: 15,
    type: "hubbly",
    img: "https://i.imgur.com/9rbJC3j.png",
  },
  {
    id: 9,
    name: "Hubbly Bubbly — Premium Flavor",
    price: 20,
    type: "hubbly",
    img: "https://i.imgur.com/0Lxx2zV.png",
  },
];

function App() {
  const [userArr, setUserArr] = useState([]);
  const [productsArr, setProductsArr] = useState(products);

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
