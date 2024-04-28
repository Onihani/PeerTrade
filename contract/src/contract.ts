// Find all our documentation at https://docs.near.org
import {
  NearBindgen,
  near,
  call,
  view,
  Vector,
  AccountId,
  UnorderedMap,
  initialize,
  validateAccountId,
  PromiseOrValue,
  Balance,
  NearPromise,
} from "near-sdk-js";

// models
import { Order, Trade } from "./common/model";

// helpers
import { promiseResult } from "./common/helpers";

// constants
import {
  DefaultSupportedStablecoins,
  THIRTY_TGAS,
  NO_DEPOSIT,
} from "./common/constants";

// types
import {
  ActivateOrderArgs,
  BalanceOfArgs,
  CreateOrderArgs,
  DeactivateOrderArgs,
  FTTransferArgs,
  GetAccountArgs,
  GetAccountBalanceArgs,
  GetOrderArgs,
  GetOrdersArgs,
  InternalDepositArgs,
  InternalWithdrawArgs,
  Nullable,
  OrderType,
  TopupOrderArgs,
  TradeArgs,
  ValidateSupportedStableCoinArgs,
  WithdrawArgs,
  WithdrawOrderArgs,
  GetSingleOrderArgs,
  InternalTransferArgs,
  InitArgs,
  BalancesArgs,
  AccountRecord,
  WithdrawalCallbackArgs,
} from "./common/types";

@NearBindgen({})
class AutomatedP2PFactory {
  orders: Vector<Order> = new Vector<Order>("orders-list");
  trades: Vector<Trade> = new Vector<Trade>("trades-list");
  accountBalances: UnorderedMap<AccountRecord> =
    new UnorderedMap<AccountRecord>("account-balances-map");
  supportedTokens: UnorderedMap<AccountId> = new UnorderedMap<AccountId>(
    "supported-tokens-map"
  );
  supportedStableCoins: UnorderedMap<AccountId> = new UnorderedMap<AccountId>(
    "supported-stable-coins-map"
  );

  // initailize supported stablecoins
  @initialize({ privateFunction: true })
  init({
    supportedStableCoins = DefaultSupportedStablecoins,
    supportedTokens,
  }: InitArgs) {
    // initialize supported tokens
    Object.entries(supportedTokens).map(([coinName, accountId]) => {
      this.supportedTokens.set(coinName, accountId);
    });

    // initialize supported stablecoins
    Object.entries(supportedStableCoins).map(([coinName, accountId]) => {
      this.supportedStableCoins.set(coinName, accountId);
    });
  }

  @view({})
  supported_tokens(): Array<string> {
    return this.supportedTokens.toArray().flatMap(([key, _value]) => key);
  }

  @view({})
  supported_stablecoins(): Array<string> {
    return this.supportedStableCoins.toArray().flatMap(([key, _value]) => key);
  }

  @view({})
  balances({ accountId }: BalancesArgs): Nullable<Record<AccountId, Balance>> {
    const account = this.accountBalances.get(accountId);

    if (!account) return null;

    return account;
  }

  @view({})
  balance_of({ accountId, tokenId }: BalanceOfArgs): Balance {
    // check if the token id is a valid account id
    if (!validateAccountId(tokenId)) {
      throw new Error("Invalid token id.");
    }

    // get the account balances
    let account = this.accountBalances.get(accountId);

    // check if the account has a balance map
    // return 0 if the account has no balance map
    if (!account) BigInt(0);

    // return the balance of the token id
    return account[tokenId] ?? BigInt(0);
  }

  @view({})
  getOrder({ id }: GetOrderArgs): Order {
    return this.orders.get(id);
  }

