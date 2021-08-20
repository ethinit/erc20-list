import Web3 from "web3";
import { Token } from "erc20";
export interface iToken {
    chainId: number;
    address: string;
    symbol: string;
    [x: string]: any;
}
export interface iTokenList {
    [x: string]: any;
    tokens: iToken[];
}
export declare class TokenList {
    protected web3: Web3;
    tokenList: iTokenList;
    private static cache;
    constructor(web3: Web3, tokenList?: iTokenList);
    private chainId;
    private getChainId;
    getBySymbol(symbol: string): Promise<Token>;
}
