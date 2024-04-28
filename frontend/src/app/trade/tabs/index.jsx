// components
import { Tabs } from "./ui";
import Orders from "../orders";

const TradeTabs = () => {
  const tabs = [
    {
      title: "Buy",
      value: "buy",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white border border-neutral-600 bg-[#09090b]">
          <p className="mb-4">Buy Orders</p>
          <Orders />
        </div>
      ),
    },
    {
      title: "Sell",
      value: "sell",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white border border-neutral-600 bg-[#09090b]">
          <p className="mb-4">Sell Orders</p>
          <Orders />
        </div>
      ),
    },
  ];

  return (
    <div className="h-[30rem] md:h-[60rem] [perspective:1000px] relative b flex flex-col max-w-7xl mx-auto w-full items-start justify-start my-40">
      <Tabs tabs={tabs} />
    </div>
  );
};

export default TradeTabs;
