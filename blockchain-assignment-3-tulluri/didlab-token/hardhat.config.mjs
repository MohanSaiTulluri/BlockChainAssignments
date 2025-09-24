import { resolve } from "path";
import "@nomicfoundation/hardhat-toolbox";

const RPC_URL = process.env.RPC_URL;
const CHAIN_ID = process.env.CHAIN_ID ? Number(process.env.CHAIN_ID) : undefined;

export default {
  solidity: {
    compilers: [{ version: "0.8.24", settings: { optimizer: { enabled: true, runs: 200 } } }],
  },
  networks: {
    didlab: {
      url: RPC_URL,
      chainId: CHAIN_ID,
      type: "http"
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
};
