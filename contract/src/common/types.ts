import { AccountId, Balance } from "near-sdk-js";

import type { Order, Trade } from "./model";

export type Nullable<T> = T | null;

export enum OrderType {
  buy = "buy",
  sell = "sell",
}

export type Range = {
  from: bigint;
  to: bigint;
};

export type AccountRecord = Record<AccountId, Balance>;

export type InitArgs = {
  supportedTokens: Record<string, AccountId>;
  supportedStableCoins: Record<string, AccountId>;
};

export type BalancesArgs = {
  accountId: AccountId;
};

export type BalanceOfArgs = {
  accountId: AccountId;
  tokenId: AccountId;
};

export type CreateOrderArgs = {
  tokenId: AccountId;
  stableCoinSymbol: string;
  rate: bigint;
  amount: Balance;
  orderType: OrderType;
};

export type GetOrderArgs = {
  id: number;
};

export type GetOrdersArgs = {
  type: OrderType;
  merchant: AccountId;
  tokenId: AccountId;
  stableCoinSymbol: string;
  rate: Range;
  amount: Range;
  timestamp: Range;
  fromIndex: number;
  limit: number;
};

export type TradeArgs = {
  orderId: number;
  amount: Balance;
};

export type ActivateOrderArgs = {
  id: number;
};

export type DeactivateOrderArgs = {
  id: number;
};

export type TopupOrderArgs = {
  id: number;
  amount: Balance;
};

export type WithdrawOrderArgs = {
  id: number;
  amount: Balance;
};

export type WithdrawArgs = {
  tokenId: AccountId;
  amount: Balance;
};

export type WithdrawalCallbackArgs = {
  tokenId: AccountId;
  receiver_id: AccountId;
  amount: Balance;
};

export type FTTransferArgs = {
  sender_id: AccountId;
  amount: bigint;
  msg: string;
};

/* internal function typea */
export type ValidateSupportedStableCoinArgs = {
  symbol: string;
};

export type GetAccountArgs = {
  accountId: AccountId;
};

export type GetAccountBalanceArgs = {
  accountId: AccountId;
  tokenId: AccountId;
};

export type GetSingleOrderArgs = {
  id: number;
};

export type InternalDepositArgs = {
  accountId: AccountId;
  tokenId: AccountId;
  amount: Balance;
};

export type InternalWithdrawArgs = {
  accountId: AccountId;
  tokenId: AccountId;
  amount: Balance;
};

export type InternalTransferArgs = {
  senderId: AccountId;
  receiverId: AccountId;
  tokenId: AccountId;
  amount: Balance;
};

export type SerializedOrder = Omit<Order, "rate" | "amount" | "timestamp"> & {
  rate: string;
  amount: string;
  timestamp: string;
};

export type SerializedTrade = Omit<Trade, "amount" | "timestamp"> & {
  amount: string;
  timestamp: string;
}; 