  @view({})
  getOrders({
    type,
    merchant,
    tokenId,
    stableCoinSymbol,
    amount,
    rate,
    timestamp,
    // pagination
    fromIndex = 0,
    limit = 10,
  }: GetOrdersArgs): Array<Order> {
    // get all orders
    const orders = this.orders.toArray();

    // filter orders by type
    let filteredOrders: Array<Order> = orders.filter((order) => {
      return order.type === type;
    });

    // filter orders by merchant
    if (merchant && validateAccountId(merchant)) {
      filteredOrders = filteredOrders.filter((order) => {
        return order.merchant === merchant;
      });
    }

    // filter orders by token id
    if (tokenId && validateAccountId(tokenId)) {
      filteredOrders = filteredOrders.filter((order) => {
        return order.tokenId === tokenId;
      });
    }

    // filter orders by stable coin symbol
    if (
      stableCoinSymbol &&
      this.validateSupportedStablecoin({ symbol: stableCoinSymbol })
    ) {
      filteredOrders = filteredOrders.filter((order) => {
        return order.stablecoin === stableCoinSymbol;
      });
    }

    // filter orders by amount
    if (amount && (amount.from || amount.to)) {
      if (amount.from && amount.to) {
        filteredOrders = filteredOrders.filter((order) => {
          return (
            order.amount >= BigInt(amount.from) &&
            order.amount <= BigInt(amount.to)
          );
        });
      } else if (amount.from) {
        filteredOrders = filteredOrders.filter((order) => {
          return order.amount >= BigInt(amount.from);
        });
      } else if (amount.to) {
        filteredOrders = filteredOrders.filter((order) => {
          return order.amount <= BigInt(amount.to);
        });
      }
    }

    // filter orders by rate
    if (rate && (rate.from || rate.to)) {
      if (rate.from && rate.to) {
        filteredOrders = filteredOrders.filter((order) => {
          return (
            order.rate >= BigInt(rate.from) && order.rate <= BigInt(rate.to)
          );
        });
      } else if (rate.from) {
        filteredOrders = filteredOrders.filter((order) => {
          return order.rate >= BigInt(rate.from);
        });
      } else if (rate.to) {
        filteredOrders = filteredOrders.filter((order) => {
          return order.rate <= BigInt(rate.to);
        });
      }
    }

    // filter orders by timestamp
    if (timestamp) {
      if (timestamp.from && timestamp.to) {
        filteredOrders = filteredOrders.filter((order) => {
          return (
            order.timestamp >= BigInt(timestamp.from) &&
            order.timestamp <= BigInt(timestamp.to)
          );
        });
      } else if (timestamp.from) {
        filteredOrders = filteredOrders.filter((order) => {
          return order.timestamp >= BigInt(timestamp.from);
        });
      } else if (timestamp.to) {
        filteredOrders = filteredOrders.filter((order) => {
          return order.timestamp <= BigInt(timestamp.to);
        });
      }
    }

    // return paginated orders
    return filteredOrders.slice(fromIndex, fromIndex + limit);
  }

  @call({})
  createOrder({
    tokenId,
    stableCoinSymbol,
    rate,
    amount,
    orderType,
  }: CreateOrderArgs): number {
    near.log("createOrder", {
      tokenId,
      stableCoinSymbol,
      rate,
      amount,
      orderType,
    });

    /* CHECKS */
    // check if the stable coin is supported
    if (!this.validateSupportedStablecoin({ symbol: stableCoinSymbol })) {
      throw new Error("Stable coin not supported.");
    }

    // check if the token id is a valid account id
    if (!validateAccountId(tokenId)) {
      throw new Error("Invalid token id.");
    }

    // check if the rate is valid big int
    if (!BigInt(rate) || BigInt(rate) <= BigInt(0)) {
      throw new Error("Invalid rate.");
    }

    // check if the order type is valid
    if (!Object.values(OrderType).includes(orderType)) {
      throw new Error("Invalid order type.");
    }

    // check if the user has enough token or stable coin balance to create the order
    let orderToken: AccountId =
      orderType === OrderType.buy
        ? tokenId
        : this.supportedStableCoins.get(stableCoinSymbol);

    const merchantTokenBalance = this.getAccountBalance({
      accountId: near.predecessorAccountId(),
      tokenId: orderToken,
    });
    near.log("merchantTokenBalance", merchantTokenBalance);
    if (merchantTokenBalance < BigInt(amount)) {
      throw new Error("Insufficient balance.");
    }

    near.log("deductions");

    // deduct the amount from the merchant's account balance
    let account = this.accountBalances.get(near.predecessorAccountId());
    account[orderToken] = merchantTokenBalance - BigInt(amount);
    this.accountBalances.set(near.predecessorAccountId(), account);

    near.log("creating order");

    // create the order
    const newOrder = new Order({
      id: this.orders.length,
      tokenId,
      stablecoin: stableCoinSymbol,
      rate: BigInt(rate),
      amount: BigInt(amount),
      merchant: near.predecessorAccountId(),
      type: orderType,
      timestamp: near.blockTimestamp(),
    });

    // add the order to the orders list
    this.orders.push(newOrder);

    // log the created order event
    near.log("created_order", Order.toSerializedObject(newOrder));

    return newOrder.id;
  }

