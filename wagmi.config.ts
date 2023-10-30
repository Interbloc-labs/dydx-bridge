import { defineConfig } from "@wagmi/cli";
import { etherscan, react } from "@wagmi/cli/plugins";

if (!process.env.ETHERSCAN_API_KEY) {
  throw new Error("Missing ETHERSCAN_API_KEY environment variable");
}

export default defineConfig({
  out: "src/generated.ts",
  contracts: [],

  plugins: [
    etherscan({
      apiKey: process.env.ETHERSCAN_API_KEY,
      chainId: 1,
      contracts: [
        {
          name: "dydxToken",
          address: "0x92D6C1e31e14520e676a687F0a93788B716BEff5",
        },
        {
          name: "wrappedDydxToken",
          address: "0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9",
        },
      ],
    }),
    react(),
  ],
});
