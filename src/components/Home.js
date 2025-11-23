import { useState, useEffect } from "react";

export default function Home({ products, users, updateUser }) {
  const [cart, setCart] = useState([]);
  const [productSearch, setProductSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState(products);

  const [userSearch, setUserSearch] = useState("");
  const [usersFound, setUsersFound] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    let result = products;

    if (category !== "all") {
      result = result.filter((p) => p.type === category);
    }

    if (productSearch.trim() !== "") {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(productSearch.toLowerCase())
      );
    }

    setFilteredProducts(result);
  }, [productSearch, category, products]);

  useEffect(() => {
    if (userSearch.trim() === "") {
      setUsersFound([]);
      setSelectedUser(null);
      return;
    }

    setUsersFound(
      users.filter((u) =>
        u.name.toLowerCase().includes(userSearch.toLowerCase())
      )
    );
  }, [userSearch, users]);

  function addToCart(p) {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === p.id);
      if (exists) {
        return prev.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...p, qty: 1 }];
    });
  }

  function removeOne(id) {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    );
  }

  function calculateTotal() {
    return cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  }

  function assignPurchase(paidNow) {
    if (!selectedUser || cart.length === 0) return;

    const total = calculateTotal();
    let newCredit = selectedUser.credit;
    let newOwed = selectedUser.totalOwed;
    let newHistory = [...selectedUser.history];

    cart.forEach((item) => {
      newHistory.push({
        productId: item.id,
        qty: item.qty,
        date: new Date().toISOString().split("T")[0],
      });
    });

    if (paidNow) {
      if (newCredit >= total) {
        newCredit -= total;
      } else {
        const diff = total - newCredit;
        newCredit = 0;
        newOwed += diff;
      }
    } else {
      newOwed += total;
    }

    updateUser({
      ...selectedUser,
      credit: newCredit,
      totalOwed: newOwed,
      history: newHistory,
    });

    setCart([]);
    setUserSearch("");
    setSelectedUser(null);
  }

  return (
    <div className="w-full max-w-6xl mt-6 grid grid-cols-1 md:grid-cols-12 gap-4">
      <div className="md:col-span-8 flex flex-col h-[80vh]">
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setCategory("all")}
            className={`px-4 py-2 rounded-full ${
              category === "all" ? "bg-blue-500 text-white" : "bg-white border"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setCategory("snacks")}
            className={`px-4 py-2 rounded-full ${
              category === "snacks"
                ? "bg-blue-500 text-white"
                : "bg-white border"
            }`}
          >
            Snacks
          </button>
          <button
            onClick={() => setCategory("play")}
            className={`px-4 py-2 rounded-full ${
              category === "play" ? "bg-blue-500 text-white" : "bg-white border"
            }`}
          >
            Play Time
          </button>
          <button
            onClick={() => setCategory("hubbly")}
            className={`px-4 py-2 rounded-full ${
              category === "hubbly"
                ? "bg-blue-500 text-white"
                : "bg-white border"
            }`}
          >
            Hubbly
          </button>
        </div>

        <input
          type="text"
          placeholder="Search product..."
          value={productSearch}
          onChange={(e) => setProductSearch(e.target.value)}
          className="p-2 border rounded w-full mb-4"
        />

        {/* SCROLLABLE PRODUCT LIST */}
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
              Credit: ${selectedUser.credit} • Owed: ${selectedUser.totalOwed}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2 mt-3">
          <button
            className="flex-1 bg-green-500 text-white p-2 rounded-full"
            onClick={() => assignPurchase(true)}
          >
            Paid Now
          </button>
          <button
            className="flex-1 bg-blue-500 text-white p-2 rounded-full"
            onClick={() => assignPurchase(false)}
          >
            Add To Balance
          </button>
        </div>
      </div>
    </div>
  );
}
