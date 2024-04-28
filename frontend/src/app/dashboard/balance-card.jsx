// react
import { useEffect, useState } from "react";
// next
import Image from "next/image";

// hooks
import { useStore } from "@/common/hooks";

// helpers
import { formatTokenAmount } from "@/common/helpers";

const BalanceCard = ({ tokenId, balance }) => {
  // state
  const [tokenMetadata, setTokenMetadata] = useState({});

  // hooks
  const { wallet } = useStore();

  // effects
  useEffect(() => {
    if (!wallet) return;

    wallet
      .viewMethod({
        contractId: tokenId,
        method: "ft_metadata",
      })
      .then((metadata) => setTokenMetadata(metadata))
      .catch((err) => {
        console.log({ err });
      });
  }, [wallet, tokenId]);

  console.log({ tokenMetadata });

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="tracking-tight text-sm font-medium">
          {tokenMetadata?.name}
        </h3>
        {tokenMetadata?.icon && (
          <Image
            src={tokenMetadata?.icon}
            width={24}
            height={24}
            alt={tokenMetadata?.name}
          />
        )}
      </div>
      <div className="p-6 pt-0">
        <div className="text-2xl font-bold">
          <span className="text-xs">{tokenMetadata?.symbol}</span>{" "}
          {formatTokenAmount(balance, tokenMetadata?.decimals)}
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
