import { RPC_URL, CHAIN_ID, TOKEN_ADDRESS } from "./config.mjs";
import { http, createPublicClient, getContract } from "viem";
import { loadArtifact } from "./config.mjs";

const publicClient = createPublicClient({ transport: http(RPC_URL), chain: { id: CHAIN_ID }});
const artifact = loadArtifact();
const abi = artifact.abi;
const token = getContract({ address: TOKEN_ADDRESS, abi, publicClient });

async function main() {
  const latest = await publicClient.getBlockNumber();
  const fromBlock = latest - 2000n;
  console.log("Querying events from block", fromBlock.toString(), "to", latest.toString());

  const transferEvents = await publicClient.getLogs({
    address: TOKEN_ADDRESS,
    event: { signature: "Transfer(address,address,uint256)" },
    fromBlock,
    toBlock: latest
  });
  console.log("Transfer events:", transferEvents);

  const approvalEvents = await publicClient.getLogs({
    address: TOKEN_ADDRESS,
    event: { signature: "Approval(address,address,uint256)" },
    fromBlock,
    toBlock: latest
  });
  console.log("Approval events:", approvalEvents);
}

main().catch(err => { console.error(err); process.exit(1); });
