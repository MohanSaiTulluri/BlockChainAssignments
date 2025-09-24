# DIDLab ERC-20 Assignment (Team-10)

This project implements a production-style ERC-20 token on the DIDLab Hardhat network.

## Requirements
- Node.js v22.x
- Hardhat v3 (ESM)
- Viem client
- OpenZeppelin v5

## Setup

1. **Clone / unzip project**

```bash
unzip didlab-token-complete.zip
cd didlab-token
```

2. **Install dependencies**

```bash
npm install
```

3. **Set environment variables**

Edit `.env` with your team-10 details:

```env
RPC_URL=https://hh-10.didlab.org
CHAIN_ID=31346
PRIVATE_KEY=YOUR_TEAM10_FAUCET_PRIVATE_KEY
TOKEN_NAME=CampusCredit
TOKEN_SYMBOL=CAMP
TOKEN_CAP=2000000
TOKEN_INITIAL=1000000
TOKEN_ADDRESS=   # will be filled after deploy
```

## Commands

### Compile
```bash
npx hardhat compile
```

### Deploy
```bash
node ./scripts/deploy.mjs
```
- Copy the printed contract address into `.env` as `TOKEN_ADDRESS`.

### Transfer + Approve
```bash
node ./scripts/transferApprove.mjs
```
- Outputs balances before/after, tx hashes, gas used.

### Airdrop vs Singles (Gas Comparison)
```bash
node ./scripts/airdropCompare.mjs
```
- Prints gas used by batch vs multiple single transfers.

### Logs & Events
```bash
node ./scripts/logsEvents.mjs
```
- Queries past 2000 blocks for `Transfer` and `Approval` events.

## MetaMask Setup

1. Add Network:
   - Name: `DIDLab Team 10`
   - RPC URL: `https://hh-10.didlab.org`
   - Chain ID: `31346`
   - Currency: `ETH`

2. Import Account: use your faucet private key.

3. Import Token: use deployed contract address.

4. Send a transfer in MetaMask, take screenshots for submission.

## Submission Checklist
- `contracts/TeamToken.sol`
- `hardhat.config.mjs`
- `package.json`
- `.env.example`
- `scripts/*.mjs`
- `README.md`
- Console outputs: `deploy.txt`, `transfer.txt`, `airdrop.txt`, `logs.txt`
- MetaMask screenshots
- Short write-up (≤1 page) about cap/pause/roles + gas efficiency.

