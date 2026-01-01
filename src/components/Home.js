import { useState, useEffect } from "react";
import axios from "axios";

export default function Home({ products, users, updateUser }) {
  const [cart, setCart] = useState([]);
  const [productSearch, setProductSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState(products);

  const [userSearch, setUserSearch] = useState("");
  const [usersFound, setUsersFound] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Filter products by search & category
  useEffect(() => {
    let result = products;

    if (category !== "all") result = result.filter((p) => p.type === category);

    if (productSearch.trim()) {
      result = result.filter((p) =>
        (p.name || "").toLowerCase().includes(productSearch.toLowerCase())
      );
    }

    setFilteredProducts(result);
  }, [products, productSearch, category]);

  // Filter users by search
  useEffect(() => {
    if (!userSearch.trim()) {
      setUsersFound([]);
      setSelectedUser(null);
      return;
    }

    const found = users.filter((u) =>
      (u.name || "").toLowerCase().includes(userSearch.toLowerCase())
    );
    setUsersFound(found);
  }, [userSearch, users]);

  // Cart functions
  const addToCart = (p) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === p.id);
      if (exists)
        return prev.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...p, qty: 1 }];
    });
  };

  const removeOne = (id) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const calculateTotal = () =>
    cart.reduce((sum, i) => sum + Number(i.price || 0) * Number(i.qty || 0), 0);

  // Assign purchase or add to balance
  const assignPurchase = async (type) => {
    if (!selectedUser || cart.length === 0) return;

    const store = JSON.parse(localStorage.getItem("user"));
    if (!store?.id) return alert("Store not found!");

    const items = cart.map((i) => ({
      product_id: Number(i.id),
      qty: Number(i.qty),
      price: Number(i.price) || 0,
    }));

    setLoading(true);
    try {
      const res = await axios.post(
        "https://digitalledgerbackend-production.up.railway.app/purchase",
        {
          user_id: selectedUser.id,
          store_id: store.id,
          items,
          type, // "pay" or "add"
        }
      );

      const updatedUser = res.data.user;
      updateUser(updatedUser);
      setSelectedUser(updatedUser);

      // Reset cart and search
      setCart([]);
      setUserSearch("");
      setUsersFound([]);
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Something went wrong. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mt-6 grid grid-cols-1 md:grid-cols-12 gap-4">
      {/* Products */}
      <div className="md:col-span-8 flex flex-col h-[80vh]">
        <div className="flex flex-wrap gap-2 mb-4">
          {["all", "snacks", "play", "hubbly"].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-full ${
                category === c ? "bg-blue-500 text-white" : "bg-white border"
              }`}
            >
              {c === "play"
                ? "Play Time"
                : c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search product..."
          value={productSearch}
          onChange={(e) => setProductSearch(e.target.value)}
          className="p-2 border rounded w-full mb-4"
        />

        <div className="flex-1 max-h-[70vh] overflow-y-auto pr-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => addToCart(p)}
                className="p-3 bg-white border rounded-xl shadow hover:shadow-lg cursor-pointer flex flex-col items-center"
              >
                {p.img && (
                  <img
                    src={p.img}
                    className="w-24 h-24 object-cover rounded-lg mb-2"
                    alt={p.name}
                  />
                )}
                <p className="font-bold text-center">{p.name}</p>
                <p className="text-gray-500">${p.price}</p>
                <span className="text-xs text-blue-600 mt-1">Click to add</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cart */}
      <div className="md:col-span-4 bg-white p-4 rounded-xl shadow border md:h-[80vh] flex flex-col">
        <h2 className="text-xl font-bold text-blue-600">Cart</h2>

        <div className="mt-2 flex-1 md:overflow-y-auto space-y-2">
          {cart.map((i) => (
            <div
              key={i.id}
              className="p-3 border rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                {i.img && (
                  <img
                    src={i.img}
                    className="w-10 h-10 rounded object-cover"
                    alt={i.name}
                  />
                )}
                <div>
                  <p className="font-semibold">{i.name}</p>
                  <p className="text-sm text-gray-500">
                    ${i.price} × {i.qty}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeOne(i.id)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                -
              </button>
            </div>
          ))}
        </div>

        <div className="p-3 border rounded-lg mt-2">
          <p className="font-semibold">Total: ${calculateTotal().toFixed(2)}</p>
        </div>

        {/* User search */}
        <input
          type="text"
          placeholder="Search customer..."
          value={userSearch}
          onChange={(e) => setUserSearch(e.target.value)}
          className="p-2 border rounded w-full mt-3"
        />

        {usersFound.length > 0 && (
          <div className="border rounded mt-2 max-h-32 overflow-y-auto">
            {usersFound.map((u) => (
              <div
                key={u.id}
                onClick={() => setSelectedUser(u)}
                className={`p-2 cursor-pointer ${
                  selectedUser?.id === u.id ? "bg-blue-100" : "hover:bg-gray-50"
                }`}
              >
                {u.name} • {u.phone}
              </div>
            ))}
          </div>
        )}

        {selectedUser && (
          <div className="mt-3 p-2 border rounded">
            <p className="font-semibold">{selectedUser.name}</p>
            <p className="text-sm text-gray-500">
              Balance: ${Number(selectedUser.balance || 0).toFixed(2)}
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 mt-3">
          <button
            disabled={loading}
            className="flex-1 bg-green-500 text-white p-2 rounded-full"
            onClick={() => assignPurchase("pay")}
          >
            Paid Now
          </button>
          <button
            disabled={loading}
            className="flex-1 bg-blue-500 text-white p-2 rounded-full"
            onClick={() => assignPurchase("add")}
          >
            Add To Balance
          </button>
        </div>
      </div>
    </div>
  );
}
