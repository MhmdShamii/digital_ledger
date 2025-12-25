import axios from "axios";
import React, { useState } from "react";

export default function AddUser({ isOpen, onClose, onAdd }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function adduser(name, phone, email) {
    const balance = 0;
    const storeId = JSON.parse(localStorage.getItem("user")).id;

    try {
      const res = await axios.post("http://127.0.0.1:5000/adduser", {
        name,
        phone,
        email,
        balance,
        store_id: storeId,
      });
      return res.data.user;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;

    const createdUser = await adduser(
      form.name.trim(),
      form.phone.trim(),
      form.email.trim()
    );

    if (createdUser) onAdd(createdUser);

    setForm({ name: "", email: "", phone: "" });
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-blue-600 mb-4">Add New User</h3>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            type="text"
            placeholder="Full name *"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg outline-none focus:border-blue-500"
          />

          <input
            name="phone"
            type="text"
            placeholder="Phone number *"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg outline-none focus:border-blue-500"
          />

          <input
            name="email"
            type="email"
            placeholder="Email (optional)"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg outline-none focus:border-blue-500"
          />

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-full bg-blue-500 text-white shadow-md hover:bg-blue-600"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
