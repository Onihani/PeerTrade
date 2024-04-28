import { Worker, NearAccount } from "near-workspaces";
import anyTest, { TestFn } from "ava";
import { setDefaultResultOrder } from "dns";
setDefaultResultOrder("ipv4first"); // temp fix for node >v17

// models
import { Order } from "../src/common/model";

// types
import { OrderType } from "../src/common/types";

// Global context
const test = anyTest as TestFn<{
  worker: Worker;
  accounts: Record<string, NearAccount>;
}>;

test.beforeEach(async (t) => {
  t.log("Starting test setup");

  // Create sandbox, accounts, deploy contracts, etc.
  const worker = (t.context.worker = await Worker.init());

  // Deploy contract
  const root = worker.rootAccount;

  // Create Test accounts
  const nat = await root.createSubAccount("nat");
  const sarah = await root.createSubAccount("sarah");
  const contract = await root.createSubAccount("test-account");
  const ghscContract = await root.createSubAccount("ghsc-contract");
  const fakeEtherContract = await root.createSubAccount("fake-ether-contract");

  // Deploy the ghsc contract
  t.log("deploying contracts");
  await ghscContract.deploy(
    "./sandbox-ts/fungible-token/release/contract.wasm"
  );
  await fakeEtherContract.deploy(
    "./sandbox-ts/fungible-token/release/contract.wasm"
  );
  // Get wasm file path from package.json test script in folder above
  await contract.deploy(process.argv[2]);

  t.log("initializing contract");

  // init contract
  await root.call(ghscContract, "init", {
    owner_id: root.accountId,
    total_supply: `${1_000_000_000}${"0".repeat(6)}`, // 1 billion GHSC tokens
    metadata: {
      spec: "ft-1.0.0", // Should be ft-1.0.0 to indicate that a Fungible Token contract adheres to the current versions of this Metadata and the Fungible Token Core specs. This will allow consumers of the Fungible Token to know if they support the features of a given contract.
      name: "Ghana Cedi Coin", // The human-readable name of the token.
      symbol: "GHSC", // The abbreviation, like wETH or AMPL.
      icon: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaWQ9IkxheWVyXzEiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDMyIDMyOyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMzIgMzIiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I0ZCQzM0RTt9Cgkuc3Qxe2ZpbGw6I0U1QTUzMzt9Cgkuc3Qye2ZpbGw6I0U0RURGMjt9Cjwvc3R5bGU+PGcgaWQ9IlRva2VuIj48Zz48cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTYsMkM4LjI4LDIsMiw4LjI4LDIsMTZzNi4yOCwxNCwxNCwxNHMxNC02LjI4LDE0LTE0UzIzLjcyLDIsMTYsMnogTTE2LDI2Yy01LjUxNCwwLTEwLTQuNDg2LTEwLTEwICAgIFMxMC40ODYsNiwxNiw2czEwLDQuNDg2LDEwLDEwUzIxLjUxNCwyNiwxNiwyNnoiLz48cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTYsNkMxMC40ODYsNiw2LDEwLjQ4Niw2LDE2czQuNDg2LDEwLDEwLDEwczEwLTQuNDg2LDEwLTEwUzIxLjUxNCw2LDE2LDZ6IE0yMC4yNDQsMTcuMjcybC0xLjE1LDAuNjI2ICAgIGMtMC41MDQsMC4yNzUtMC45MTcsMC42ODctMS4xOTMsMS4xOWwtMC42MzEsMS4xNDZjLTAuMjU1LDAuNDY0LTAuNzQxLDAuNzUxLTEuMjcsMC43NTFzLTEuMDE1LTAuMjg4LTEuMjctMC43NTFsLTAuNjMtMS4xNDcgICAgYy0wLjI3Ny0wLjUwNC0wLjY5LTAuOTE2LTEuMTk1LTEuMTkxbC0xLjE0OC0wLjYyNUMxMS4yODksMTcuMDE5LDExLDE2LjUzMSwxMSwxNnMwLjI4OS0xLjAxOSwwLjc1Ni0xLjI3MmwxLjE1LTAuNjI2ICAgIGMwLjUwNC0wLjI3NSwwLjkxNy0wLjY4NywxLjE5My0xLjE5bDAuNjMxLTEuMTQ2YzAuMjU1LTAuNDY0LDAuNzQxLTAuNzUxLDEuMjctMC43NTFzMS4wMTUsMC4yODgsMS4yNywwLjc1MWwwLjYzLDEuMTQ3ICAgIGMwLjI3NywwLjUwMywwLjY5LDAuOTE1LDEuMTk0LDEuMTlsMS4xNDksMC42MjVDMjAuNzExLDE0Ljk4MSwyMSwxNS40NjksMjEsMTZTMjAuNzExLDE3LjAxOSwyMC4yNDQsMTcuMjcyeiIvPjxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0yMC4yNDMsMTQuNzI3bC0xLjE0OS0wLjYyNWMtMC41MDQtMC4yNzUtMC45MTctMC42ODctMS4xOTQtMS4xOWwtMC42My0xLjE0NyAgICBjLTAuMjU1LTAuNDYzLTAuNzQxLTAuNzUxLTEuMjctMC43NTFzLTEuMDE1LDAuMjg4LTEuMjcsMC43NTFsLTAuNjMsMS4xNDZjLTAuMjc2LDAuNTA0LTAuNjg5LDAuOTE2LTEuMTkzLDEuMTlsLTEuMTUsMC42MjYgICAgQzExLjI4OSwxNC45ODEsMTEsMTUuNDY5LDExLDE2czAuMjg5LDEuMDE5LDAuNzU3LDEuMjczbDEuMTQ4LDAuNjI1YzAuNTA1LDAuMjc1LDAuOTE4LDAuNjg3LDEuMTk1LDEuMTkxbDAuNjMsMS4xNDcgICAgYzAuMjU1LDAuNDYzLDAuNzQxLDAuNzUxLDEuMjcsMC43NTFjMC41MjksMCwxLjAxNS0wLjI4OCwxLjI3LTAuNzUxbDAuNjMxLTEuMTQ2YzAuMjc2LTAuNTA0LDAuNjg5LTAuOTE2LDEuMTkzLTEuMTlsMS4xNS0wLjYyNiAgICBDMjAuNzExLDE3LjAxOSwyMSwxNi41MzEsMjEsMTZTMjAuNzExLDE0Ljk4MSwyMC4yNDMsMTQuNzI3eiIvPjwvZz48L2c+PC9zdmc+", // Icon of the fungible token.
      reference: null, // A link to a valid JSON file containing various keys offering supplementary details on the token
      reference_hash: null, // The base64-encoded sha256 hash of the JSON file contained in the reference field. This is to guard against off-chain tampering.
      decimals: 6, // used in frontends to show the proper significant digits of a token. This concept is explained well in this OpenZeppelin post. https://docs.openzeppelin.com/contracts/3.x/erc20#a-note-on-decimals
    },
  });
  await root.call(fakeEtherContract, "init", {
    owner_id: root.accountId,
    total_supply: `${1_000_000_000}${"0".repeat(18)}`, // 1 billion fake ether
    metadata: {
      spec: "ft-1.0.0",
      name: "Ether",
      symbol: "ETH",
      icon: "data:image/png;base64,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",
      reference: null,
      reference_hash: null,
      decimals: 18,
    },
  });
  await root.call(contract, "init", {
    supportedTokens: {
      eth: fakeEtherContract.accountId,
    },
    supportedStableCoins: {
      ghsc: ghscContract.accountId,
    },
  });

  // get the storage_balance_bounds
  const storageBalanceBounds: {
    min: string;
    max: string;
  } = await ghscContract.view("storage_balance_bounds", {});

  // register p2p contract on token contracts
  await root.call(
    ghscContract,
    "storage_deposit",
    {
      account_id: contract.accountId,
    },
    {
      attachedDeposit: storageBalanceBounds.min,
    }
  );
  await root.call(
    fakeEtherContract,
    "storage_deposit",
    {
      account_id: contract.accountId,
    },
    {
      attachedDeposit: storageBalanceBounds.min,
    }
  );

  t.log("Test setup done");

  // Save state for test runs, it is unique for each test
  t.context.accounts = {
    root,
    nat,
    sarah,
    contract,
    ghscContract,
    fakeEtherContract,
  };
});

