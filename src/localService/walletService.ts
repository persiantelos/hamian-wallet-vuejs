import LoginResponse from "src/models/local/loginResponse";
import StorageAccountModel from "src/models/storage/accountModel";
import BaseServices from "../services/baseServices";
import BaseLocalService from "./baseLocalService";
import StorageService from "./storageService";
export default class WalletService
{
    
    static walletName:string='wallet';
    static existData(chain:string,key:string,url:string)
    {
        return BaseLocalService.run(this.walletName,{action:'checkKey',data:{chain,key,url}});
    }
    static addAccount(account:StorageAccountModel)
    {
        return BaseLocalService.run(this.walletName,{action:'addAccount',data:account});
    }
    static getAccounts():Promise<StorageAccountModel[]>
    {
        return BaseLocalService.run(this.walletName,{action:'getAccounts',data:{}});
    }
    static saveConnection(data:LoginResponse):Promise<any>
    {
        return BaseLocalService.run(this.walletName,{action:'saveConnection',data});
    }
    static acceptTransaction(id:string):Promise<any>
    {
        return BaseLocalService.run(this.walletName,{action:'acceptTransaction',data:id});
    }
    static rejectTransaction(id:string):Promise<any>
    {
        return BaseLocalService.run(this.walletName,{action:'rejectTransaction',data:id});
    }
    static generateKey():Promise<StorageAccountModel[]>
    {
        return BaseLocalService.run(this.walletName,{action:'generateKeyOffline',data:{}});
    }
    static async reunTransaction(actions:any[])
    {
        var network={
            name: '',
            protocol: 'https',
            host: 'telos.greymass.com',
            port: 443,
            blockchain: 'eos',
            chainId: '4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11',
            token: null,
            httpEndpoint: 'http://telos.greymass.com'
          }
        var connection={
            "result": {
                "hash": "f85df5433d53208b0b95d71012ece2b19f94463d3f3b7b6f8684f5065982f6c2",
                "name": "asalbanoo123",
                "publicKey": "EOS6NmVCbqhxf1bopxV9Q8XqtM58uboyxj4NPr1NCPwEaKA6mehi6",
                "accounts": [
                    {
                        "types": [],
                        "services": [],
                        "chainId": "4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11",
                        "blockchain": "eos",
                        "privateKey": "",
                        "name": "asalbanoo123",
                        "authority": "active",
                        "publicKey": "EOS6NmVCbqhxf1bopxV9Q8XqtM58uboyxj4NPr1NCPwEaKA6mehi6",
                        "_id": "activeEOS6NmVCbqhxf1bopxV9Q8XqtM58uboyxj4NPr1NCPwEaKA6mehi6asalbanoo123"
                    }
                ]
            },
            "id": "5191110191491071262312593110015226342091465011913624822716321",
            "key": "f13be6430922399c1c21c25d5739421bb7ba3c22ff25f5284d67ccb6134efb9e"
        };  
        var rand='rand'+Math.random();
        var obj={
            connection,
            data:{
                id:rand,
                type:'requestSignature',
                payload:{
                    network ,
                    transactionData:actions,
                    transactionStandard:{
                        actions
                    }
                }
            }
        }
        return await BaseLocalService.run(this.walletName,{action:'manualTransaction',data:obj},1000*60);
        // if(dt.serializedTransaction)
        // {
        //     // var data =await BaseServices.postData(network.httpEndpoint+'/v1/chain/push_transaction', {
        //     //     "signatures":dt.signatures ,"compression":0,"packed_context_free_data":"",
        //     //     "packed_trx":dt.serializedTransaction
        //     //     })
        // }
    }
}