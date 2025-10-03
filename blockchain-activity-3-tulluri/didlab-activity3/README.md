# 🪙 DIDLab Activity 3: CampusCreditV2 - Production-Style ERC-20

## Overview
This repository contains the solution for **DIDLab Activity 3**, which involves building, deploying, and operating a production-style **ERC-20 token** named **CampusCreditV2** on the dedicated **DIDLab chain**.

The project is scaffolded using **Hardhat v3 (ESM)** and **Viem**. The contract is designed to be gas-aware and includes essential features like **capping**, **pausing**, and **role-based access control**, along with a custom **batch airdrop** function.

---

## 🚀 Getting Started

### Prerequisites
Ensure your system meets these requirements:
* **Node 22.x (LTS)**
* **npm**
* **Git**
* **VS Code**
* **MetaMask**

### Setup and Environment Configuration

1.  **Clone and Initialize:**
    ```bash
    mkdir -p ~/didlab-activity3 && cd ~/didlab-activity3
    node -v # Must be 22.x
    npm init -y
    ```

2.  **Install Dependencies:**
    ```bash
    npm i -D hardhat@^3 \
      @nomicfoundation/hardhat-toolbox-viem@^5 \
      @nomicfoundation/hardhat-ignition@^3 \
      typescript@~5.8.0 \
      viem@^2.30.0 \
      @types/node@^22.8.5
    npm i dotenv @openzeppelin/contracts@^5
    ```

3.  **Initialize Hardhat:**
    ```bash
    npx hardhat --init
    # Choose: hardhat-3, node-test-runner-viem, and ESM: Yes
    ```

4.  **Set Environment Variables (`.env`):**
    **ACTION REQUIRED:** **Replace `01` with your actual team number** and run the following in your shell to set and export the environment variables:
    ```bash
    # Set your team number (e.g., TEAM=05)
    TEAM=01
    export RPC_URL="https://hh-${TEAM}.didlab.org"
    export CHAIN_ID=$((31336 + 10#$TEAM))
    # Set your team's faucet private key (WARNING: do not use a real wallet key)
    export PRIVATE_KEY="0x<your_team_private_key_no_quotes>" 
    
    # Create and populate the .env file with your variables and token details
    cat > .env <<'EOF'
    RPC_URL=$RPC_URL
    CHAIN_ID=$CHAIN_ID
    PRIVATE_KEY=$PRIVATE_KEY
    # Optional deploy args 
    TOKEN_NAME=CampusCredit
    TOKEN_SYMBOL=CAMP
    TOKEN_CAP=2000000 
    TOKEN_INITIAL=1000000
    EOF
    ```

---

## 📝 Contract and Configuration

### Hardhat Configuration (`hardhat.config.ts`)
The configuration is set up for ESM, Viem, and includes a custom `didlab` network targeting the team's chain:

```typescript
import "dotenv/config";
import { defineConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
const RPC_URL = process.env
