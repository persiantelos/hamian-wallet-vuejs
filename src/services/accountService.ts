import Config from "@/common/config";
import Account from "@/models/account";
import TokenModel from "@/models/tokenModel";
import BaseServices from "./baseServices";

export default class AccountService
{
    static getTokens(account:string,chain:string ):Promise<TokenModel[]>
    {
        return BaseServices.post(Config.chainAddress+'wallet/tokens',{account,chain})
    }
    static async getAccount(account:string,url:string=Config.chainAddress):Promise<Account>
    {
        var acc=await BaseServices.postData(url+'/v1/chain/get_account',{account_name:account});
        return new Account(acc);
    }
    static async getTableRows(account:string,contract:string='persiandaric',url:string=Config.chainAddress):Promise<string>
    {
        var data={"json":true,"code":contract,"scope":account,"table":"rammarket","lower_bound":null,"upper_bound":null,"index_position":1,"key_type":"","limit":"100","reverse":false,"show_payer":false};
        var acc=await BaseServices.postData(url+'/v1/chain/get_table_rows',data);
        if(acc.rows[0]){
            return acc.rows[0]
        }
        else{
            return 'false'
        }
    }
    static async getTokenBalance(account:string,contract:string='persiandaric',url:string=Config.chainAddress):Promise<string>
    {
        var data={"json":true,"code":contract,"scope":account,"table":"accounts","lower_bound":null,"upper_bound":null,"index_position":1,"key_type":"","limit":"100","reverse":false,"show_payer":false};
        var acc=await BaseServices.postData(url+'/v1/chain/get_table_rows',data);
        if(acc.rows[0])
            return acc.rows[0].balance
        return "0.0000 DRIC";  
    }
    static async getTokensList(){
        return BaseServices.get(Config.server+'web/getOptions?table=tokens',)
    }
    static async getAccountInfo(accountName:string){
        return BaseServices.get(Config.server+'web/getOptions?table=accounts&$filter=_id eq '+ "'"+accountName+"'")
    }
    // get daric balance
    static async getDynamicTokenBalance(token:any,accountName:string,currentNet:any)
    {
        var data={"json":true,"code":token.contract,"scope":accountName,"table":"accounts","lower_bound":null,"upper_bound":null,"index_position":1,"key_type":"","limit":"100","reverse":false,"show_payer":false};
        let baseURL = 'https://'+currentNet.host;
        let url = baseURL+'/v1/chain/get_table_rows'
        var acc=await BaseServices.postData(url,data);
        if(acc.rows[0])
            return acc.rows[0].balance
        let zero = 0;
        return zero.toFixed(parseInt(token.decimals)) + ' ' + token.currency; 
    }
    static async getCollectors(accountName:string){
        let url = '/web/getCollectors?$filter=_id eq '+accountName
        return BaseServices.get(Config.areaXBaseURL+url)
    }
    
    static async getSocialProfile(accountName:any){
        let json = {"json":true, "code":'nftsoc.code',"scope":'nftsoc.code',"table":"profiles","upper_bound":accountName,"lower_bound":accountName,"limit":1}
        let url = Config.persianTelos+'/v1/chain/get_table_rows'
        var acc=await BaseServices.postData(url,json);
        if(acc.rows[0]){
            var accountInformation = {
                FirstName:'',
                LastName:'',
                Location:'',
                Bio:'',
                Avatar:'',
                Cover:'',
                Contacts:{
                    email:'',
                    Telegram:'',
                    Twitter:'',
                    Website:'',
                },
            }
            try {
                var tempInformation = JSON.parse(acc.rows[0].information);
              } catch (error) {
                var tempInformation = acc.rows[0].information;
                var properties = tempInformation.split("⬥");
                for (const prop of properties) {
                  var arrow = prop.split("⇨");
                  switch(arrow[0]){
                    case "1":
                        accountInformation.FirstName = arrow[1];
                    break;
                    case "2":
                      accountInformation.LastName = arrow[1];
                    break;
                    case "3":
                      accountInformation.Location = arrow[1];
                    break;
                    case "4":
                      accountInformation.Bio = arrow[1];
                    break;
                    case "5":
                      accountInformation.Avatar = arrow[1];
                    break;
                    case "6":
                      accountInformation.Cover = arrow[1];
                    break;
                    case "7":
                      var arr = arrow[1].split("⬝");
                      for (let i = 0; i < arr.length; i++) {
                        switch(i){
                          case 0:
                            accountInformation.Contacts["email"] = arr[0];
                          break;
                          case 1:
                            accountInformation.Contacts["Telegram"] = arr[1];
                          break;
                          case 2:
                            accountInformation.Contacts["Twitter"] = arr[2];
                          case 3:
                              accountInformation.Contacts["Website"] = arr[3];
                          break;
                        } 
                      }
                    break;
                  }
                }
              }
            return accountInformation
        }
        else{
            return 'account not found'
        }

    }
    static async getProfileEditPrice(){

    }

    static async saveEditProfile(data:any){
        return data
    }
}