import { HardhatUserConfig } from "hardhat/config";
import "dotenv/config";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    didlab: {
      url: process.env.RPC_URL || "",
      chainId: Number(process.env.CHAIN_ID || "0"),
      type: "http", // ✅ only here
    },
    // ⚡ removed the "hardhat" section entirely
  },
};

export default config;
