import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserDetails({ user }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchHistory() {
      if (!user) {
        setHistory([]);
        return;
      }

      setLoading(true);
      try {
        const res = await axios.get(
          `https://digitalledgerbackend-production.up.railway.app/users/${user.id}/history`
        );
        setHistory(res.data.history || []);
      } catch (e) {
        console.log(e);
        setHistory([]);
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, [user]);

  if (!user)
    return <p className="text-gray-500">Select a user to view items.</p>;

  const bal = Number(user.balance) || 0;
  const isOwed = bal < 0;

  return (
    <div className="space-y-4">
      {/* TOP DATA */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-500 text-sm">
            {user.email} • {user.phone}
          </p>
        </div>

        <div className="text-right">
          {isOwed ? (
            <>
              <p className="text-red-600 font-bold text-xl">
                ${Math.abs(bal).toFixed(2)}
              </p>
              <p className="text-gray-500 text-sm">Total Owed</p>
            </>
          ) : (
            <>
              <p className="text-green-600 font-bold text-xl">
                ${bal.toFixed(2)}
              </p>
              <p className="text-gray-500 text-sm">Credit Balance</p>
            </>
          )}
        </div>
      </div>

      {/* HISTORY BELOW */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Items History</h3>

        {loading ? (
          <p className="text-gray-400 text-sm">Loading history...</p>
        ) : history.length === 0 ? (
          <p className="text-gray-500">No items yet.</p>
        ) : (
          <div className="space-y-2">
            {history.map((h) => {
              const price = Number(h.price) || 0;

              const dateText = h.created_at
                ? new Date(h.created_at).toLocaleString()
                : "";

              return (
                <div
                  key={h.id}
                  className="p-3 rounded-lg border border-gray-200 flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3">
                    {h.product_img && (
                      <img
                        src={h.product_img}
                        className="w-12 h-12 object-cover rounded-lg border"
                        alt=""
                      />
                    )}

                    <div>
                      <p className="font-semibold">
                        {h.product_name || "Unknown Product"}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {h.qty} • {dateText}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold">${(h.qty * price).toFixed(2)}</p>
                    <p className="text-xs text-gray-400">
                      ${price.toFixed(2)} each
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