test.afterEach.always(async (t) => {
  // Stop Sandbox server
  await t.context.worker.tearDown().catch((error) => {
    console.log("Failed to stop the Sandbox:", error);
  });
});

test("returns supported stablecoins", async (t) => {
  const { contract } = t.context.accounts;

  const result: Array<string> = await contract.view(
    "supported_stablecoins",
    {}
  );

  t.assert(result.includes("ghsc"));
});

test("returns supported tokens", async (t) => {
  const { contract } = t.context.accounts;

  const result: Array<string> = await contract.view("supported_tokens", {});

  t.assert(result.includes("eth"));
});

test("returns balance of account", async (t) => {
  const { contract, ghscContract, root, sarah } = t.context.accounts;

  // get the storage_balance_bounds
  const storageBalanceBounds: {
    min: string;
    max: string;
  } = await ghscContract.view("storage_balance_bounds", {});

  // register Sarah's account
  await root.call(
    ghscContract,
    "storage_deposit",
    {
      account_id: sarah.accountId,
    },
    {
      attachedDeposit: storageBalanceBounds.min,
    }
  );

  // mint some tokens for Sarah's account
  await root.call(ghscContract, "mint", {
    accountId: sarah.accountId,
    amount: `${100_000_000}${"0".repeat(6)}`, // 100 million GHSC tokens
    memo: "Minting GHSC tokens for Sarah's account",
  });

  // deposit some tokens from Sarah to the contract
  await sarah.call(
    ghscContract,
    "ft_transfer_call",
    {
      receiver_id: contract.accountId,
      amount: `${10_000_000}${"0".repeat(6)}`, // 10 million GHSC tokens
      memo: "Depositing GHSC tokens to contract",
      msg: "",
    },
    {
      attachedDeposit: "1",
      gas: `${100_000_000_000_000}`, // 100 Tgas
    }
  );

  const balances: string = await contract.view("balances", {
    accountId: sarah.accountId,
  });
  const balance: string = await contract.view("balance_of", {
    accountId: sarah.accountId,
    tokenId: ghscContract.accountId,
  });

  t.deepEqual(balances, {
    [ghscContract.accountId]: `${10_000_000}${"0".repeat(6)}`, // 10 million GHSC tokens
  });
  t.is(balance, `${10_000_000}${"0".repeat(6)}`.toString());
});

