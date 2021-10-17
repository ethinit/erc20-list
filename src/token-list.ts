import Web3 from "web3";
import { Token } from "erc20";
import { AbiItem } from 'web3-utils';
const defaultList = require('../lists/ethinit.json')
const defaultAbis = require('../abis.json')

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
    constructor(protected web3: Web3, public tokenList: iTokenList = defaultList, public abis: {[address: string]: AbiItem[]} = defaultAbis) {

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

        return Token.getInstance(this.web3, addresses[0], this.abis[addresses[0]]);
    }
}