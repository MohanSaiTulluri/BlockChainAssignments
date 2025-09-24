import { RPC_URL, CHAIN_ID, PRIVATE_KEY, TOKEN_ADDRESS } from "./config.mjs";
import { http, createWalletClient, getContract } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { parseUnits } from "viem";
import { loadArtifact } from "./config.mjs";

const transport = http(RPC_URL);
const account = privateKeyToAccount(PRIVATE_KEY);
const walletClient = createWalletClient({ transport, account, chain: { id: CHAIN_ID }});
const artifact = loadArtifact();
const abi = artifact.abi;
const token = getContract({ address: TOKEN_ADDRESS, abi, walletClient });

const recipients = [
  "0x0000000000000000000000000000000000000001",
  "0x0000000000000000000000000000000000000002",
  "0x0000000000000000000000000000000000000003",
  "0x0000000000000000000000000000000000000004"
];
const amounts = recipients.map(_ => parseUnits("1", 18));

async function main() {
  const batchTx = await walletClient.writeContract({
    account,
    address: TOKEN_ADDRESS,
    abi,
    functionName: "airdrop",
    args: [recipients, amounts]
  });
  console.log("Batch tx:", batchTx);

  let gasSingles = 0;
  for (let i = 0; i < recipients.length; ++i) {
    const tx = await walletClient.writeContract({
      account,
      address: TOKEN_ADDRESS,
      abi,
      functionName: "transfer",
      args: [recipients[i], amounts[i]]
    });
    console.log("Single transfer tx:", tx);
  }
}

main().catch(err => { console.error(err); process.exit(1); });
