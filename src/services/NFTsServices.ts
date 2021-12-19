import BaseServices from "./baseServices";
import Config from "@/common/config";

export default class NFTsServices
{
    static async getItemByOwner(accountName:string,skip:number=0,top:number=10){
        let url:string =Config.areaXBaseURL2+'/hyberion/getItems';
        let items =  await BaseServices.postData(url,{$skip:skip , $top:top , $filter:"owner eq '"+accountName+"'" , $orderby:'_id desc' })
        var list=[]
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
        url:Config.areaXBaseURL2+a.url,
        like:a.like ? a.like : 0,
        isXtorage:a.isXtorage,
        isProtected:a.isProtected,
        }
        list.push(obj);
    } 
    return {items:list,more:list.length==top,nextKey:skip+top};
    }
    
}