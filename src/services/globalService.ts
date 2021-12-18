import BaseServices from "./baseServices";

export default class GlobalService
{
    static async getTelosPrice(){
        return BaseServices.getData('https://api.coingecko.com/api/v3/simple/price?ids=telos&vs_currencies=usd')
    }
    static async getDaricPrice(){
        return BaseServices.getData('https://newdex.io/api/symbol/getSymbolInfo?symbolId=&symbol=persiandaric-dric-tlos')
    }
    
}