import { SDK, BLOCKCHAIN_NAME  } from 'rubic-sdk';
// import TOKEN_CONTRACTS from './src/Contracts'

        // you have to declare rpc links only for networks you will use
        const configuration = {
            rpcProviders: {
                ETH: {
                    mainRpc: 'https://api.mycryptoapi.com/eth'
                },
                BSC: {
                    mainRpc: 'https://bsc-dataseed1.binance.org/'
                }
            }
        }
        
        async function main() {
            // create SDK instance
            const sdk = await SDK.createSDK(configuration);
            
            // define example trade parameters
            const blockchain = 'ETH';
            const fromTokenAddress = '0x0000000000000000000000000000000000000000';
            const fromAmount = 1;
            const toTokenAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7';
      
            const token = await sdk.tokens.createPriceToken({ 
                blockchain: BLOCKCHAIN_NAME.ETHEREUM,
                address:  '0xa4eed63db85311e22df4473f87ccfc3dadcfa3e3'
            });

            // calculate trades
            const trades = await sdk.instantTrades
                .calculateTrade({blockchain, address: fromTokenAddress}, fromAmount, toTokenAddress);
            
            const gasPriceApi = sdk.gasPriceApi;
            const gasPrice = await gasPriceApi.getGasPrice(BLOCKCHAIN_NAME.ETHEREUM);
            console.log(trades);

            // explore trades info
    Object.entries(trades).forEach(([tradeType, trade]) =>
        console.log(tradeType, `to amount: ${trade.to.tokenAmount.toFormat(3)}`)
        ) 
    }

        main();