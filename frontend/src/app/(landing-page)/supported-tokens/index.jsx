// components
import TokenCard from "./card";

const SupportedTokens = () => {
  return (
    <div className="py-24">
      <div className="container mx-auto">
        {/* header */}
        <h2 className="text-xl px-4 md:text-3xl lg:text-4xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto ">
          Supported Cryptocurrencies
        </h2>
        {/* 3 column grid on xl, 4 on md, 2 on default */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-10">
          {/* column 1 */}
          <TokenCard
            name="Ethers"
            logo="https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
            type="token"
            link="https://testnet.nearblocks.io/address/eth.fakes.testnet"
          />
          {/* column 2 */}
          <TokenCard
            name="Tether"
            logo="https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
            type="stablecoin"
            link="https://testnet.nearblocks.io/address/usdt.fakes.testnet"
          />
          {/* column 3 */}
          <TokenCard
            name="Bitcoin"
            logo="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
            type="token"
            link="https://testnet.nearblocks.io/address/btc.fakes.testnet"
          />
          {/* column 4 */}
          <TokenCard
            name="USDC"
            logo="https://s2.coinmarketcap.com/static/img/coins/64x64/18852.png"
            type="stablecoin"
            link="https://testnet.nearblocks.io/address/usdc.fakes.testnet"
          />
          {/* column 5 */}
          <TokenCard
            name="HAPI"
            logo="https://s2.coinmarketcap.com/static/img/coins/64x64/8567.png"
            type="token"
            link="https://testnet.nearblocks.io/address/hapi.fakes.testnet"
          />
          {/* column 6 */}
          <TokenCard
            name="GHSC"
            logo="https://assets.dryicons.com/uploads/icon/svg/8556/f6d5a5b7-9700-4a60-88ab-bee2a1ff64ee.svg"
            type="stablecoin"
            link="https://testnet.nearblocks.io/address/ghsc.onihani.testnet"
          />
        </div>
      </div>
    </div>
  );
};

export default SupportedTokens;
