# DIDLab Activity 3 — Build, Deploy & Operate a Production-Style ERC-20

This project demonstrates how to scaffold, build, deploy, and interact with a **gas-aware ERC-20 token** on the DIDLab chain using **Hardhat v3** with **Viem**. The token implementation (`CampusCreditV2`) includes a cap, pausability, role-based access control, and a batch airdrop function.

---

## Requirements

* Node.js **22.x (LTS)**
* npm
* Git
* VS Code
* MetaMask browser extension
* DIDLab team private key (faucet key only – do **not** use a real wallet key)

---

## Setup

1. **Clone or create project**

   ```bash
   mkdir -p ~/didlab-activity3 && cd ~/didlab-activity3
   npm init -y
   ```

2. **Install dependencies**

   ```bash
   npm i -D hardhat@^3 \
     @nomicfoundation/hardhat-toolbox-viem@^5 \
     @nomicfoundation/hardhat-ignition@^3 \
     typescript@~5.8.0 \
     viem@^2.30.0 \
     @types/node@^22.8.5

   npm i dotenv @openzeppelin/contracts@^5
   ```

3. **Initialize Hardhat**

   ```bash
   npx hardhat --init
   ```

   * Choose `hardhat-3`
   * Project type: `node-test-runner-viem`
   * Enable ESM: **Yes**

4. **Set environment variables**

   ```bash
   export TEAM=01
   export RPC_URL="https://hh-${TEAM}.didlab.org"
   export CHAIN_ID=$((31336 + 10#$TEAM))
   export PRIVATE_KEY="0x<team_private_key>"
   ```

5. **Create `.env` file**

   ```env
   RPC_URL=
   CHAIN_ID=
   PRIVATE_KEY=
   TOKEN_NAME=CampusCredit
   TOKEN_SYMBOL=CAMP
   TOKEN_CAP=2000000
   TOKEN_INITIAL=1000000
   ```

---

## Project Structure

```
contracts/
  CampusCreditV2.sol
scripts/
  deploy.ts
  transfer-approve.ts
  airdrop.ts
  logs-query.ts
.env
hardhat.config.ts
```

---

## Usage

### Compile

```bash
npx hardhat compile
```

### Deploy

```bash
npx hardhat run scripts/deploy.ts --network didlab
```

Copy the printed `TOKEN_ADDRESS` into your `.env` file.

### Interact

* **Transfer & Approve**

  ```bash
  npx hardhat run scripts/transfer-approve.ts --network didlab
  ```
* **Batch Airdrop**

  ```bash
  npx hardhat run scripts/airdrop.ts --network didlab
  ```
* **Logs & Events**

  ```bash
  npx hardhat run scripts/logs-query.ts --network didlab
  ```

---

## MetaMask Setup

1. Add a custom DIDLab network:

   * Network Name: `DIDLab Team XX`
   * RPC URL: `https://hh-XX.didlab.org`
   * Chain ID: your team’s `CHAIN_ID`
   * Currency Symbol: `ETH`

2. Import account with your faucet private key.

3. Import token using your deployed `TOKEN_ADDRESS`.

---

## NPM Scripts (optional)

Add to `package.json`:

```json
{
  "scripts": {
    "compile": "hardhat compile",
    "deploy": "hardhat run scripts/deploy.ts --network didlab",
    "xfer": "hardhat run scripts/transfer-approve.ts --network didlab",
    "airdrop": "hardhat run scripts/airdrop.ts --network didlab",
    "logs": "hardhat run scripts/logs-query.ts --network didlab"
  }
}
```

---

## Troubleshooting

* **Node version error** → Use Node.js 22.x
* **HHE15 discriminator error** → Add `type: "http"` in `hardhat.config.ts`
* **BigInt errors** → Use `parseUnits("100", 18n)`
* **RPC mismatch** → Verify with `curl $RPC_URL`

---

## Deliverables (for assignment)

* `TOKEN_ADDRESS`, deploy block, roles & cap
* Screenshot of MetaMask with custom network + token
* Console output of `airdrop.ts` (batch vs singles gas)
* Short explanation of why batch airdrop is gas-aware

---

## License

MIT