  @call({})
  activateOrder({ id }: ActivateOrderArgs): void {
    const order = this.orders.get(id);

    if (!order) {
      throw new Error("Order does not exist.");
    }

    // check if the user is the merchant of the order
    if (order.merchant !== near.predecessorAccountId()) {
      throw new Error("Cannot activate another merchant's order.");
    }

    // check if the order is already active
    if (order.active) {
      throw new Error("Order is already active.");
    }

    order.active = true;
    this.orders.replace(id, order);

    // TODO: log the activated order event
  }

  @call({})
  deactivateOrder({ id }: DeactivateOrderArgs): void {
    const order = this.orders.get(id);

    if (!order) {
      throw new Error("Order does not exist.");
    }

    // check if the user is the merchant of the order
    if (order.merchant !== near.predecessorAccountId()) {
      throw new Error("Cannot deactivate another merchant's order.");
    }

    // check if the order is already inactive
    if (!order.active) {
      throw new Error("Order is already inactive.");
    }

    order.active = false;
    this.orders.replace(id, order);

    // TODO: log the deactivated order event
  }

  @call({})
  topupOrder({ id, amount }: TopupOrderArgs): void {
    // convert the amount to a big int
    const amt = BigInt(amount);

    const order = this.orders.get(id);
    if (!order) {
      throw new Error("Order does not exist.");
    }

    // check if the user is the merchant of the order
    if (order.merchant !== near.predecessorAccountId()) {
      throw new Error("Cannot topup another merchant's order.");
    }

    // check if the amount is valid big int
    if (!amt || amt <= BigInt(0)) {
      throw new Error("Invalid amount.");
    }

    // check if the user has enough token or stable coin balance to topup the order
    const orderToken: AccountId =
      order.type === OrderType.buy
        ? order.tokenId
        : this.supportedStableCoins.get(order.stablecoin);

    const merchantTokenBalance = this.getAccountBalance({
      accountId: near.predecessorAccountId(),
      tokenId: orderToken,
    });
    if (merchantTokenBalance < amt) {
      throw new Error("Insufficient balance.");
    }

    // deduct the amount from the merchant's account balance
    let account = this.accountBalances.get(near.predecessorAccountId());
    const newBalance = merchantTokenBalance - amt;
    account[orderToken] = newBalance;
    this.accountBalances.set(near.predecessorAccountId(), account);

    // add the amount to the order amount
    order.amount += amt;
    this.orders.replace(id, order);

    // TODO: log the topup order event
  }

  @call({})
  withdrawOrder({ id, amount }: WithdrawOrderArgs): void {
    // convert the amount to a big int
    const amt = BigInt(amount);

    const order = this.orders.get(id);
    if (!order) {
      throw new Error("Order does not exist.");
    }

    // check if the user is the merchant of the order
    if (order.merchant !== near.predecessorAccountId()) {
      throw new Error("Cannot withdraw from another merchant's order.");
    }

    // check if the order is active
    if (order.active) {
      throw new Error("Cannot withdraw from an active order.");
    }

    // check if the amount is valid big int
    if (!amt || amt <= BigInt(0)) {
      throw new Error("Invalid amount.");
    }

    // check if the amount is less than the order amount
    if (amt > order.amount) {
      throw new Error("Withdraw amount exceeds order amount.");
    }

    // deduct the amount from the order amount
    order.amount -= amt;
    this.orders.replace(id, order);

    // deposit the amount to the merchant's account balance
    const orderToken: AccountId =
      order.type === OrderType.buy
        ? order.tokenId
        : this.supportedStableCoins.get(order.stablecoin);
    this.internalDeposit({
      accountId: near.predecessorAccountId(),
      tokenId: orderToken,
      amount: amt,
    });

    // TODO: log the withdraw order event
  }

