const hh = {
  result: {
    receipts_outcome: [
      {
        block_hash: "5HJ84fyr1p63eVopHpvxF3jaBduQVCtvcZYbbbLvtcvN",
        id: "GQGQnWM3nNG9yhfwC5ucRt7zC1mgGkDHYrWCT321SBpu",
        outcome: {
          executor_id: "test-account.test.near",
          gas_burnt: 9661284396271,
          logs: [],
          metadata: {
            gas_profile: [
              {
                cost: "BASE",
                cost_category: "WASM_HOST_COST",
                gas_used: "4501057887",
              },
              {
                cost: "CONTRACT_LOADING_BASE",
                cost_category: "WASM_HOST_COST",
                gas_used: "35445963",
              },
              {
                cost: "CONTRACT_LOADING_BYTES",
                cost_category: "WASM_HOST_COST",
                gas_used: "115314684750",
              },
              {
                cost: "READ_MEMORY_BASE",
                cost_category: "WASM_HOST_COST",
                gas_used: "10439452800",
              },
              {
                cost: "READ_MEMORY_BYTE",
                cost_category: "WASM_HOST_COST",
                gas_used: "1007353245",
              },
              {
                cost: "READ_REGISTER_BASE",
                cost_category: "WASM_HOST_COST",
                gas_used: "12585825930",
              },
              {
                cost: "READ_REGISTER_BYTE",
                cost_category: "WASM_HOST_COST",
                gas_used: "88902924",
              },
              {
                cost: "STORAGE_READ_BASE",
                cost_category: "WASM_HOST_COST",
                gas_used: "169070537250",
              },
              {
                cost: "STORAGE_READ_KEY_BYTE",
                cost_category: "WASM_HOST_COST",
                gas_used: "2042867178",
              },
              {
                cost: "STORAGE_READ_VALUE_BYTE",
                cost_category: "WASM_HOST_COST",
                gas_used: "4006257570",
              },
              {
                cost: "UTF8_DECODING_BASE",
                cost_category: "WASM_HOST_COST",
                gas_used: "3111779061",
              },
              {
                cost: "UTF8_DECODING_BYTE",
                cost_category: "WASM_HOST_COST",
                gas_used: "58024515321",
              },
              {
                cost: "WASM_INSTRUCTION",
                cost_category: "WASM_HOST_COST",
                gas_used: "6815630073912",
              },
              {
                cost: "WRITE_MEMORY_BASE",
                cost_category: "WASM_HOST_COST",
                gas_used: "16822769166",
              },
              {
                cost: "WRITE_MEMORY_BYTE",
                cost_category: "WASM_HOST_COST",
                gas_used: "2500422696",
              },
              {
                cost: "WRITE_REGISTER_BASE",
                cost_category: "WASM_HOST_COST",
                gas_used: "14327612430",
              },
              {
                cost: "WRITE_REGISTER_BYTE",
                cost_category: "WASM_HOST_COST",
                gas_used: "3429010728",
              },
            ],
            version: 3,
          },
          receipt_ids: ["FHrQqQbTtzgLVKEbxGnC9YotAietttRfiahUi3YX7mRd"],
          status: {
            Failure: {
              ActionError: {
                index: 0,
                kind: {
                  FunctionCallError: {
                    ExecutionError:
                      "Smart contract panicked: invalid bigint literal\n    at BigInt (native)\n    at createOrder (build/contract.js:1138)\n    at apply (native)\n    at <anonymous> (build/contract.js:816)\n    at createOrder (build/contract.js:1633)\n",
                  },
                },
              },
            },
          },
          tokens_burnt: "966128439627100000000",
        },
        proof: [
          {
            direction: "Left",
            hash: "KxVunVDsxG9kx2xNrSNMP3DKUzEEe2A2f2PGrzSmzy1",
          },
        ],
      },
      {
        block_hash: "7peKQxRTsJqyNmTavMkMuiN6Xfvt1shcncsPgRgF2XDn",
        id: "FHrQqQbTtzgLVKEbxGnC9YotAietttRfiahUi3YX7mRd",
        outcome: {
          executor_id: "test.near",
          gas_burnt: 223182562500,
          logs: [],
          metadata: { gas_profile: [], version: 3 },
          receipt_ids: [],
          status: { SuccessValue: "" },
          tokens_burnt: "0",
        },
        proof: [
          {
            direction: "Left",
            hash: "9KKKmxJHTCvTKcS3677X7ftqW44DU43gB5H2f3Z4SvTt",
          },
        ],
      },
    ],
    status: {
      Failure: {
        ActionError: {
          index: 0,
          kind: {
            FunctionCallError: {
              ExecutionError:
                "Smart contract panicked: invalid bigint literal\n    at BigInt (native)\n    at createOrder (build/contract.js:1138)\n    at apply (native)\n    at <anonymous> (build/contract.js:816)\n    at createOrder (build/contract.js:1633)\n",
            },
          },
        },
      },
    },
    transaction: {
      actions: [
        {
          FunctionCall: {
            args: "eyJ0b2tlbklkIjoiZmFrZS1ldGhlci1jb250cmFjdC50ZXN0Lm5lYXIiLCJzdGFibGVDb2luU3ltYm9sIjoiZ2hzYyIsInJhdGUiOiI0MzQ4MTAwMDAwMCIsImFtb3VudCI6eyJmYWtlLWV0aGVyLWNvbnRyYWN0LnRlc3QubmVhciI6IjEwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAifSwib3JkZXJUeXBlIjoiYnV5In0=",
            deposit: "0",
            gas: 30000000000000,
            method_name: "createOrder",
          },
        },
      ],
      hash: "Hgos4GivBRGdd9H7nzgUuuC1wAD5b6Y29GBWhHHDxkjW",
      nonce: 14,
      public_key: "ed25519:E4miDBbRuR8k1o4iT954gaajDnBmVTtpuw8tPCHx224o",
      receiver_id: "test-account.test.near",
      signature:
        "ed25519:3DAsuAk7ikuFLeSudFGotKm9u8GSEskbR9g6PBww6xqsvLZH4yUacXHuzcPYRiEXdavjpZVtW6sMPWr8aBa2egmU",
      signer_id: "test.near",
    },
    transaction_outcome: {
      block_hash: "Cuwf5X6bSWEg8p9sUtaFsXieE3qZD1Nfkc5EkittB2W1",
      id: "Hgos4GivBRGdd9H7nzgUuuC1wAD5b6Y29GBWhHHDxkjW",
      outcome: {
        executor_id: "test.near",
        gas_burnt: 2428345827460,
        logs: [],
        metadata: { gas_profile: null, version: 1 },
        receipt_ids: ["GQGQnWM3nNG9yhfwC5ucRt7zC1mgGkDHYrWCT321SBpu"],
        status: {
          SuccessReceiptId: "GQGQnWM3nNG9yhfwC5ucRt7zC1mgGkDHYrWCT321SBpu",
        },
        tokens_burnt: "242834582746000000000",
      },
      proof: [],
    },
  },
  startMs: 1713902003443,
  endMs: 1713902005462,
  config: {
    network: "sandbox",
    rootAccountId: "test.near",
    rpcAddr: "http://localhost:59989",
    initialBalance: "100000000000000000000000000",
    homeDir: "/tmp/sandbox/37615427-7d07-4e26-9cd8-4906e36d7f05",
    port: 59989,
    rm: false,
    refDir: null,
  },
};
