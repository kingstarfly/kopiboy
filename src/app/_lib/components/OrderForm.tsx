"use client";

import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";

// Define the modifier categories and their options
const bases = ["Kopi", "Teh", "Milo"];
const modifierCategories = {
  milk: ["O", "C", ""],
  strength: ["Gau", "Po", "Di Lo", ""],
  sugar: ["Kosong", "Siew Dai", "Gah Dai", ""],
  temperature: ["Peng", ""],
};

export function OrderForm() {
  const [orders, setOrders] = useLocalStorage<
    { drink: string; quantity: number }[]
  >("orders", [], { initializeWithValue: false });
  const [selectedBase, setSelectedBase] = useState<string | null>(null);
  const [selectedModifiers, setSelectedModifiers] = useState<
    Record<string, string>
  >({});

  const handleBaseSelection = (base: string) => {
    setSelectedBase(base);
    setSelectedModifiers({});
  };

  const handleModifierSelection = (category: string, modifier: string) => {
    setSelectedModifiers((prev) => ({ ...prev, [category]: modifier }));
  };

  const getCurrentDrink = (): string => {
    if (!selectedBase) return "";
    return [
      selectedBase,
      ...Object.values(selectedModifiers).filter(Boolean),
    ].join(" ");
  };

  const handleAddDrink = (drink: string) => {
    setOrders((prevOrders) => {
      const existingOrder = prevOrders.find((order) => order.drink === drink);
      if (existingOrder) {
        return prevOrders.map((order) =>
          order.drink === drink
            ? { ...order, quantity: order.quantity + 1 }
            : order,
        );
      } else {
        return [...prevOrders, { drink, quantity: 1 }];
      }
    });

    // Reset selections
    setSelectedBase(null);
    setSelectedModifiers({});
  };

  const handleUpdateQuantity = (drink: string, change: number) => {
    setOrders((prevOrders) => {
      return prevOrders
        .map((order) =>
          order.drink === drink
            ? { ...order, quantity: Math.max(0, order.quantity + change) }
            : order,
        )
        .filter((order) => order.quantity > 0);
    });
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to clear all orders?")) {
      setOrders([]);
    }
  };

  return (
    <div className="flex w-full flex-col gap-6 rounded-lg bg-white px-4 py-6 shadow-md sm:w-[480px]">
      <h2 className="mb-4 text-center text-2xl font-bold">Order Your Drink</h2>

      <OrderSummary
        orders={orders}
        onUpdateQuantity={handleUpdateQuantity}
        onReset={handleReset}
      />

      <div className="rounded-lg bg-gray-100 p-4">
        <h3 className="mb-2 text-lg font-semibold">Current selection:</h3>
        <p className="text-xl font-medium">
          {getCurrentDrink() || "No drink selected"}
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Select your base:</h3>
        <div className="flex gap-4">
          {bases.map((base) => (
            <button
              key={base}
              type="button"
              onClick={() => handleBaseSelection(base)}
              className={`flex-1 rounded px-4 py-3 text-lg font-medium transition-colors ${
                selectedBase === base
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {base}
            </button>
          ))}
        </div>
      </div>

      {selectedBase && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Select modifiers:</h3>
          {Object.entries(modifierCategories).map(([category, options]) => (
            <div key={category} className="space-y-2">
              <h4 className="text-md font-medium capitalize">{category}:</h4>
              <div className="flex flex-wrap gap-2">
                {options.map((modifier) => (
                  <button
                    key={modifier}
                    type="button"
                    onClick={() => handleModifierSelection(category, modifier)}
                    className={`text-md flex-1 rounded px-4 py-3 transition-colors ${
                      selectedModifiers[category] === modifier
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                  >
                    {modifier || "None"}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() => handleAddDrink(getCurrentDrink())}
            className="w-full rounded bg-blue-500 px-4 py-3 text-lg font-medium text-white transition-colors hover:bg-blue-600"
            disabled={!getCurrentDrink()}
          >
            Add to Order
          </button>
        </div>
      )}
    </div>
  );
}

function OrderSummary({
  orders,
  onUpdateQuantity,
  onReset,
}: {
  orders: { drink: string; quantity: number }[];
  onUpdateQuantity: (drink: string, change: number) => void;
  onReset: () => void;
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Order Summary:</h3>
      {orders.length > 0 ? (
        <div className="space-y-2">
          {orders.map((order) => (
            <div
              key={order.drink}
              className="flex items-center justify-between gap-x-4 border-b border-gray-200 py-2"
            >
              <span className="text-lg">
                {order.drink}{" "}
                <span className="font-medium">(x{order.quantity})</span>
              </span>
              <div className="flex gap-x-2">
                <button
                  type="button"
                  onClick={() => onUpdateQuantity(order.drink, 1)}
                  className="rounded bg-green-500 px-3 py-1 text-white transition-colors hover:bg-green-600"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => onUpdateQuantity(order.drink, -1)}
                  className="rounded bg-red-500 px-3 py-1 text-white transition-colors hover:bg-red-600"
                >
                  -
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="italic text-gray-500">No orders yet</p>
      )}
      {orders.length > 0 && (
        <button
          type="button"
          onClick={onReset}
          className="mt-4 w-full rounded bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
        >
          Clear All Orders
        </button>
      )}
    </div>
  );
}
