"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenList = void 0;
const erc20_1 = require("erc20");
const defaultList = require('../lists/ethinit.json');
class TokenList {
    constructor(web3, tokenList = defaultList) {
        this.web3 = web3;
        this.tokenList = tokenList;
    }
    getChainId() {
        if (!this.chainId) {
            this.chainId = this.web3.eth.getChainId();
        }
        return this.chainId;
    }
    async getBySymbol(symbol) {
        let chainId = await this.getChainId();
        let addresses = [];
        for (let i in this.tokenList.tokens) {
            let tkn = this.tokenList.tokens[i];
            if (tkn.symbol == symbol && tkn.chainId == chainId) {
                addresses.push(tkn.address);
            }
        }
        if (addresses.length == 0) {
            throw `Token with symbol "${symbol}" is not defined.`;
        }
        if (addresses.length > 1) {
            throw `There are multiple tokens with symbol "${symbol}".`;
        }
        return erc20_1.Token.getInstance(this.web3, addresses[0]);
    }
}
exports.TokenList = TokenList;
TokenList.cache = {};
