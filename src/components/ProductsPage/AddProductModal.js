import { useState } from "react";

export default function AddProductModal({ isOpen, onClose, onAdd }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    type: "snacks",
    img: null,
  });

  function handleImg(e) {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setForm({ ...form, img: url });
    }
  }

  function handleAdd() {
    const newProduct = {
      id: Date.now(),
      name: form.name,
      price: Number(form.price),
      type: form.type,
      img: form.img,
    };

    onAdd(newProduct);
    setForm({ name: "", price: "", type: "snacks", img: null });
    onClose();
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
