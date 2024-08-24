"use client";

import { useLocalStorage } from "usehooks-ts";

export function OrdersList() {
  const [orders] = useLocalStorage<{ drink: string; quantity: number }[]>(
    "orders",
    [],
    { initializeWithValue: false },
  );

  const orderSummary = orders.reduce(
    (summary, order) => {
      if (!summary[order.drink]) {
        summary[order.drink] = 0;
      }
      summary[order.drink]! += order.quantity;
      return summary;
    },
    {} as Record<string, number>,
  );

  return (
    <div className="w-full rounded bg-white p-4 shadow-md sm:w-96">
      <h2 className="mb-4 text-center text-xl font-semibold">Order Summary</h2>
      {orders.length === 0 ? (
        <p className="text-gray-500">
          No orders yet. Start adding your favorite drinks!
        </p>
      ) : (
        <ul className="space-y-2">
          {Object.entries(orderSummary).map(([drink, quantity]) => (
            <li
              key={drink}
              className="flex items-center justify-between border-b p-2 last:border-none"
            >
              <span className="text-gray-700">{drink}</span>
              <span className="text-gray-500">x {quantity}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
