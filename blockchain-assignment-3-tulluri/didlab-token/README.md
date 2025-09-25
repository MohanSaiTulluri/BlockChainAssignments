# Activity 3 — Build, Deploy & Operate a Production-Style ERC-20 on DIDLab

This project demonstrates how to scaffold, build, deploy, and operate a **gas-aware ERC-20 token** (`CampusCreditV2`) on the DIDLab private Ethereum testnet. It uses **Hardhat v3 (ESM)** with **Viem** and includes scripts for deployment, transfers, approvals, airdrops, and log queries.

---

## 📋 Requirements

- Node.js **22.x LTS**  
- npm  
- Git  
- VS Code  
- MetaMask  

> ⚠️ Do not install `hardhat-gas-reporter` (it conflicts with Hardhat v3).

---

## 🚀 Setup

### 1. Clone & Initialize Project

```bash
mkdir -p ~/didlab-activity3 && cd ~/didlab-activity3
npm init -y


Install dependencies:

npm i -D hardhat@^3 \
  @nomicfoundation/hardhat-toolbox-viem@^5 \
  @nomicfoundation/hardhat-ignition@^3 \
  typescript@~5.8.0 \
  viem@^2.30.0 \
  @types/node@^22.8.5

npm i dotenv @openzeppelin/contracts@^5


Initialize Hardhat:

npx hardhat --init


Choose:

Version: hardhat-3

Project type: node-test-runner-viem

ESM: Yes

2. Configure Environment

Create a .env file:

RPC_URL=
CHAIN_ID=
PRIVATE_KEY=

# Optional token params
TOKEN_NAME=CampusCredit
TOKEN_SYMBOL=CAMP
TOKEN_CAP=2000000
TOKEN_INITIAL=1000000


Append your DIDLab values:

echo "RPC_URL=$RPC_URL" >> .env
echo "CHAIN_ID=$CHAIN_ID" >> .env
echo "PRIVATE_KEY=$PRIVATE_KEY" >> .env

3. Hardhat Config

Update hardhat.config.ts to include DIDLab network (see doc for full code).

📜 Smart Contract

contracts/CampusCreditV2.sol

Implements:

Cap enforcement

Pausable transfers

Roles (ADMIN, MINTER, PAUSER)

Batch airdrop with gas optimizations

Custom errors

Compile:

npx hardhat compile

📦 Deployment

Deploy with:

npx hardhat run scripts/deploy.ts --network didlab


Copy printed contract address into .env:

echo "TOKEN_ADDRESS=0x..." >> .env

🔧 Interaction Scripts

Transfer & Approve → scripts/transfer-approve.ts

Batch Airdrop & Gas Compare → scripts/airdrop.ts

Logs & Events Query → scripts/logs-query.ts

Run examples:

npx hardhat run scripts/transfer-approve.ts --network didlab
npx hardhat run scripts/airdrop.ts --network didlab
npx hardhat run scripts/logs-query.ts --network didlab

🦊 MetaMask Setup

Add a Custom Network

RPC: https://hh-XX.didlab.org

Chain ID: your CHAIN_ID

Currency: ETH

Import account (class faucet private key).

Import token using your deployed TOKEN_ADDRESS.

📑 NPM Shortcuts (optional)

Add to package.json:

"scripts": {
  "compile": "hardhat compile",
  "deploy": "hardhat run scripts/deploy.ts --network didlab",
  "xfer": "hardhat run scripts/transfer-approve.ts --network didlab",
  "airdrop": "hardhat run scripts/airdrop.ts --network didlab",
  "logs": "hardhat run scripts/logs-query.ts --network didlab"
}


Run with:

npm run deploy
npm run xfer
npm run airdrop
npm run logs

🛠 Troubleshooting

Node 18 errors → use Node 22.x

solc mismatch → keep Solidity at 0.8.24

BigInt errors → use parseUnits("100", 18n)

RPC mismatch → check with curl $RPC_URL

📤 Deliverables

Submit:

TOKEN_ADDRESS, deploy block, roles, cap.

Screenshot of MetaMask with custom network + token.

Console output from airdrop.ts (batch vs singles gas).

Short note on why your airdrop is gas-aware.