  @call({})
  trade({ orderId, amount }: TradeArgs): number {
    // convert the amount to a big int
    const tradeAmount = BigInt(amount);

    // check if the order exists
    const order = this.orders.get(orderId);

    if (!order) {
      throw new Error("Order does not exist.");
    }

    // check if the trade amount is valid
    if (!tradeAmount || tradeAmount <= BigInt(0)) {
      throw new Error("Invalid trade amount.");
    }

    // check if the user is the merchant of the order
    if (order.merchant === near.predecessorAccountId()) {
      throw new Error("Cannot trade with own order.");
    }

    // check if the user has enough token or stable coin balance to trade
    const tradeToken: AccountId =
      order.type === OrderType.buy
        ? this.supportedStableCoins.get(order.stablecoin)
        : order.tokenId;
    const orderToken: AccountId =
      order.type === OrderType.buy
        ? order.tokenId
        : this.supportedStableCoins.get(order.stablecoin);

    const userTokenBalance = this.getAccountBalance({
      accountId: near.predecessorAccountId(),
      tokenId: tradeToken,
    });

    if (userTokenBalance < tradeAmount) {
      throw new Error("Insufficient balance.");
    }

    // convert the order amount to the order token amount via the rate
    // Todo: replace 18 with actual decimals for the token
    const orderAmount =
      (tradeAmount / order.rate) * BigInt(`1${"0".repeat(18)}`);

    // check if the order amount is less than the order amount
    if (orderAmount > order.amount) {
      throw new Error("Trade amount exceeds order amount.");
    }

    // deduct the trade amount from the user's account balance
    // add the trade amount to the merchant's account balance
    this.internalTransfer({
      senderId: near.predecessorAccountId(),
      receiverId: order.merchant,
      tokenId: tradeToken,
      amount: tradeAmount,
    });

    // deduct the amount from the order amount
    order.amount -= orderAmount;
    // update the order in the orders list
    this.orders.replace(orderId, order);
    // deposit the amount to the user's account balance
    this.internalDeposit({
      accountId: near.predecessorAccountId(),
      tokenId: orderToken,
      amount: orderAmount,
    });

    // create the trade
    const newTrade = new Trade({
      id: this.trades.length,
      orderId,
      amount: tradeAmount,
      buyer: near.predecessorAccountId(),
      seller: order.merchant,
      timestamp: near.blockTimestamp(),
    });

    // add the trade to the trades list
    this.trades.push(newTrade);

    // log the trade event
    near.log("created_trade", Trade.toSerializedObject(newTrade));

    return newTrade.id;
  }

  @call({ payableFunction: true })
  widthdraw({ tokenId, amount }: WithdrawArgs): NearPromise {
    // convert the amount to a big int
    const amt = BigInt(amount);

    // check if the token id is a valid account id
    if (!validateAccountId(tokenId)) {
      throw new Error("Invalid token id.");
    }

    // check if the amount is valid big int
    if (!amt || amt <= BigInt(0)) {
      throw new Error("Invalid amount.");
    }

    // check if the user has enough token balance to withdraw
    const userTokenBalance = this.getAccountBalance({
      accountId: near.predecessorAccountId(),
      tokenId,
    });

    if (userTokenBalance < amt) {
      throw new Error("Insufficient balance.");
    }

    // - transfer the amount to the user's actual wallet
    const promise = NearPromise.new(tokenId)
      .functionCall(
        "ft_transfer",
        JSON.stringify({
          receiver_id: near.predecessorAccountId(),
          amount: amount.toString(),
          msg: "Withdraw from AutomatedP2P",
        }),
        near.attachedDeposit(),
        THIRTY_TGAS
      )
      .then(
        NearPromise.new(near.currentAccountId()).functionCall(
          "withdrawal_callback",
          JSON.stringify({
            amount: amount.toString(),
            receiver_id: near.predecessorAccountId(),
            tokenId,
          }),
          NO_DEPOSIT,
          THIRTY_TGAS
        )
      );

    return promise.asReturn();
  }

