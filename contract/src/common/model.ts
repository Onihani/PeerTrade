// imports
import { AccountId } from "near-sdk-js";

// types
import { OrderType, SerializedOrder, SerializedTrade } from "./types";

export class Order {
  id: number; // Unique identifier of the order
  tokenId: AccountId; // Token ID of the token being sold
  stablecoin: string; // name of the supported stablecoin being used to sell the token
  rate: bigint; // Price per unit of the selling token in the stablecoin
  amount: bigint; // Amount of the selling token being sold
  merchant: AccountId; // Account ID of the merchant selling/buying the token
  type: OrderType; // Type of the order (buy/sell)
  timestamp: bigint; // Timestamp of the order
  active: boolean; // Whether the order is active or not

  constructor({
    id,
    tokenId,
    stablecoin,
    rate,
    amount,
    merchant,
    type,
    timestamp,
  }: Omit<Order, "active">) {
    this.id = id;
    this.tokenId = tokenId;
    this.stablecoin = stablecoin;
    this.rate = rate;
    this.amount = amount;
    this.merchant = merchant;
    this.type = type;
    this.timestamp = timestamp;
    this.active = false;
  }

  static bigIntFields(): string[] {
    return ["rate", "amount", "timestamp"];
  }

  static serialize(order: Order): Uint8Array {
    // convert order to json string (consider converting bigint to string)
    const orderString = JSON.stringify(
      order,
      (_key, value) => {
        if (typeof value === "bigint") {
          return value.toString();
        }
        return value;
      },
      2
    );

    // convert json string to Uint8Array
    return Uint8Array.from(
      orderString.split("").map((char) => char.charCodeAt(0))
    );
  }

  static deserialize(buffer: Uint8Array): Order {
    // convert Uint8Array to string
    const orderString = String.fromCharCode.apply(null, buffer)();

    // convert string to json object
    return JSON.parse(orderString, (key, value) => {
      if (Order.bigIntFields().includes(key)) {
        return BigInt(value);
      }
      return value;
    });
  }

  static toSerializedObject(order: Order): SerializedOrder {
    return {
      id: order.id,
      tokenId: order.tokenId,
      stablecoin: order.stablecoin,
      rate: order.rate.toString(),
      amount: order.amount.toString(),
      merchant: order.merchant,
      type: order.type,
      timestamp: order.timestamp.toString(),
      active: order.active,
    };
  }
}

export class Trade {
  id: number; // Unique identifier of the trade
  orderId: number; // Order ID of the order being traded
  amount: bigint; // Amount of the selling token being traded
  buyer: AccountId; // Account ID of the buyer
  seller: AccountId; // Account ID of the seller
  timestamp: bigint; // Timestamp of the trade

  constructor({ id, orderId, amount, buyer, seller, timestamp }: Trade) {
    this.id = id;
    this.orderId = orderId;
    this.amount = amount;
    this.buyer = buyer;
    this.seller = seller;
    this.timestamp = timestamp;
  }

  static toSerializedObject(trade: Trade): SerializedTrade {
    return {
      id: trade.id,
      orderId: trade.orderId,
      amount: trade.amount.toString(),
      buyer: trade.buyer,
      seller: trade.seller,
      timestamp: trade.timestamp.toString(),
    };
  }
}
