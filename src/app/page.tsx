import { HydrateClient } from "@/trpc/server";
import { OrderForm } from "./_lib/components/OrderForm";
import { OrdersList } from "./_lib/components/OrderList";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center bg-gray-100 py-8">
        <div className="container flex flex-col items-center justify-center gap-12 px-4">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[4rem]">
            Kopi Boy ☕ 🇸🇬
          </h1>
          <OrderForm />
          <OrdersList />
        </div>
      </main>
    </HydrateClient>
  );
}
