# DIDLab ERC-20 DApp UI

This project is a minimal web-based decentralized application (DApp) for interacting with an ERC-20 token deployed on the DIDLab network.

## Features
- Connects to MetaMask and adds/switches to your team’s DIDLab network.
- Loads ERC-20 token metadata (name, symbol, decimals).
- Displays your wallet balance.
- Transfers tokens to another address.
- Updates balance automatically when transfers happen.
- Option to add token to MetaMask.

## Prerequisites
- Node.js v22.x installed
- MetaMask installed in your browser
- Your team’s DIDLab RPC & Chain ID, and deployed token address
- Import DIDLab faucet/deployer private key into MetaMask

### DIDLab Networks
| Team | RPC URL | Chain ID |
|------|---------|----------|
| 01 | https://hh-01.didlab.org | 31337 |
| 02 | https://hh-02.didlab.org | 31338 |
| 03 | https://hh-03.didlab.org | 31339 |
| 04 | https://hh-04.didlab.org | 31340 |
| 05 | https://hh-05.didlab.org | 31341 |
| 06 | https://hh-06.didlab.org | 31342 |
| 07 | https://hh-07.didlab.org | 31343 |
| 08 | https://hh-08.didlab.org | 31344 |
| 09 | https://hh-09.didlab.org | 31345 |
| 10 | https://hh-10.didlab.org | 31346 |
| 11 | https://hh-11.didlab.org | 31347 |
| 12 | https://hh-12.didlab.org | 31348 |

## Setup Instructions

1. **Clone or create project folder**
   ```bash
   mkdir didlab-dapp && cd didlab-dapp
   ```

2. **Create `index.html`**
   Paste the provided HTML file into `index.html`.

3. **Serve the project locally**
   ```bash
   python3 -m http.server 8000
   # OR
   npx http-server -p 8000
   ```

   Open [http://localhost:8000](http://localhost:8000) in your browser.

4. **Use the app**
   - Select your Team ID from the dropdown.
   - Enter your deployed Token Address.
   - Click **Connect & Switch Network** and approve MetaMask prompts.
   - Click **Load Token** to load metadata and view balance.
   - Use the Transfer form to send tokens.
   - Add token to MetaMask to track it in your wallet.

## Troubleshooting
- **Nothing happens on connect** → Ensure MetaMask is installed and not blocked by private browsing.
- **Wrong network** → Approve the network add/switch prompt in MetaMask.
- **Returned no data (0x)** → Invalid token address or contract not on your team’s chain.
- **Insufficient funds** → Import faucet/deployer private key to MetaMask for ETH + token balance.

---

**Author:** DIDLab Project  
**Course Activity:** Activity 4 — Build a Tiny DApp UI for ERC-20  
