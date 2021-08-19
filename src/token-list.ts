import Web3 from "web3";
import { Token } from "erc20";
const defaultList = require('../lists/ethinit.json')

export interface iToken {
    chainId: number,
    address: string,
    symbol: string,
    [x: string]: any
}

export interface iTokenList {
    [x: string]: any,
    tokens: iToken[]
}

export class TokenList {
    private static cache: { [key: string]: any } = {};
    constructor(protected web3: Web3, public tokenList: iTokenList = defaultList) {

    }

    private chainId: Promise<number>;
    private getChainId(): Promise<number> {
        if (!this.chainId) {
            this.chainId = this.web3.eth.getChainId();
        }

        return this.chainId;
    }

    async getBySymbol(symbol: string): Promise<Token> {
        let chainId = await this.getChainId();

        let addresses: string[] = [];

        for (let i in this.tokenList.tokens) {
            let tkn: iToken = this.tokenList.tokens[i];

            if (tkn.symbol == symbol && tkn.chainId == chainId) {
                addresses.push(tkn.address)
            }
        }

        if (addresses.length == 0) {
            throw `Token with symbol "${symbol}" is not defined.`;
        }

        if (addresses.length > 1) {
            throw `There are multiple tokens with symbol "${symbol}".`;
        }

        return this.getByAddress(addresses[0])
    }

    async getByAddress(address: string): Promise<Token> {
        let chainId = await this.getChainId();
        let cacheKey = `${chainId}-erc20-${address.toLowerCase()}`;
        if (!TokenList.cache[cacheKey]) {
            TokenList.cache[cacheKey] = new Token(this.web3, address);
        }

        return TokenList.cache[cacheKey];
    }
}