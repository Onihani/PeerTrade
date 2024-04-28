"use client";

// react
import { useState, useEffect } from "react";
// next
import { useRouter } from "next/navigation";

// components
import OrderCard from "./order-card";
import BalanceCard from "./balance-card";

// hooks
import { useStore } from "@/common/hooks";

// constants
import { P2P_CONTRACT } from "@/common/constants";

export default function Dashboard() {
  // state
  const [balances, setBalances] = useState({});

  // hooks
  const router = useRouter();
  const { signedAccountId, wallet } = useStore();

  // effects
  useEffect(() => {
    if (!wallet) {
      router.push("/");
      return;
    }

    if (signedAccountId) {
      wallet
        .viewMethod({
          contractId: P2P_CONTRACT,
          method: "balances",
          args: { accountId: signedAccountId },
        })
        .then((balances) => setBalances(balances))
        .catch((err) => {
          console.log({ err });
        });
    }
  }, [wallet, signedAccountId]);

  console.log({ balances });

  return (
    <div className="container mx-auto">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Balances</h2>
          <div className="flex items-center space-x-2">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
              Create Order
            </button>
          </div>
        </div>
        <div dir="ltr" data-orientation="horizontal" className="space-y-4">
          <div
            data-state="active"
            data-orientation="horizontal"
            role="tabpanel"
            aria-labelledby="radix-:ree:-trigger-overview"
            id="radix-:ree:-content-overview"
            tabIndex={0}
            className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 space-y-12"
            style={{ animationDuration: "0s" }}
          >
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {Object.entries(balances).map(([tokenId, balance]) => (
                <BalanceCard
                  key={tokenId}
                  tokenId={tokenId}
                  balance={balance}
                />
              ))}
            </div>
            <div className="mt-28">
              <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
              {/*grid layout 4 on xl, 3 on lg, 2md and 1 on default */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-6">
                <OrderCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
