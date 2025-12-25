import { useState } from "react";
import axios from "axios";

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function AddProductModal({ isOpen, onClose, onAdd }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    type: "snacks",
    img: null, // base64 string
  });

  async function handleImg(e) {
    const file = e.target.files[0];
    if (!file) return;

    const base64 = await fileToBase64(file);
    setForm((prev) => ({ ...prev, img: base64 }));
  }

  async function handleAdd() {
    if (!form.name.trim()) return;

    const storeId = JSON.parse(localStorage.getItem("user")).id;

    try {
      const res = await axios.post("http://127.0.0.1:5000/products", {
        name: form.name.trim(),
        price: Number(form.price) || 0,
        type: form.type,
        img: form.img, // ✅ base64 saved in DB
        store_id: storeId,
      });

      onAdd(res.data.product);
      setForm({ name: "", price: "", type: "snacks", img: null });
      onClose();
    } catch (e) {
      console.log(e);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold text-blue-600">Add Product</h2>

        {form.img && (
          <img
            src={form.img}
            className="w-24 h-24 object-cover rounded-lg border"
            alt={form.name}
          />
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleImg}
          className="p-2 border rounded w-full"
        />

        <input
          className="p-2 border rounded w-full"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="number"
          className="p-2 border rounded w-full"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <select
          className="p-2 border rounded w-full"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="play">Play Time</option>
          <option value="snacks">Snacks</option>
          <option value="hubbly">Hubbly Bubbly</option>
        </select>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded-full">
            Cancel
          </button>

          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-blue-500 text-white rounded-full shadow"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
