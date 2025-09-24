import { RPC_URL, CHAIN_ID, PRIVATE_KEY, TOKEN_NAME, TOKEN_SYMBOL, TOKEN_CAP, TOKEN_INITIAL } from "./config.mjs";
import { http, createWalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { parseUnits } from "viem";
import { loadArtifact } from "./config.mjs";

const transport = http(RPC_URL);
const account = privateKeyToAccount(PRIVATE_KEY);
const walletClient = createWalletClient({ transport, account, chain: { id: CHAIN_ID } });

const artifact = loadArtifact();
const abi = artifact.abi;
const bytecode = artifact.bytecode;

const capWei = parseUnits(TOKEN_CAP || "0", 18);
const initialWei = parseUnits(TOKEN_INITIAL || "0", 18);

async function main() {
  const txHash = await walletClient.deployContract({
    abi,
    bytecode,
    account,
    args: [TOKEN_NAME, TOKEN_SYMBOL, capWei, account.address, initialWei]
  });

  console.log("Deploy tx hash:", txHash);
  const receipt = await walletClient.waitForTransactionReceipt({ hash: txHash });
  console.log("Deployed contract address:", receipt.contractAddress);
  console.log("Block number:", receipt.blockNumber);
}

main().catch(err => { console.error(err); process.exit(1); });
