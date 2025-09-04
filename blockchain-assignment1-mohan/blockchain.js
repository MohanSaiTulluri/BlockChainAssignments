const crypto = require('crypto');

/** A single block in the chain */
class Block {
  /**
   * @param {number} index
   * @param {string} timestamp - e.g., Date.now().toString()
   * @param {any} data - array of transactions
   * @param {string} previousHash - hex string of prev block hash
   */
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data; // now always an array of transactions
    this.previousHash = previousHash;
    this.nonce = 0; // used for mining
    this.hash = this.calculateHash();
  }

  /** Compute SHA-256 over the block’s contents */
  calculateHash() {
    return crypto
      .createHash('sha256')
      .update(
        String(this.index) +
        this.timestamp +
        JSON.stringify(this.data) +
        this.previousHash +
        String(this.nonce)
      )
      .digest('hex');
  }

  /** Proof-of-Work: find a hash starting with N leading zeros */
  mineBlock(difficulty) {
    const target = '0'.repeat(difficulty);
    while (this.hash.substring(0, difficulty) !== target) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log(`  Block mined (idx=${this.index}, nonce=${this.nonce}): ${this.hash}`);
  }
}

/** A simple blockchain container */
class Blockchain {
  constructor(difficulty = 5) { // difficulty set to 5
    this.chain = [this.createGenesisBlock()];
    this.difficulty = difficulty;
  }

  createGenesisBlock() {
    return new Block(0, Date.now().toString(), [{ note: 'Genesis Block' }], '0');
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  /**
   * Add a new block to the chain.
   * Sets its previousHash, mines it, then appends.
   */
  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  /** Verify integrity: hash consistency + correct previousHash links */
  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const current = this.chain[i];
      const previous = this.chain[i - 1];

      // recompute hash from the block’s current contents
      if (current.hash !== current.calculateHash()) return false;
      // ensure link matches previous block’s actual hash
      if (current.previousHash !== previous.hash) return false;
    }
    return true;
  }
}

function main() {
  // 1) Create a chain
  const demoCoin = new Blockchain(5); // difficulty = 5

  // 2) Add blocks with simple "transactions" (minimum 5 transactions total)
  console.log('   Mining block #1 ...');
  demoCoin.addBlock(new Block(1, Date.now().toString(), [
    { from: 'Alice', to: 'Bob', amount: 50 } // 1st transaction
  ]));

  console.log('   Mining block #2 ...');
  demoCoin.addBlock(new Block(2, Date.now().toString(), [
    { from: 'Charlie', to: 'Dana', amount: 75 }, // 2nd transaction
    { from: 'Ivy', to: 'Jack', amount: 30 }, // 3rd transaction
  ]));

  console.log('   Mining block #3 ...');
  demoCoin.addBlock(new Block(3, Date.now().toString(), [
    { from: 'Eve', to: 'Frank', amount: 20 }, // 4th transaction
    { from: 'Gina', to: 'Hank', amount: 10 }, // 5th transaction 
  ]));

  // 3) Show the chain
  console.log('\n  Full chain:');
  console.log(JSON.stringify(demoCoin, null, 2));

  // 4) Validate
  console.log('\n  Is chain valid?', demoCoin.isChainValid());

  // 5) Tamper test
  console.log('\n  Tampering with block #1 data ...');
  demoCoin.chain[1].data[0].amount = 9999;
  console.log('  Is chain valid after tamper?', demoCoin.isChainValid());
}

main();
