import * as crypto from 'crypto';
import express from 'express';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { URL } from 'url';

class Blockchain {
    private chain: any[];
    private transactions: any[];
    private nodes: Set<string>;

    constructor() {
        this.chain = [];
        this.transactions = [];
        this.create_block(1, '0'); // genesis block
        this.nodes = new Set();
    }

    create_block(proof: number, previous_hash: string): any {
        const block = {
            index: this.chain.length + 1,
            timestamp: new Date().toISOString(),
            proof: proof,
            previous_hash: previous_hash,
            transactions: this.transactions
        };
        this.transactions = [];
        this.chain.push(block);
        return block;
    }

    get_previous_block(): any {
        return this.chain[this.chain.length - 1];
    }

    proof_of_work(previous_proof: number): number {
        let new_proof = 1;
        let check_proof = false;
        while (check_proof === false) {
            const hash_operation = crypto.createHash('sha256').update((new_proof ** 2 - previous_proof ** 2).toString()).digest('hex');
            if (hash_operation.substring(0, 4) === '0000') {
                check_proof = true;
            } else {
                new_proof++;
            }
        }
        return new_proof;
    }

    hash(block: any): string {
        const encoded_block = JSON.stringify(block, Object.keys(block).sort());
        return crypto.createHash('sha256').update(encoded_block).digest('hex');
    }

    is_chain_valid(chain: any[]): boolean {
        let previous_block = chain[0];
        let block_index = 1;
        while (block_index < chain.length) {
            const block = chain[block_index];
            if (block['previous_hash'] !== this.hash(previous_block)) {
                return false;
            }
            const previous_proof = previous_block['proof'];
            const proof = block['proof'];
            const hash_operation = crypto.createHash('sha256').update((proof ** 2 - previous_proof ** 2).toString()).digest('hex');
            if (hash_operation.substring(0, 4) !== '0000') {
                return false;
            }
            previous_block = block;
            block_index++;
        }
        return true;
    }

    add_transaction(sender: string, receiver: string, amount: number): number {
        this.transactions.push({
            sender: sender,
            receiver: receiver,
            amount: amount
        });
        const previous_block = this.get_previous_block();
        return previous_block['index'] + 1;
    }

    add_node(address: string): void {
        const parsed_url = new URL(address);
        this.nodes.add(parsed_url.host);
    }

    replace_chain(): boolean {
        const network = this.nodes;
        let longest_chain: any[] | null = null;
        let max_length = this.chain.length;
        for (const node of network) {
            axios.get(`http://${node}/get_chain`)
                .then(response => {
                    if (response.status === 200) {
                        const length = response.data['length'];
                        const chain = response.data['chain'];
                        if (length > max_length && this.is_chain_valid(chain)) {
                            max_length = length;
                            longest_chain = chain;
                        }
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
        if (longest_chain) {
            this.chain = longest_chain;
            return true;
        }
        return false;
    }
}

// Create a web app
const app = express();
app.set('json spaces', 2);

// Creating an address for the node on port 5000
const node_address = uuidv4().replace(/-/g, '');

// Creating blockchain
const blockchain = new Blockchain();

// Mining a new block
app.get('/mine_block', (req, res) => {
    const previous_block = blockchain.get_previous_block();
    const previous_proof = previous_block['proof'];
    const proof = blockchain.proof_of_work(previous_proof);
    const previous_hash = blockchain.hash(previous_block);
    blockchain.add_transaction(node_address, 'John', 1);
    const block = blockchain.create_block(proof, previous_hash);
    res.json({
        message: 'Congratulations, you just mined a block!',
        // ... rest of the response
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

