import "dotenv/config";

console.log("RPC_URL:", process.env.RPC_URL);
console.log("CHAIN_ID:", process.env.CHAIN_ID);
console.log("PRIVATE_KEY:", process.env.PRIVATE_KEY?.slice(0, 10) + "...");
