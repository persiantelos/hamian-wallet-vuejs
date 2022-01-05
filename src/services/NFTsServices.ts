import BaseServices from "./baseServices";
import Config from "@/common/config";

export default class NFTsServices
{
    static async getItemByOwner(accountName:string,skip:number=0,top:number=6){
        let url:string =Config.areaXBaseURL2+'/hyberion/getItems';
        let items =  await BaseServices.postData(url,{$skip:skip ,$count:true, $top:top , $filter:"owner eq '"+accountName+"'" , $orderby:'_id desc' })
        var list=[]
        var Dstore:boolean= false;
        for(var a of items.data.value)
        {
            var tags = []
            tags.push(...a.tags)
            var title = tags.find(tag => tag.tag_name == "title")
            if(!title){
            var title_obj = {
                tag_name: "title",
                content: "",
                checksum: "",
                algorithm: "",
                locked: 0
            }
            tags.push(title_obj)
            }

            var image = tags.find(tag => tag.tag_name == "image")
            if(!image){
            var image_obj = {
                tag_name: "image",
                content: "",
                checksum: "",
                algorithm: "",
                locked: 0
            }
            tags.push(image_obj)
            }

        var creator = tags.find(tag => tag.tag_name == "creator")
        if(!creator){
        var creator_obj = {
            tag_name: "creator",
            content: "",
            checksum: "",
            algorithm: "",
            locked: 0
        }
        tags.push(creator_obj)
        }

        var asset = tags.find(tag => tag.tag_name == "asset")
        if(!asset){
        var asset_obj = {
            tag_name: "asset",
            content: "",
            checksum: "",
            algorithm: "",
            locked: 0
        }
        tags.push(asset_obj)
        }

        var data = tags.find(tag => tag.tag_name == "data")
        if(!data){
        var content = {
            ty : "image/png" ,
            ti : title ? title.content : title_obj.content ,
            dt : image ? image.content : image_obj.content ,
        }
        var data_obj = {
            tag_name: "data",
            content: JSON.stringify(content),
            checksum: "",
            algorithm: "",
            locked: 0
        }
        tags.push(data_obj)
        }
        var itemUrl = a.url;
        if(itemUrl.includes("https://api.dstor.cloud") || itemUrl.includes("https://ja3cgw.dstor.cloud")){
            Dstore= true;
        }
        else{
            Dstore= false;
        }
        var obj={
        item:{
            group:a.group,
            owner:a.owner,
            serial:a._id,
            isXtorage:a.isXtorage ,
            protected:a.isProtected
        },
        attributes:a.attributes,
        tags:tags,
        url:Config.areaXBaseURL2+'/'+a.url,
        like:a.like ? a.like : 0,
        isXtorage:a.isXtorage,
        isProtected:a.isProtected,
        isDstore: Dstore,
        }
        list.push(obj);
    } 
    return {items:list,more:list.length==top,nextKey:skip+top,count:items.data.count};
    }
    static async getSetsByCreator(accountName:string,skip:number=0,top:number=6){
        let url:string =Config.areaXBaseURL2+'/hyberion/getSets';
        var data:any = {
            $filter:"creator eq '"+accountName+"'",
            $skip:skip,
            $top:top,
            $count:true,
            $orderby:'_id desc'
          };
        let sets = await BaseServices.postData(url,data)
        if(sets.data.value.length == 0){
            return {message : false}
        }
        else{
            var res = [];
            var ind = 0;
            var serial_filter = []
            for (const row of sets.data.value) {
                serial_filter.push(`${row._id}`)
                row.minImage=Config.areaXBaseURL2+'set/'+(Math.floor(row.id/100))+'/'+row.id+'_min.png'
                if(row.url)
                {
                row.minImage=Config.areaXBaseURL2+row.url
                }
                res[ind] = {
                item : row,
                }
                ind++;
            } 
        }
        // var likes = await this.isSetLikeByListOfSerials(accountName , serial_filter)
        // for(var i in res){
        //   res[i].item['isLiked'] = likes[i] == 1 ? true : false
        // }
      return {result:res,nextKey:skip+top,more:sets.data.value.length==top,count:sets.data.count};

    }
    static async getCollectionsByOwner(accountName:string,skip:number=0,top:number=6){
        var data:any= {
            $filter: 'owner eq \''+accountName+'\'',
            $skip:skip,
            $top:top, 
            $count:true,
            $orderby:'_id desc',
        }
        var url:string =Config.areaXBaseURL+'/web/getCollections';
        let collections = await BaseServices.postData(url,data)
        if (collections){
            return collections
        }
        // var serial_filter = []
        // for(var a of collections.data.value){
            // serial_filter.push(a._id)
        // }
        // var likes = await this.isCollcLikeByListOfSerials(accountName , serial_filter)
        // console.log(likes);
        // for(var i in collections.data.value){
        //     collections.data.value[i]['isLiked'] = likes[i] == 1 ? true : false
        // }
        // return collections
        // console.log('collections',collections)

    }
    static async getFollowing(accountNmae:string,skip:number=0,top:number=6){
        var data = {$skip:skip,$top:top,$count:true,$filter:'scope eq \''+accountNmae+'\''}
        let url = Config.areaXBaseURL2+"/hyberion/getFollowing"
        let following = await BaseServices.postData(url,data)
        if(following){
            return {items:following.data.value,more:following.data.value.length==top,nextKey:skip+top,count:following.data.count};
        }
        else{return {message:false}}
    }
    static async getFollowers(accountNmae:string,skip:number=0,top:number=6){
        var data = {$skip:skip,$count:true,$top:top,$filter:'scope eq \''+accountNmae+'\''}
        let url = Config.areaXBaseURL2+"/hyberion/getFollowers"
        let following = await BaseServices.postData(url,data)
        if(following){
            return {items:following.data.value,more:following.data.value.length==top,nextKey:skip+top,count:following.data.count};
        }
        else{return {message:false}}
    }
    static async getSubmitedOffers(accountName:string,serial:any,skip:number=0,top:number=6){
        var filter='';
        if(serial)filter='serial eq \''+serial+'\'';
        if(accountName)
        {
        if(filter) filter+=' and '
            filter+='from eq \''+accountName+'\''
        }
        var query={
            $top:top,
            $skip:skip,
            $count:true,
        }
        if(filter)
        {
            query['$filter']=filter
        }
        query['$orderby'] = '_id desc'
        var t = await BaseServices.postData(Config.areaXBaseURL2+"/hyberion/getOffers",query);
        var strOr='';
        for(var a of t.data.value)
        {
            strOr+='_id eq '+a.serial+ ' or ';
        }
        if(strOr)
        {
            strOr=strOr.substr(0,strOr.length-4)
            var items= await BaseServices.postData(Config.areaXBaseURL2+"/hyberion/getAllItems",{$filter:strOr});
            for(var a of t.data.value)
            {
                a.item = items.data.value.filter(p=>p._id==a.serial)[0];
            }
        }
        var fltr = ""
        var serial_filter = []

        for(var b in t.data.value){
            serial_filter.push(`${t.data.value[b].serial}`)
            if(t.data.value[b].owner == 'market.code'){
                fltr+= 'nftSerial eq \''+t.data.value[b].serial+'\' or '
            }
        }
        if(fltr)
        {
        fltr=fltr.substr(0,fltr.length-4);
        var marketItems = await this.getNewMarketItemsByQueryFilter(fltr)
        marketItems.forEach(item => {
            var x = t.data.value.find(listItm => listItm.serial == item.nftSerial)
            x.owner = item.owner
        });
        }
        return {items:t.data.value,more:t.data.value.length==top,nextKey:skip+top,count:t.data.count};

    }
    static async getNewMarketItemsByQueryFilter(filter:any , skip:number=0 , top:number=24){
        var f = {
          $filter:filter,
          $skip:skip,
          $top:top,
          $orderby:'_id desc',
          version:'1'
        };
    
        var t = await BaseServices.postData(Config.areaXBaseURL2+"/hyberion/getMarket",f);
        console.log('t line 248',t)

        return t.data.value
    }
    static async getIncomingOffers(accountName:string,skip:number=0,top:number=6){
        let data = {$filter:'owner eq \''+accountName+'\''};
        let url = Config.areaXBaseURL2+"/hyberion/getOffersItems"
        let incomingOffers = await BaseServices.postData(url,data)
        var strOr='';
        var serial_filter = []
        for(var a of incomingOffers.data.value)
        {
            serial_filter.push(`${a.serial}`)
            strOr+='_id eq '+a.serial+ ' or ';
        }
        if(strOr)
        {
            strOr=strOr.substr(0,strOr.length-4)
            var json = {
                $filter:strOr,
                $skip:skip,
                $count:true,
                $top:top,
            };
            let url = Config.areaXBaseURL2+"/hyberion/getAllItems"
            let items = await BaseServices.postData(url,json)
            for(var a of incomingOffers.data.value)
            {
                a.item = items.data.value.filter(p=>p._id==a.serial)[0];
            }
        }

        // var likes = await this.isItemLikeByListOfSerials(accountName , serial_filter)
        // for(var i in incomingOffers.data.value){
        // incomingOffers.data.value[i]['isLiked'] = likes[i] == 1 ? true : false
        // }
        return {items:incomingOffers.data.value,more:incomingOffers.data.value.length==top,nextKey:skip+top};
    }
    static async getBookmarks(host:string,accountName:string,skip:number=0,top:number=6){
        var json = {
            "code":'nftsoc.code',
            "scope":accountName,
            "table":"bookmarks",
            "json":true,
            "limit":100,
          };
          let url = 'https://' +host+'/v1/chain/get_table_rows'
          let bookmarks = await BaseServices.postData(url,json)
          bookmarks = bookmarks.rows;
          var bookmarksSerial:any= []
          for(let serial of bookmarks){
            bookmarksSerial.push(serial.serial)
          }
          if(bookmarksSerial.length < 1)
            {
                return []
            }
        else{
            var strOr='';
            for(var a of bookmarksSerial)
            {
                strOr+='_id eq '+a+ ' or ';
            }
            if(strOr)
            {
                strOr=strOr.substr(0,strOr.length-4)
            }
            var query={
                $filter:strOr,
                $skip:skip,
                $top:top,
                $count:true,
                $orderby:'_id desc',
            }
            let url2:any = Config.areaXBaseURL2+"/hyberion/getItems";
            let t = await BaseServices.postData(url2,query)
            if(t.data){
                return t.data
            }
        }
    }
}