import express from 'express';
import { Request, Response } from 'express';
import crypto from 'crypto';

class Blockchain {
    chain: any[];

    constructor() {
        this.chain = [];
        this.createBlock(1, '0'); // genesis block
    }

    createBlock(proof: number, previousHash: string) {
        const block = {
            index: this.chain.length + 1,
            timestamp: new Date().toISOString(),
            proof: proof,
            previous_hash: previousHash
        };
        this.chain.push(block);
        return block;
    }

    getPreviousBlock() {
        return this.chain[this.chain.length - 1];
    }

    proofOfWork(previousProof: number) {
        let newProof = 1;
        let checkProof = false;
        while (!checkProof) {
            const hashOperation = crypto.createHash('sha256').update((newProof ** 2 - previousProof ** 2).toString()).digest('hex');
            if (hashOperation.substring(0, 4) === '0000') {
                checkProof = true;
            } else {
                newProof++;
            }
        }
        return newProof;
    }

    hash(block: any) {
        const encodedBlock = JSON.stringify(block, Object.keys(block).sort());
        return crypto.createHash('sha256').update(encodedBlock).digest('hex');
    }

    isChainValid(chain: any[]) {
        let previousBlock = chain[0];
        for (let blockIndex = 1; blockIndex < chain.length; blockIndex++) {
            const block = chain[blockIndex];
            if (block.previous_hash !== this.hash(previousBlock)) {
                return false;
            }
            const previousProof = previousBlock.proof;
            const proof = block.proof;
            const hashOperation = crypto.createHash('sha256').update((proof ** 2 - previousProof ** 2).toString()).digest('hex');
            if (hashOperation.substring(0, 4) !== '0000') {
                return false;
            }
            previousBlock = block;
        }
        return true;
    }
}

const app = express();
app.use(express.json());

const blockchain = new Blockchain();

app.get('/mine_block', (req: Request, res: Response) => {
    const previousBlock = blockchain.getPreviousBlock();
    const previousProof = previousBlock.proof;
    const proof = blockchain.proofOfWork(previousProof);
    const previousHash = blockchain.hash(previousBlock);
    const block = blockchain.createBlock(proof, previousHash);
    const response = {
        message: 'Congratulations, you just mined a block!',
        index: block.index,
        timestamp: block.timestamp,
        proof: block.proof,
        previous_hash: block.previous_hash
    };
    return res.status(200).json(response);
});

app.get('/get_chain', (req: Request, res: Response) => {
    const response = {
        chain: blockchain.chain,
        length: blockchain.chain.length
    };
    return res.status(200).json(response);
});

app.get('/is_valid', (req: Request, res: Response) => {
    const isValid = blockchain.isChainValid(blockchain.chain);
    let response;
    if (isValid) {
        response = { message: 'All Good. The Blockchain is valid :-)' };
    } else {
        response = { message: 'O Lord what went wrong! There is a problem. Blockchain is not Valid.' };
    }
    return res.status(200).json(response);
});

app.listen(5000, '0.0.0.0', () => {
    console.log('Server running on http://0.0.0.0:5000');
});

