// imports
import {
  Banknote,
  Coins,
  FilePlus2,
  FileSearch,
  HandCoins,
  Handshake,
} from "lucide-react";

// components
import ExplainerCard from "./card";

const HowItWorksSection = () => {
  return (
    <div className="py-24">
      <div className="container mx-auto">
        {/* header */}
        <h2 className="text-xl px-4 md:text-3xl lg:text-4xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto ">
          How It Works
        </h2>
        {/* For Buyers */}
        <div className="flex flex-col mt-10">
          <h4 className="text-lg px-4 md:text-xl lg:text-2xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed">
            For Buyers
          </h4>
          {/* 3 column grid on xl, 2 on md, 1 on default */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mt-10">
            {/* column 1 */}
            <ExplainerCard
              icon={<FileSearch size={78} strokeWidth={1} />}
              title="1. Find an Order"
              description={`Browse through the list of available orders and select the one that suits you best`}
            />
            {/* column 2 */}
            <ExplainerCard
              icon={<Handshake size={78} strokeWidth={1} />}
              title="2. Trade with Order"
              description={`Trade with the order by sending the stablecoins equivalent to the amount of crypto you want to buy`}
            />
            {/* column 3 */}
            <ExplainerCard
              icon={<Coins size={78} strokeWidth={1} />}
              title="3. Receive Tokens"
              description={`Wait to for the trade to be executed and receive the crypto tokens`}
            />
          </div>
        </div>
        {/* For Sellers */}
        <div className="flex flex-col mt-10">
          <h4 className="text-lg px-4 md:text-xl lg:text-2xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed">
            For Sellers
          </h4>
          {/* 3 column grid on xl, 2 on md, 1 on default */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mt-10">
            {/* column 1 */}
            <ExplainerCard
              icon={<FilePlus2 size={78} strokeWidth={1} />}
              title="1. Create an Order"
              description={`Create an order by selecting the crypto you want to sell and the rate you want to sell it at`}
            />
            {/* column 2 */}
            <ExplainerCard
              icon={<HandCoins size={78} strokeWidth={1} />}
              title="2. Deposit Crypto"
              description={`Deposit the crypto tokens you want to sell to the smart contract`}
            />
            {/* column 3 */}
            <ExplainerCard
              icon={<Banknote size={78} strokeWidth={1} />}
              title="3. Receive Stablecoins"
              description={`Wait for a trade to be executed and receive stablecoins`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
