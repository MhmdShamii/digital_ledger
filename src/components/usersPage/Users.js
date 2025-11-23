import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import UserDisplay from "./UserDisplay";
import UserDetails from "./UserDetails";
import AddUser from "./AddUser";
import PaymentComponent from "./PaymentComponent";

export default function Users({ users, products, addUser, updateUser }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [usersToDisplay, setUsersToDisplay] = useState(users);
  const [input, setInput] = useState("");
  const [addUserIsOpen, setAddUserIsOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);

  useEffect(() => {
    if (input.trim() === "") {
      setUsersToDisplay(users);
    } else {
      handleUsersToDisplay(input);
    }
    // eslint-disable-next-line
  }, [users]);

  function handleUsersToDisplay(userName) {
    setUsersToDisplay(
      users.filter((user) => {
        return user.name.toLowerCase().includes(userName.toLowerCase());
      })
    );
  }
  function handleSearch(input) {
    setInput(input);

    if (input.trim() === "") {
      setUsersToDisplay(users);
      return;
    }

    handleUsersToDisplay(input);
  }

  function handleSelectdUser(user) {
    if (user.id === selectedUser?.id) {
      setSelectedUser(null);
    } else {
      setSelectedUser(user);
    }
  }
  function handleAddUser(user) {
    addUser(user);
    setInput("");
  }

  function handlePay({ paid, extraMode }) {
    if (!selectedUser) return;

    const owed = selectedUser.totalOwed;
    let newOwed = owed;
    let newCredit = selectedUser.credit;

    if (paid < owed) {
      newOwed = owed - paid;
    } else {
      newOwed = 0;
      const extra = paid - owed;

      if (extra > 0 && extraMode === "credit") {
        newCredit += extra;
      }
    }

    const updatedUser = {
      ...selectedUser,
      totalOwed: newOwed,
      credit: newCredit,
    };

    updateUser(updatedUser);
    setSelectedUser(updatedUser);
  }

  return (
    <div className="w-full max-w-6xl mt-6 grid grid-cols-12 gap-4">
      <div className="col-span-4 bg-white rounded-xl shadow border border-gray-200 p-4 h-[80vh] flex flex-col">
        <h2 className="text-xl font-bold mb-3 text-blue-600">Users</h2>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search users..."
            className="p-2 border rounded w-full outline-none focus:border-blue-500"
            value={input}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <SearchIcon className="text-blue-500" />
        </div>

        <div className="space-y-2 mt-3 flex-1 overflow-y-auto">
          {usersToDisplay.map((user) => {
            return (
              <UserDisplay
                key={user.id}
                user={user}
                selectUser={handleSelectdUser}
                selectedUser={selectedUser}
              />
            );
          })}
        </div>
        <button
          className=" w-full bg-blue-500 p-2 rounded-full text-white flex items-center justify-center gap-2 mt-2 shadow-md"
          onClick={() => setAddUserIsOpen(true)}
        >
          add User
          <AddIcon />
        </button>
      </div>

      <AddUser
        isOpen={addUserIsOpen}
        onClose={() => {
          setAddUserIsOpen(!addUserIsOpen);
        }}
        onAdd={handleAddUser}
      />

      <main className="col-span-8 bg-white rounded-xl shadow border border-gray-200 p-6 h-[80vh] overflow-y-auto space-y-2">
        <UserDetails
          user={selectedUser}
          products={products}
          // updateUsersArray={UpdatetUsersArray}
        />
        {selectedUser && (
          <button
            onClick={() => setPaymentOpen(true)}
            className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow hover:bg-blue-600"
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
