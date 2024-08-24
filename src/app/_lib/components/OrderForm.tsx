"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useLocalStorage } from "usehooks-ts";
import { generateDrinkPermutations } from "../utils/generate-drink-permutations";

const drinks = generateDrinkPermutations();

export function OrderForm() {
  const [orders, setOrders] = useLocalStorage<
    { drink: string; quantity: number }[]
  >("orders", [], { initializeWithValue: false });
  const [search, setSearch] = useState("");

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
  };

  const handleRemoveDrink = (drink: string) => {
    setOrders((prevOrders) => {
      const existingOrder = prevOrders.find((order) => order.drink === drink);
      if (existingOrder && existingOrder.quantity > 1) {
        return prevOrders.map((order) =>
          order.drink === drink
            ? { ...order, quantity: order.quantity - 1 }
            : order,
        );
      } else {
        return prevOrders.filter((order) => order.drink !== drink);
      }
    });
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to clear all orders?")) {
      setOrders([]);
    }
  };

  const filteredDrinks = drinks.filter((drink) =>
    drink.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission if needed
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-2 px-2 sm:w-96"
    >
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search drinks..."
        className="mb-2 rounded border p-2"
      />
      <div className="max-h-[20vh] overflow-y-auto rounded border">
        {filteredDrinks.map((drink) => (
          <DrinkOption
            key={drink}
            drink={drink}
            onAdd={() => handleAddDrink(drink)}
          />
        ))}
      </div>
      <span className="text-sm text-gray-500">
        {filteredDrinks.length} result(s)
      </span>
      <div className="mt-4">
        {orders.map((order) => (
          <OrderItem
            key={order.drink}
            order={order}
            onAdd={() => handleAddDrink(order.drink)}
            onRemove={() => handleRemoveDrink(order.drink)}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={handleReset}
        className="mt-2 rounded bg-blue-500 px-4 py-2 text-white"
      >
        Clear orders
      </button>
    </form>
  );
}

function DrinkOption({ drink, onAdd }: { drink: string; onAdd: () => void }) {
  return (
    <div className="flex items-center justify-between border-b p-2">
      <span>{drink}</span>
      <button
        type="button"
        onClick={onAdd}
        className="rounded bg-green-500 px-2 py-1 text-white"
      >
        Add
      </button>
    </div>
  );
}

function OrderItem({
  order,
  onAdd,
  onRemove,
}: {
  order: { drink: string; quantity: number };
  onAdd: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-x-4 border-b p-4">
      <span>
        {order.drink} (x{order.quantity})
      </span>
      <div className="flex gap-x-4">
        <button
          type="button"
          onClick={onAdd}
          className="rounded bg-green-500 px-3 py-1 text-white"
        >
          +
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="rounded bg-red-500 px-3 py-1 text-white"
        >
          -
        </button>
      </div>
    </div>
  );
}
