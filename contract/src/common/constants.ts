import { Gas, ONE_TERA_GAS } from "near-sdk-js";

export const NO_ARGS = "{}";

export const NO_DEPOSIT: bigint = BigInt("0");

export const FIVE_TGAS: Gas = BigInt(5) * ONE_TERA_GAS;

export const THIRTY_TGAS: Gas = BigInt(30) * ONE_TERA_GAS;

export const THREE_HUNDRED_TGAS: Gas = BigInt(300) * ONE_TERA_GAS;

export const GAS_FOR_FT_TRANSFER_CALL: Gas = THIRTY_TGAS;

export const GAS_FOR_RESOLVE_TRANSFER: Gas = THIRTY_TGAS;

export const ONE_YOCTO_NEAR = BigInt("1");


export const DefaultSupportedStablecoins = {
  usdt: "usdt.tether.testnet",
  usdc: "074e3b87b1438cf561a6769d56c4aeea08eba2cfusdt_token.testnet",
};