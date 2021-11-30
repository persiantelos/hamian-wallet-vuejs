import LoginResponse from "src/models/local/loginResponse";
import StorageAccountModel from "src/models/storage/accountModel";
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
    static reunTransaction(actions:any[])
    {
         
        var rand='rand'+Math.random();
        var obj={
            data:{
                id:rand,
                payload:{
                    network:{chainId:'4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11'},
                    transaction:actions
                }
            }
        }
        return BaseLocalService.run(this.walletName,{action:'manualTransaction',data:obj});
    }
}