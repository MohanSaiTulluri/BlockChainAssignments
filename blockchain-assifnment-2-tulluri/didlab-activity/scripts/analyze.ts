import { artifacts } from "hardhat";
import { createPublicClient, http, decodeEventLog } from "viem";

const RPC_URL = process.env.RPC_URL!;
const CHAIN_ID = Number(process.env.CHAIN_ID!);

// Paste from interact output
const HASHES = {
  tx1: "0xe3b49d46a97298afefe138b5ccbfa4f265c4fd85f45cc413d2a58e2d7ace8343",
  tx2: "0x36ec440fbfe45e76b9bdea03ed03d0c14cff2ca7e6c6d0309fedd93496cce443",
  tx3: "0xf0a479b045dc90d8f247f83f17f0c3c9ac99ed2a2aa10647aafb32c2d5677909",
};

async function analyze(hash: `0x${string}`, abi: any) {
  const chain = { id: CHAIN_ID, name: `didlab-${CHAIN_ID}`, nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 }, rpcUrls: { default: { http: [RPC_URL] } } };
  const pc = createPublicClient({ chain, transport: http(RPC_URL) });

  const tx = await pc.getTransaction({ hash });
  const rcpt = await pc.getTransactionReceipt({ hash });
  const block = await pc.getBlock({ blockNumber: rcpt.blockNumber });

  const baseFee = block.baseFeePerGas ?? 0n;
  const gasUsed = rcpt.gasUsed ?? 0n;
  const effective = rcpt.effectiveGasPrice ?? tx.gasPrice ?? 0n;
  const totalFee = gasUsed * effective;
  console.log(`\n=== ${hash} ===`);
  console.log("Status:", rcpt.status === "success" ? "Success" : "Fail");
  console.log("Block:", rcpt.blockNumber);
  console.log("Timestamp (UTC):", new Date(Number(block.timestamp) * 1000).toISOString());
  console.log("From:", tx.from);
  console.log("To:", tx.to);
  console.log("Nonce:", tx.nonce);
  console.log("Gas limit:", tx.gas);
  console.log("Gas used:", gasUsed);
  console.log("Base fee per gas:", baseFee);
  console.log("Max fee per gas:", tx.maxFeePerGas ?? 0n);
  console.log("Max priority fee per gas:", tx.maxPriorityFeePerGas ?? 0n);
  console.log("Effective gas price:", effective);
  console.log("Total fee (wei):", totalFee);

  for (const log of rcpt.logs) {
    try {
      const parsed = decodeEventLog({ abi, data: log.data, topics: log.topics });
      console.log("Event:", parsed.eventName, parsed.args);
    } catch { /* not a CampusCredit event */ }
  }
}

async function main() {
  const { abi } = await artifacts.readArtifact("CampusCredit");
  await analyze(HASHES.tx1 as `0x${string}`, abi);
  await analyze(HASHES.tx2 as `0x${string}`, abi);
  await analyze(HASHES.tx3 as `0x${string}`, abi);
}

main().catch((e) => { console.error(e); process.exit(1); });
