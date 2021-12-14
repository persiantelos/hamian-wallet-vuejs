import BaseLocalService from "./baseLocalService";



export default class StorageService
{
    static storageName:string='storage';
    static existData()
    {
        return BaseLocalService.run(this.storageName,{action:'exist'});
    }
    static isLogin()
    {
        return BaseLocalService.run(this.storageName,{action:'isLogin'});
    }
    static login(password:string)
    {
        return BaseLocalService.run(this.storageName,{action:'login',data:password});
    }
    static initData(password:string,data:string)
    {
        return BaseLocalService.run(this.storageName,{action:'init',data:{password,data}});
    }
    static saveConnection(password:string,data:string)
    {
        return BaseLocalService.run(this.storageName,{action:'init',data:{password,data}});
    }
    static saveSelectedAccount(account:any)
    {
        return BaseLocalService.run(this.storageName,{action:'saveSelectedAccount',data:account})
    }
    static getSelectedAccount()
    {
        return BaseLocalService.run(this.storageName,{action:'getSelectedAccount'})
    }
    static saveSelectedNode(nodeName:any)
    {
        return BaseLocalService.run(this.storageName,{action:'saveSelectedNode',data:nodeName})
    }
    static getSelectedChain()
    {
        return BaseLocalService.run(this.storageName,{action:'getSelectedChain'})
    }
    static getPayload()
    {
        return BaseLocalService.run(this.storageName,{action:'getPayload',data:BaseLocalService.globalId})
    }
    static addTokenManually(data:any)
    {
        return BaseLocalService.run(this.storageName,{action:'saveTokenManually',data:{data}})
    }
    static getLocalTolens()
    {
        return BaseLocalService.run(this.storageName,{action:'getLocalTolens',data:{}})
    }
}