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
    static getSelectedAccount(chainId:any)
    {
        return BaseLocalService.run(this.storageName,{action:'getSelectedAccount',data:chainId})
    }
    static saveSelectedNode(nodeName:any)
    {
        return BaseLocalService.run(this.storageName,{action:'saveSelectedNode',data:nodeName})
    }
    static getSelectedNode(chainId:any)
    {
        return BaseLocalService.run(this.storageName,{action:'getSelectedNode',data:chainId})
    }
}