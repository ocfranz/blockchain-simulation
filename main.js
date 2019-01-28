const SHA256 = require('crypto-js/sha256');
const express = require('express');


class Block{
    constructor(index, data, previousHash=''){
        this.index = index;
        this.data = data;
        this.date = new Date();
        this.previousHash = previousHash;
        this.hash = this.createHash();
        this.nonce = 0;
    }
    createHash(){
        return SHA256(this.index + this.date + this.previousHash + this.data + this.nonce ).toString();
    }
    mine(difficulty){
        while(!this.hash.startsWith(difficulty)){
            this.nonce++;
            this.hash = this.createHash();
        }
    }
}

class BlockChain{
    constructor(genesis, difficulty= ''){
        this.chain = [this.createFirstBlock(genesis)];
        this.difficulty = difficulty;
    }

    createFirstBlock(genesis){
        return new Block(0, genesis);
    }
    getLastBlock(){
        return this.chain[this.chain.length-1];
    }
    addBlock(data){
        let prevBlock = this.getLastBlock();
        let block = new Block(prevBlock.index+1, data, prevBlock.hash);
        block.mine(this.difficulty);
        console.log('Minado ' + block.hash + ' con nonce '+ block.nonce);
        this.chain.push(block);
    }
    isValid(){
        for( let i=1; i < this.chain.length; i++){
            let prevBlock = this.chain[i-1];
            let currentBlock = this.chain[i];

            if( currentBlock.previousHash != prevBlock.hash)
                return false;
            if( currentBlock.createHash() != currentBlock.hash)
                return false 
        }
        return true;
    }
}

const server = express();
server.get("/", function(req, res){
    res.send("<h1>Welcome</h1>");
    res.end();
})
server.listen(3000, function(){
    console.log("Server up using ort 3000");
})

/*
let ownChain = new BlockChain('Data Genesis', '000');
ownChain.addBlock('Block 1');
ownChain.addBlock('Block 2');
console.log(JSON.stringify(ownChain.chain, null, 2));*/
