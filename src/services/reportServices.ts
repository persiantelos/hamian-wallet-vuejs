import BaseServices from "./baseServices";
import Config from "@/common/config";

export default class ReportServices
{
    // GET  
 
    // http://api1.areaxnft.com/report/bestSeller
    static async bestSeller(){
        return BaseServices.get(Config.areaXBaseURL+'/report/bestSeller',)
    }
    // https://api1.areaxnft.com/report/bestSeller?token=TLOS&price=true
 
    static async bestSellerBaseOnToken(token:string,price:string){
        return BaseServices.get(Config.areaXBaseURL+`/report/bestSeller?token=${token}&price=${price}`,)
    }
    
    // https://api1.areaxnft.com/report/buySellInfo?account=babyevils.gm
    static async buySellInfo(accountName:string){
        return BaseServices.get(Config.areaXBaseURL+`/report/buySellInfo?account=${accountName}`,)
    }
    
    // http://api1.areaxnft.com/report/itemOffer
    static async itemOffer(){
        return BaseServices.get(Config.areaXBaseURL+`/report/itemOffer`,)
    }

    // http://api1.areaxnft.com/report/itemOffer?account=vahidhosaini
    static async itemOfferBaseOnAccountName(accountName:string){
        return BaseServices.get(Config.areaXBaseURL+`/report/itemOffer?account=${accountName}`,)
    }
    
    // https://api1.areaxnft.com/report/bestBuyer
    static async bestBuyer(){
        return BaseServices.get(Config.areaXBaseURL+`/report/bestBuyer`,)
    }
    
    // https://api1.areaxnft.com/report/bestBuyer?token=TLOS&price=true
    static async bestBuyerBaseOnToken(token:string,price:string){
        return BaseServices.get(Config.areaXBaseURL+`/report/bestBuyer?token=${token}&price=${price}`,)
    }
    
    // https://api1.areaxnft.com/report/bestBuyer?account=hossainiiiir
    static async bestBuyerBaseOnAccountName(accountName:string){
        return BaseServices.get(Config.areaXBaseURL+`/report/bestBuyer?account=${accountName}`,)
    }
    
    // https://api1.areaxnft.com/report/bestBuyer?account=hossainiiiir&token=TLOS&by=price
    static async bestBuyerBaseOnAccountNameAndToken(accountName:string,token:string,price:string){
        return BaseServices.get(Config.areaXBaseURL+`/report/bestBuyer?account=${accountName}&token=${token}&price=${price}`,)
    }
    //  https://data.chainspector.io/telos/activeaccountsday
    // static async activeaccountsday(){
        //     return BaseServices.get('https://data.chainspector.io/telos/activeaccountsday',)
        // }
    static async getPurchasedItems(accountName:string,top:number=10,skip:number=0){
        return BaseServices.get(Config.areaXBaseURL+`/report/purchasedItems?account=${accountName}&top=${top}&skip=${skip}`,)
    }
    
    
    
    // https://api1.areaxnft.com/report/buyChart

    static async buyChart()
    {
        let url = Config.areaXBaseURL+'/report/buyChart'
        var data=await BaseServices.get(url,);
        if(data){
            return data
        }
        else{
            return 'false'
        }
    }

    // POST

    // data = {token:['TLOS','DRIC']}
    // https://api1.areaxnft.com/report/buyChart?account=vahidhosaini

    static async buyChartBaseOnAccountName(accountName:string,data:any=null)
    {
        let url = Config.areaXBaseURL+"/report/buyChart?account="+accountName
        var data=await BaseServices.postData(url,data);
        if(data){
            return data
        }
        else{
            return 'false'
        }
    }
   
}