  @call({ privateFunction: true })
  withdrawal_callback({
    amount,
    receiver_id,
    tokenId,
  }: WithdrawalCallbackArgs): void {
    // check if the caller is the contract itself
    if (near.predecessorAccountId() !== near.currentAccountId()) {
      throw new Error("Unauthorized.");
    }

    // convert the amount to a big int
    const amt = BigInt(amount);

    // check if the token id is a valid account id
    if (!validateAccountId(tokenId)) {
      throw new Error("Invalid token id.");
    }

    // check if the amount is valid big int
    if (!amt || amt <= BigInt(0)) {
      throw new Error("Invalid amount.");
    }

    // check if the ft_transfer was successful
    const { success } = promiseResult();

    if (!success) {
      throw new Error("Withdrawal failed.");
    }

    // deduct the amount from the user's account balance
    this.internalWithdraw({
      accountId: receiver_id,
      tokenId,
      amount: amt,
    });

    // log the withdrawal callback event
    near.log("withdrawal_callback", {
      amount: amount.toString(),
      receiver_id,
      tokenId,
    });
  }

  @call({ payableFunction: true })
  ft_on_transfer({
    sender_id,
    amount,
    msg,
  }: FTTransferArgs): PromiseOrValue<bigint> {
    near.log("ft_on_transfer", { sender_id, amount, msg });

    // check if the amount is valid big int
    if (!BigInt(amount)) {
      throw new Error("Invalid amount.");
    }

    // TODO:
    // 1. Check if user has enough storage balance to store the amount
    // 2. Check if the sender is a valid account id
    // else return the amount back to the sender (refund)

    // add the amount to the users account balances
    let account = this.accountBalances.get(sender_id);
    if (account) {
      const oldBalance = account[near.predecessorAccountId()] ?? BigInt(0);
      const newBalance = oldBalance + BigInt(amount);
      account[near.predecessorAccountId()] = newBalance;
      this.accountBalances.set(sender_id, account);
    } else {
      const balanceRecord: AccountRecord = {
        [near.predecessorAccountId()]: BigInt(amount),
      };
      this.accountBalances.set(sender_id, balanceRecord);
    }

    return BigInt(0);
  }

  /* Internal functions */
  validateSupportedStablecoin({
    symbol,
  }: ValidateSupportedStableCoinArgs): boolean {
    if (!this.supportedStableCoins.get(symbol)) {
      return false;
    }

    return true;
  }

  getAccount({ accountId }: GetAccountArgs): Nullable<AccountRecord> {
    return this.accountBalances.get(accountId);
  }

  getAccountBalance({ accountId, tokenId }: GetAccountBalanceArgs): Balance {
    const account = this.getAccount({ accountId });
    if (!account) {
      return BigInt(0);
    }

    return account[tokenId] ?? BigInt(0);
  }

  getSingleOrder({ id }: GetSingleOrderArgs): Nullable<Order> {
    return this.orders.get(id);
  }

  internalDeposit({ accountId, tokenId, amount }: InternalDepositArgs): void {
    const account = this.accountBalances.get(accountId);
    if (account) {
      const oldBalance = account[tokenId] ?? BigInt(0);
      const newBalance = oldBalance + BigInt(amount);
      account[tokenId] = newBalance;
      this.accountBalances.set(accountId, account);
    } else {
      const balanceRecord: AccountRecord = {
        [tokenId]: BigInt(amount),
      };
      this.accountBalances.set(tokenId, balanceRecord);
    }
  }

  internalWithdraw({ accountId, tokenId, amount }: InternalWithdrawArgs): void {
    const account = this.accountBalances.get(accountId);
    if (!account) {
      throw new Error("Account does not exist.");
    }

    const oldBalance = account[tokenId] ?? BigInt(0);
    if (oldBalance < amount) {
      throw new Error("Insufficient balance.");
    }

    const newBalance = oldBalance - BigInt(amount);
    account[tokenId] = newBalance;

    this.accountBalances.set(tokenId, account);
  }

  internalTransfer({
    senderId,
    receiverId,
    tokenId,
    amount,
  }: InternalTransferArgs): void {
    this.internalWithdraw({ accountId: senderId, tokenId, amount });
    this.internalDeposit({ accountId: receiverId, tokenId, amount });
  }
}
