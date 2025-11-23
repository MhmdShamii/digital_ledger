export default function UserDisplay({ user, selectUser, selectedUser }) {
  return (
    <button
      key={user.id}
      className={`w-full text-left p-3 rounded-lg border flex items-center justify-between transition hover:bg-slate-100 hover:border-blue-400 ${
        user === selectedUser ? "bg-gray-100 border-blue-400" : ""
      }`}
      onClick={() => selectUser(user)}
    >
      <div>
        <p className="font-semibold">{user.name}</p>
        <p className="text-sm text-gray-500">{user.phone}</p>
      </div>

      <div className="text-right text-sm">
        {user.totalOwed > 0 ? (
          <p className="text-red-600 font-bold">${user.totalOwed}</p>
        ) : (
          <p className="text-green-600 font-bold">${user.credit}</p>
        )}
        <p className="text-gray-400">
          {user.totalOwed > 0 ? "Owed" : "Credit"}
        </p>
      </div>
    </button>
  );
}