test("create order", async (t) => {
  const { contract, fakeEtherContract, root } = t.context.accounts;

  // deposit some fake ether from root to the contract
  await root.call(
    fakeEtherContract,
    "ft_transfer_call",
    {
      receiver_id: contract.accountId,
      amount: `${10_000_000}${"0".repeat(18)}`, // 10 million fake ether
      memo: "Depositing fake ether to contract",
      msg: "",
    },
    {
      attachedDeposit: "1",
      gas: `${100_000_000_000_000}`, // 100 Tgas
    }
  );

  // create an order with root's account
  const orderId: number = await root.call(contract, "createOrder", {
    tokenId: fakeEtherContract.accountId,
    stableCoinSymbol: "ghsc",
    // 1 fake ether = 43_481 Ghs
    rate: `${43_481 * 10 ** 6}`,
    amount: `${1_000_000}${"0".repeat(18)}`, // 1 million fake ether
    orderType: OrderType.buy, // merchant is selling fake ether
  });

  const order: Order = await contract.view("getOrder", { id: orderId });

  t.is(order.merchant, root.accountId);
});

test("trade order", async (t) => {
  const { contract, ghscContract, fakeEtherContract, root, sarah } =
    t.context.accounts;

  // get the storage_balance_bounds
  const storageBalanceBounds: {
    min: string;
    max: string;
  } = await ghscContract.view("storage_balance_bounds", {});

  // register Sarah's account
  await root.call(
    ghscContract,
    "storage_deposit",
    {
      account_id: sarah.accountId,
    },
    {
      attachedDeposit: storageBalanceBounds.min,
    }
  );

  // mint some tokens for Sarah's account
  await root.call(ghscContract, "mint", {
    accountId: sarah.accountId,
    amount: `${100_000_000}${"0".repeat(6)}`, // 100 million GHSC tokens
    memo: "Minting GHSC tokens for Sarah's account",
  });

  // deposit some tokens from Sarah to the contract
  await sarah.call(
    ghscContract,
    "ft_transfer_call",
    {
      receiver_id: contract.accountId,
      amount: `${10_000_000}${"0".repeat(6)}`, // 10 million GHSC tokens
      memo: "Depositing GHSC tokens to contract",
      msg: "",
    },
    {
      attachedDeposit: "1",
      gas: `${100_000_000_000_000}`, // 100 Tgas
    }
  );

  // deposit some fake ether from root to the contract
  await root.call(
    fakeEtherContract,
    "ft_transfer_call",
    {
      receiver_id: contract.accountId,
      amount: `${10_000_000}${"0".repeat(18)}`, // 10 million fake ether
      memo: "Depositing fake ether to contract",
      msg: "",
    },
    {
      attachedDeposit: "1",
      gas: `${100_000_000_000_000}`, // 100 Tgas
    }
  );

  // create an order with root's account
  const orderId: number = await root.call(contract, "createOrder", {
    tokenId: fakeEtherContract.accountId,
    stableCoinSymbol: "ghsc",
    // 1 fake ether = 43_481 Ghs
    rate: `${43_481}${"0".repeat(6)}`,
    amount: `${1_000_000}${"0".repeat(18)}`, // 1 million fake ether
    orderType: OrderType.buy, // merchant is selling fake ether
  });

  // use sarah's account to trade some fake ether with her GHSC tokens
  const tradeId = await sarah.call(
    contract,
    "trade",
    {
      orderId: orderId,
      amount: `${43_481}${"0".repeat(6)}`, // 1 fake ether = 43_481 Ghs
    },
    {
      gas: `${100_000_000_000_000}`, // 100 Tgas
    }
  );

  // get sarah's account balance
  const sarahBalance: string = await contract.view("balance_of", {
    accountId: sarah.accountId,
    tokenId: fakeEtherContract.accountId,
  });

  t.is(tradeId, 0);
  t.is(sarahBalance, `${1}${"0".repeat(18)}`);
});

