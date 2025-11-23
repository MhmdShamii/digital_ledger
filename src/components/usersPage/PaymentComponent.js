import React, { useState, useEffect } from "react";

export default function PaymentModal({ isOpen, onClose, user, onConfirm }) {
  const [amount, setAmount] = useState("");
  const [extraMode, setExtraMode] = useState("credit");
  const [owed, setOwed] = useState(0);

  useEffect(() => {
    if (user) {
      setOwed(user.totalOwed);
    }
  }, [user]);

  if (!isOpen || !user) return null;

  const numAmount = parseFloat(amount) || 0;
  const isOverpay = numAmount > owed;
  const extra = isOverpay ? numAmount - owed : 0;

  function handleSubmit(e) {
    e.preventDefault();
    if (numAmount <= 0) return;

    onConfirm({
      paid: numAmount,
      extraMode,
    });

    setAmount("");
    setExtraMode("credit");
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-6 space-y-4">
        <h3 className="text-xl font-bold text-blue-600">Payment</h3>

        <div className="flex justify-between items-center">
          <p className="text-gray-600">Amount Owed</p>
          <p className="text-red-600 font-bold text-lg">${owed.toFixed(2)}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="number"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount paid"
            className="w-full p-2 border rounded-lg outline-none focus:border-blue-500"
          />

          {isOverpay && (
            <div className="p-3 border rounded-lg bg-blue-50 space-y-2">
              <p className="text-sm text-gray-700">
                Extra paid: <strong>${extra.toFixed(2)}</strong>
              </p>

              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    checked={extraMode === "credit"}
                    onChange={() => setExtraMode("credit")}
                  />
                  Keep as credit
                </label>

                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    checked={extraMode === "cash"}
                    onChange={() => setExtraMode("cash")}
                  />
                  Return extra cash
                </label>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full border"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-full bg-blue-500 text-white shadow"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
