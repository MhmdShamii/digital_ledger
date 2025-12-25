export default function UserDisplay({ user, selectUser, selectedUser }) {
  const active = user.id === selectedUser?.id;

  return (
    <button
      className={`w-full text-left p-3 rounded-lg border flex items-center justify-between transition hover:bg-slate-100 hover:border-blue-400 ${
        active ? "bg-gray-100 border-blue-400" : ""
      }`}
      onClick={() => selectUser(user)}
    >
      <div>
        <p className="font-semibold">{user.name}</p>
        <p className="text-sm text-gray-500">{user.phone}</p>
      </div>

      <div className="text-right text-sm">
        {Number(user.balance) < 0 ? (
          <p className="text-red-600 font-bold">
            ${Math.abs(Number(user.balance) || 0).toFixed(2)}
          </p>
        ) : (
          <p className="text-green-600 font-bold">
            ${(Number(user.balance) || 0).toFixed(2)}
          </p>
        )}
        <p className="text-gray-400">
          {Number(user.balance) > 0 ? "credit" : "owed"}
        </p>
      </div>
    </button>
  );
}