test("activate order", async (t) => {
  const { contract, fakeEtherContract, root } = t.context.accounts;

  // deposit some fake ether from root to the contract
  await root.call(
    fakeEtherContract,
    "ft_transfer_call",
    {
      receiver_id: contract.accountId,
      amount: `${10_000_000}${"0".repeat(18)}`, // 10 million fake ether
      memo: "Depositing fake ether to contract",
      msg: "",
    },
    {
      attachedDeposit: "1",
      gas: `${100_000_000_000_000}`, // 100 Tgas
    }
  );

  // create an order with root's account
  const orderId: number = await root.call(contract, "createOrder", {
    tokenId: fakeEtherContract.accountId,
    stableCoinSymbol: "ghsc",
    // 1 fake ether = 43_481 Ghs
    rate: `${43_481 * 10 ** 6}`,
    amount: `${1_000_000}${"0".repeat(18)}`, // 1 million fake ether
    orderType: OrderType.buy, // merchant is selling fake ether
  });

  // activate the order
  await root.call(contract, "activateOrder", { id: orderId });

  const order: Order = await contract.view("getOrder", { id: orderId });

  t.is(order.active, true);
});

test("deactivate order", async (t) => {
  const { contract, fakeEtherContract, root } = t.context.accounts;

  // deposit some fake ether from root to the contract
  await root.call(
    fakeEtherContract,
    "ft_transfer_call",
    {
      receiver_id: contract.accountId,
      amount: `${10_000_000}${"0".repeat(18)}`, // 10 million fake ether
      memo: "Depositing fake ether to contract",
      msg: "",
    },
    {
      attachedDeposit: "1",
      gas: `${100_000_000_000_000}`, // 100 Tgas
    }
  );

  // create an order with root's account
  const orderId: number = await root.call(contract, "createOrder", {
    tokenId: fakeEtherContract.accountId,
    stableCoinSymbol: "ghsc",
    // 1 fake ether = 43_481 Ghs
    rate: `${43_481 * 10 ** 6}`,
    amount: `${1_000_000}${"0".repeat(18)}`, // 1 million fake ether
    orderType: OrderType.buy, // merchant is selling fake ether
  });

  // activate the order
  await root.call(contract, "activateOrder", { id: orderId });

  // deactivate the order
  await root.call(contract, "deactivateOrder", { id: orderId });

  const order: Order = await contract.view("getOrder", { id: orderId });

  t.is(order.active, false);
});

