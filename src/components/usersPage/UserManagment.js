import { useEffect, useState } from "react";
import axios from "axios";

export default function UserManagment() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const admin = JSON.parse(localStorage.getItem("user"));
  const storeId = admin?.id;

  async function fetchUsers() {
    try {
      const res = await axios.get("http://127.0.0.1:5000/users", {
        params: { store_id: storeId },
      });
      setUsers(res.data.users);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteUser(id) {
    if (!window.confirm("Delete this user?")) return;

    try {
      await axios.delete(`http://127.0.0.1:5000/users/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      alert("Failed to delete user");
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <p className="text-gray-500 mt-[20px] text-center">Loading users...</p>
    );
  }

  return (
    <div className="w-[60%] mx-auto mt-[20px] bg-white rounded-2xl shadow border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">Users</h2>
        <p className="text-sm text-gray-500">Manage store users</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-6 py-3 text-left font-medium">Name</th>
              <th className="px-6 py-3 text-left font-medium">Phone</th>
              <th className="px-6 py-3 text-left font-medium">Email</th>
              <th className="px-6 py-3 text-left font-medium">Balance</th>
              <th className="px-6 py-3 text-right font-medium">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-800">
                  {u.name}
                </td>
                <td className="px-6 py-4 text-gray-600">{u.phone}</td>
                <td className="px-6 py-4 text-gray-600">{u.email}</td>
                <td
                  className={`px-6 py-4 font-semibold ${
                    u.balance < 0 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  ${u.balance}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => deleteUser(u.id)}
                    className="px-3 py-1.5 rounded-lg text-red-600 border border-red-200
                               hover:bg-red-50 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-6 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
