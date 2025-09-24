import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

export const RPC_URL = process.env.RPC_URL;
export const CHAIN_ID = Number(process.env.CHAIN_ID);
export const PRIVATE_KEY = process.env.PRIVATE_KEY;
export const TOKEN_NAME = process.env.TOKEN_NAME;
export const TOKEN_SYMBOL = process.env.TOKEN_SYMBOL;
export const TOKEN_CAP = process.env.TOKEN_CAP;
export const TOKEN_INITIAL = process.env.TOKEN_INITIAL;
export const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS;

export function loadArtifact(contractName="TeamToken") {
  const p = path.resolve("artifacts/contracts/TeamToken.sol/TeamToken.json");
  if (!fs.existsSync(p)) throw new Error("Missing artifact. Run npx hardhat compile first");
  return JSON.parse(fs.readFileSync(p, "utf8"));
}
