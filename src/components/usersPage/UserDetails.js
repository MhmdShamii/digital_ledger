import React from "react";

export default function UserDetails({ user, products }) {
  function getProductById(id) {
    return products.find((p) => p.id === id);
  }

  if (!user) {
    return <p className="text-gray-500">Select a user to view items.</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-500 text-sm">
            {user.email} • {user.phone}
          </p>
        </div>

        <div className="text-right">
          {user.totalOwed > 0 ? (
            <>
              <p className="text-red-600 font-bold text-xl">
                ${user.totalOwed.toFixed(2)}
              </p>
              <p className="text-gray-500 text-sm">Total Owed</p>
            </>
          ) : (
            <>
              <p className="text-green-600 font-bold text-xl">
                ${user.credit.toFixed(2)}
              </p>
              <p className="text-gray-500 text-sm">Credit Balance</p>
            </>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Items History</h3>

        {user.history.length === 0 ? (
          <p className="text-gray-500">No items yet.</p>
        ) : (
          <div className="space-y-2">
            {user.history.map((h, index) => {
              const product = getProductById(h.productId);

              const name = product?.name ?? "Unknown Product";
              const price = product?.price ?? 0;
              const img = product?.img ?? null;
              const subtotal = price * h.qty;

              return (
                <div
                  key={`${h.productId}-${h.date}-${index}`}
                  className="p-3 rounded-lg border border-gray-200 flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3">
                    {img && (
                      <img
                        src={img}
                        className="w-12 h-12 object-cover rounded-lg border"
                        alt=""
                      />
                    )}

                    <div>
                      <p className="font-semibold">{name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {h.qty} • {h.date}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold">${subtotal.toFixed(2)}</p>
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
