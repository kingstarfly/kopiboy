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
    <div>
      <h2>Order Summary</h2>
      <ul>
        {Object.entries(orderSummary).map(([drink, quantity]) => (
          <li key={drink}>
            {drink} x {quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}
