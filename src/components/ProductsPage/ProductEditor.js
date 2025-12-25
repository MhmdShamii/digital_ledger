import { useState, useEffect } from "react";
import axios from "axios";

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function ProductEditor({ product, updateProduct }) {
  const [form, setForm] = useState(product);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm(product);
  }, [product]);

  async function handleImg(e) {
    const file = e.target.files[0];
    if (!file) return;

    const base64 = await fileToBase64(file);
    setForm((prev) => ({ ...prev, img: base64 }));
  }

  async function handleSave() {
    setSaving(true);
    try {
      const res = await axios.put(
        `http://127.0.0.1:5000/products/${product.id}`,
        {
          name: form.name,
          price: Number(form.price) || 0,
          type: form.type,
          img: form.img, // ✅ base64 updated in DB
        }
      );

      updateProduct(res.data.product);
    } catch (e) {
      console.log(e);
    } finally {
      setSaving(false);
    }
  }

  if (!form) return null;

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

      <button
        onClick={handleSave}
        disabled={saving}
        className="bg-blue-500 text-white px-4 py-2 rounded-full shadow disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
