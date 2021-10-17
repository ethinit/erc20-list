import Web3 from "web3";
import { Token } from "erc20";
import { AbiItem } from 'web3-utils';
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
    abis: {
        [address: string]: AbiItem[];
    };
    constructor(web3: Web3, tokenList?: iTokenList, abis?: {
        [address: string]: AbiItem[];
    });
    private chainId;
    private getChainId;
    getBySymbol(symbol: string): Promise<Token>;
}
