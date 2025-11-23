import { useState, useEffect } from "react";

export default function ProductEditor({ product, updateProduct }) {
  const [form, setForm] = useState(product);

  useEffect(() => {
    setForm(product);
  }, [product]);

  function handleSave() {
    updateProduct(form);
  }

  function handleImg(e) {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setForm({ ...form, img: url });
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Edit Product</h2>

      <div className="space-y-2">
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
      </div>

      <input
        className="p-2 border rounded w-full"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        type="number"
        className="p-2 border rounded w-full"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
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

      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded-full shadow"
      >
        Save Changes
      </button>
    </div>
  );
}
