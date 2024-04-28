"use client";

// react
import { useEffect } from "react";
// imports
import { RecoilRoot } from "recoil";

// styles
import "@/styles/tailwind.css";

// layout
import AppLayout from "@/components/layout";

// app
import { NetworkId, P2P_CONTRACT } from "@/common/constants";

// wallet-selector
import { Wallet } from "@/wallets/near-wallet";

// hooks
import { useStore } from "@/common/hooks";

// Layout Component
export default function RootLayout({ children }) {
  // hooks
  const { setWallet, setSignedAccountId } = useStore();

  // effects
  useEffect(() => {
    const wallet = new Wallet({
      networkId: NetworkId,
      // createAccessKeyFor: P2P_CONTRACT,
    });
    wallet.startUp(setSignedAccountId);
    setWallet(wallet);
  }, []);

  return (
    <RecoilRoot>
      <AppLayout>{children}</AppLayout>
    </RecoilRoot>
  );
}
