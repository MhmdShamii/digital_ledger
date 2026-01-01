import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import UserDisplay from "./UserDisplay";
import UserDetails from "./UserDetails";
import AddUser from "./AddUser";
import PaymentComponent from "./PaymentComponent";
import axios from "axios";

export default function Users({ users, products, addUser, updateUser }) {
  const [usersToDisplay, setUsersToDisplay] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [input, setInput] = useState("");
  const [addUserIsOpen, setAddUserIsOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);

  useEffect(() => {
    setUsersToDisplay(users || []);
  }, [users]);

  function handleSearch(value) {
    setInput(value);
    const q = value.trim().toLowerCase();

    if (!q) return setUsersToDisplay(users || []);

    setUsersToDisplay(
      (users || []).filter((u) => {
        const name = (u.name ?? "").toLowerCase();
        const phone = (u.phone ?? "").toLowerCase();
        const email = (u.email ?? "").toLowerCase();
        return name.includes(q) || phone.includes(q) || email.includes(q);
      })
    );
  }

  function handleSelectdUser(user) {
    setSelectedUser(user.id === selectedUser?.id ? null : user);
  }

  function handleAddUser(createdUser) {
    if (!createdUser) return;
    addUser(createdUser);
    setInput("");
    setAddUserIsOpen(false);
  }

  // ✅ Payment -> update DB balance
  async function handlePay({ paid, extraMode }) {
    if (!selectedUser) return;

    const currentBalance = Number(selectedUser.balance) || 0;

    // pay always increases balance (reduces debt if negative)
    let newBalance = currentBalance + Number(paid);

    // if they want cash back, don’t keep credit above 0
    if (extraMode === "cash" && newBalance > 0) newBalance = 0;

    try {
      await axios.put(
        `https://digitalledgerbackend-production.up.railway.app/users/${selectedUser.id}/balance`,
        { balance: newBalance }
      );

      const updated = { ...selectedUser, balance: newBalance };
      updateUser(updated);
      setSelectedUser(updated);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="w-full max-w-6xl mt-6 grid grid-cols-1 md:grid-cols-12 gap-4 min-h-[calc(100vh-130px)]">
      <div className="md:col-span-4 bg-white rounded-xl shadow border p-4 flex flex-col">
        <h2 className="text-xl font-bold mb-3 text-blue-600">Users</h2>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search users..."
            className="p-2 border rounded w-full"
            value={input}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <SearchIcon />
        </div>

        <div className="space-y-2 mt-3 flex-1 overflow-y-auto">
          {usersToDisplay.length === 0 ? (
            <p className="text-gray-400 text-sm mt-4">No users found</p>
          ) : (
            usersToDisplay.map((user) => (
              <UserDisplay
                key={user.id}
                user={user}
                selectUser={handleSelectdUser}
                selectedUser={selectedUser}
              />
            ))
          )}
        </div>

        <button
          className="w-full bg-blue-500 p-2 rounded-full text-white mt-2 flex items-center justify-center gap-2"
          onClick={() => setAddUserIsOpen(true)}
        >
          Add User <AddIcon />
        </button>
      </div>

      <AddUser
        isOpen={addUserIsOpen}
        onClose={() => setAddUserIsOpen(false)}
        onAdd={handleAddUser}
      />

      <main className="md:col-span-8 bg-white rounded-xl shadow p-6 overflow-y-auto">
        <UserDetails user={selectedUser} products={products} />

        {selectedUser && (
          <button
            onClick={() => setPaymentOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-full mt-3"
          >
            Manage Balance
          </button>
        )}
      </main>

      <PaymentComponent
        isOpen={paymentOpen}
        onClose={() => setPaymentOpen(false)}
        user={selectedUser}
        onConfirm={handlePay}
      />
    </div>
  );
}