test("topup order", async (t) => {
  const { contract, fakeEtherContract, root } = t.context.accounts;

  // deposit some fake ether from root to the contract
  await root.call(
    fakeEtherContract,
    "ft_transfer_call",
    {
      receiver_id: contract.accountId,
      amount: `${10_000_000}${"0".repeat(18)}`, // 10 million fake ether
      memo: "Depositing fake ether to contract",
      msg: "",
    },
    {
      attachedDeposit: "1",
      gas: `${100_000_000_000_000}`, // 100 Tgas
    }
  );

  // create an order with root's account
  const orderId: number = await root.call(contract, "createOrder", {
    tokenId: fakeEtherContract.accountId,
    stableCoinSymbol: "ghsc",
    // 1 fake ether = 43_481 Ghs
    rate: `${43_481 * 10 ** 6}`,
    amount: `${1_000_000}${"0".repeat(18)}`, // 1 million fake ether
    orderType: OrderType.buy, // merchant is selling fake ether
  });

  // topup the order
  await root.call(contract, "topupOrder", {
    id: orderId,
    amount: `${1_000_000}${"0".repeat(18)}`, // 1 million fake ether
  });

  const order: Order = await contract.view("getOrder", { id: orderId });

  t.is(order.amount.toString(), `${2_000_000}${"0".repeat(18)}`.toString());
});

test("withdraw order", async (t) => {
  const { contract, fakeEtherContract, root } = t.context.accounts;

  // deposit some fake ether from root to the contract
  await root.call(
    fakeEtherContract,
    "ft_transfer_call",
    {
      receiver_id: contract.accountId,
      amount: `${10_000_000}${"0".repeat(18)}`, // 10 million fake ether
      memo: "Depositing fake ether to contract",
      msg: "",
    },
    {
      attachedDeposit: "1",
      gas: `${100_000_000_000_000}`, // 100 Tgas
    }
  );

  // create an order with root's account
  const orderId: number = await root.call(contract, "createOrder", {
    tokenId: fakeEtherContract.accountId,
    stableCoinSymbol: "ghsc",
    // 1 fake ether = 43_481 Ghs
    rate: `${43_481 * 10 ** 6}`,
    amount: `${1_000_000}${"0".repeat(18)}`, // 1 million fake ether
    orderType: OrderType.buy, // merchant is selling fake ether
  });

  // withdraw the order
  await root.call(contract, "withdrawOrder", {
    id: orderId,
    amount: `${1_000_000}${"0".repeat(18)}`,
  });

  const order: Order = await contract.view("getOrder", { id: orderId });

  t.is(order.amount.toString(), "0");
});
