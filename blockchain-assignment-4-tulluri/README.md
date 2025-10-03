# Assignment 4 — Minimal DApp

## Team Info
- **Team Number:** [Your Team Number]
- **RPC URL:** https://hh-XX.didlab.org (replace XX with your team number)
- **Chain ID:** [Your Chain ID]
- **Token Address:** [Your ERC-20 Token Address]

## Project Goal
Build a small web DApp that connects to MetaMask on your DIDLab team chain, shows your ERC-20 balance, and lets you transfer tokens.

## How to Run Locally
1. Clone or unzip this project folder.
2. Open a terminal inside the folder and run a local dev server:
   ```bash
   python3 -m http.server 8000
   # OR
   npx http-server -p 8000
   ```
3. Open [http://localhost:8000](http://localhost:8000) in your browser.
4. Connect MetaMask, load your token, view balance, and transfer tokens.

## Features Implemented
- **Connect Flow:** Connect button + auto add/switch to DIDLab chain.
- **Token Load:** Input token address, load metadata (name, symbol, decimals).
- **Balance View:** Show connected account’s balance.
- **Transfer:** Send tokens with recipient + amount inputs; show tx hash, block, and fee.
- **Updates:** Refresh balance on transfers or via manual refresh.
- **Wallet Integration:** Add token to MetaMask (wallet_watchAsset).
- **Libraries:** Uses Viem (via CDN).

## Deliverables
- Screenshots (to be added by you):
  - Connected state
  - Token loaded
  - Transfer confirmation
  - Optional: token in MetaMask
- Short note on extra safety checks or issues fixed (to be added).

---
**Author:** [Your Name / Team]
