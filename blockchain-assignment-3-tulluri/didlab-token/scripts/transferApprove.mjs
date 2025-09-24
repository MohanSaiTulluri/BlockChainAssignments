import { RPC_URL, CHAIN_ID, PRIVATE_KEY, TOKEN_ADDRESS } from "./config.mjs";
import { http, createWalletClient, getContract } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { parseUnits, formatUnits } from "viem";
import { loadArtifact } from "./config.mjs";

const transport = http(RPC_URL);
const account = privateKeyToAccount(PRIVATE_KEY);
const walletClient = createWalletClient({ transport, account, chain: { id: CHAIN_ID }});
const artifact = loadArtifact();
const abi = artifact.abi;
const token = getContract({ address: TOKEN_ADDRESS, abi, walletClient });

async function main() {
  const other = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
  const balBefore = await token.read.balanceOf([account.address]);
  console.log("Balance before:", formatUnits(balBefore,18));

  const amount = parseUnits("10", 18);
  const txHash = await walletClient.writeContract({
    account,
    address: TOKEN_ADDRESS,
    abi,
    functionName: "transfer",
    args: [other, amount]
  });
  console.log("Transfer tx hash:", txHash);
}

main().catch(err => { console.error(err); process.exit(1); });
